import { TransactionDetails, TransactionSummaryProps } from "../../../types/TransactionInterfaceType"
import { Grid, Table, TableBody, TableRow,TableCell, TableContainer, TableHead } from "@mui/material"
import { TransactionFilter } from "./TransactionFilter"
import _ from "lodash"

export const TransactionSummary = ({monthlyTransactions, currencies, userDefaultCurrency} : TransactionSummaryProps) =>{

    const transactionsValue = _.map(monthlyTransactions, eachTransaction => eachTransaction)
    const groupedData = _.groupBy(_.flatten(transactionsValue),"transaction_type")

    const getIncome = () => {
        const income = getTotal(groupedData["Income"])
        return income
    }

    const getExpense = () => {
        const expense = getTotal(groupedData["Expense"])
        return expense
    }

    const getTotal = (transactions : TransactionDetails[]) =>{
        const totalTransaction = _.sumBy(transactions, (transaction) => {
            return parseFloat(transaction.transaction_amount.toString())
        })
        return totalTransaction
    }

    return(
        <Grid container>
            <Grid item xs={1} md={3}/>
            <Grid item xs={9} md={6}>
                <TableContainer sx={{ marginBottom:"15px" }}>
                    <Table sx={{ minWidth:350}}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ textAlign:"center" }}>Income</TableCell>
                                <TableCell sx={{ textAlign:"center" }}>Expense</TableCell>
                                <TableCell sx={{ textAlign:"center" }}>Balance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ textAlign:"center" }}>{getIncome()}</TableCell>
                                <TableCell sx={{ textAlign:"center" }}>{getExpense()}</TableCell>
                                <TableCell sx={{ textAlign:"center" }}>{getIncome() - getExpense()}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={2} md={3}>
                <TransactionFilter currencies={currencies} userDefaultCurrency={userDefaultCurrency} />
            </Grid>
        </Grid>
    )
}