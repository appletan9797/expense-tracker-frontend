import { MainMenuBar } from "../../../components/MainMenubar"
import { TransactionSummary } from "../components/TransactionSummary"
import { TransactionRecord } from "../components/TransactionRecord"
import { getCurrentUserApiService } from "../../user/services/GetCurrentUserApiService"
import { getAllExpenseApiService } from "../services/GetAllTransactionApiService"
import { Transactions } from "../../../types/TransactionInterfaceType"
import { GetServerSidePropsContext } from "next"
import { Grid } from "@mui/material"

export const getServerSideProps = async(context:GetServerSidePropsContext) =>{
    const token = context.req.cookies['expense_tracker_login']
    const userId = await getCurrentUserApiService.getCurrentUser(token)
    const transactions = await getAllExpenseApiService.getAllExpense(userId)
    return{
        props:{
            transactions : transactions
        }
    }
}

export const MyDashboard = ({transactions} : Transactions) =>{
    return (
        <>
            <MainMenuBar />
            <TransactionSummary />
            <Grid container>
                {
                    Object.keys(transactions).map((dailyTransactions)=>
                        <TransactionRecord dailyTransactions={transactions[dailyTransactions]} date={dailyTransactions}/>
                    )
                }
            </Grid>
        </>
      )
}

