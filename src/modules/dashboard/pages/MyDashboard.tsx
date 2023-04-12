import { MainMenuBar } from "../../../components/MainMenubar"
import { Transactions } from "../components/Transactions"
import { getCurrentUserApiService } from "../../user/services/GetCurrentUserApiService"
import { getAllExpenseApiService } from "../services/GetAllTransactionApiService"
import { TransactionsDashboardProps } from "../../../types/TransactionInterfaceType"
import { GetServerSidePropsContext } from "next"
import { useEffect, useState } from "react"

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
    const [currencies, setCurrencies] = useState([])
    const [userDefaultCurrency, setUserDefaultCurrency] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedCurrencies = localStorage.getItem('currencies')
        const storedUserDefaultCurrency = localStorage.getItem('userDefaultCurrency')
        if(storedCurrencies){
            setCurrencies(JSON.parse(storedCurrencies))
        }
        if(storedUserDefaultCurrency){
            setUserDefaultCurrency(Number(storedUserDefaultCurrency))
        }
        setLoading(false)
    },[])
    
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

