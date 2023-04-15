import { MainMenuBar } from "../../../components/MainMenubar"
import { Transactions } from "../components/Transactions"
import { getCurrentUserApiService } from "../../user/services/GetCurrentUserApiService"
import { getAllExpenseApiService } from "../services/GetAllTransactionApiService"
import { TransactionsDashboardProps } from "../../../types/TransactionInterfaceType"
import { GetServerSidePropsContext } from "next"
import { useEffect, useState } from "react"
import { useCurrencyList } from "../../currency/hooks/useCurrencyList"
import { useDefaultCurrency } from "../../user/hooks/useDefaultCurrency"

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

export const MyDashboard = ({transactions} : TransactionsDashboardProps) =>{
    
    const [loading, setLoading] = useState(true)
    const currencies = useCurrencyList()
    const userDefaultCurrency = useDefaultCurrency()

    useEffect(() =>{
        if((currencies.length > 0)){
            setLoading(false)
        }
    },[currencies])
    
    return (
        <>
                <MainMenuBar />
                <Transactions 
                    loading={loading} 
                    transactions={transactions} 
                    currencies={currencies} 
                    userDefaultCurrency={userDefaultCurrency}
                />
        </>
      )
}

