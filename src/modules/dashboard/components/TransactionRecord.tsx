import { TransactionProps, TransactionDetails} from "../../../types/TransactionInterfaceType"
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material"

export const TransactionRecord = ({dailyTransactions, date} : TransactionProps) =>{
  const getTotal = () =>{
    const expenseTransaction = dailyTransactions.filter((expense) => expense.transaction_type === "Expense")
    const expense = calculateTotal(expenseTransaction)

    const incomeTransaction = dailyTransactions.filter((income) => income.transaction_type === "Income")
    const income = calculateTotal(incomeTransaction)

    return {expense, income}
  }

  const calculateTotal = (transactions : TransactionDetails[]) =>{
    let totalTransaction = 0
    transactions.forEach((eachTransaction : any) => {
      let amount = parseFloat(eachTransaction.transaction_amount.toString())
      totalTransaction += amount
    })

    return totalTransaction
  }
  
  return (
    <>
      <Grid item xs={12} md={2}/>
      <Grid item xs={12} md={8}>
        <TableContainer component={Paper} sx={{ marginBottom:"15px", border:"1px solid silver" }}>
          <Table sx={{ minWidth:350}} >
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderBottom:"none" }}>{date}</TableCell>
                <TableCell sx={{ borderBottom: "none" }} align="right">
                  {getTotal().expense !== 0 ? "Expense: -" + getTotal().expense + " " : ""} 
                  {getTotal().income !== 0 ? "Income: " + getTotal().income : ""}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                dailyTransactions.map((eachTransaction) =>(
                  <TableRow key={eachTransaction.transaction_id}>
                    <TableCell sx={{ borderBottom: "none" }}>{eachTransaction.transaction_details}</TableCell>
                    <TableCell sx={{ borderBottom: "none" }} align="right">
                        {eachTransaction.transaction_type === "Expense" ? '-' : '+'} 
                        {eachTransaction.transaction_amount}
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} md={2}/>
    </>
  )
}