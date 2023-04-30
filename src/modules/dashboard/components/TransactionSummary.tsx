import { TransactionDetails, TransactionSummaryProps, GroupedTransactions} from "../../../types/TransactionInterfaceType"
import { Grid, Table, TableBody, TableRow,TableCell, TableContainer, TableHead } from "@mui/material"
import { TransactionFilter } from "./TransactionFilter"
import { useState } from "react"
import _ from "lodash"

export const TransactionSummary = ({dateTransactionsMap, currencies, userDefaultCurrency, updateTransactionComponent} : TransactionSummaryProps) =>{
    const [defaultCurrency, setDefaultCurrency] = useState(userDefaultCurrency)
    const groupedData: GroupedTransactions = _.groupBy(_.flatten(_.values(dateTransactionsMap)),"transaction_type")

    const getIncome = () => {
        const income = getTotal(groupedData["Income"])
        return income.toFixed(2)
    }

    const getExpense = () => {
        const expense = getTotal(groupedData["Expense"])
        return expense.toFixed(2)
    }
    
    const getBalance = () =>{
        return (parseFloat(getIncome()) - parseFloat(getExpense())).toFixed(2)
    }

    const getTotal = (transactions : TransactionDetails[]) =>{
        const totalTransaction = _.sumBy(_.filter(transactions, (transaction) => transaction.currency_id === defaultCurrency),(eachTransaction) =>{
                                            return parseFloat(eachTransaction.transaction_amount.toString())
                                        })
        return totalTransaction
    }

    const updateCurrency = (currencyId : number) =>{
        setDefaultCurrency(currencyId)
        updateTransactionComponent(currencyId)
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
                                <TableCell sx={{ textAlign:"center" }}>{getBalance()}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={2} md={3}>
                <TransactionFilter 
                    currencies={currencies} 
                    userDefaultCurrency={userDefaultCurrency} 
                    updateTransactionSummaryComponent={updateCurrency}
                />
            </Grid>
        </Grid>
    )
}