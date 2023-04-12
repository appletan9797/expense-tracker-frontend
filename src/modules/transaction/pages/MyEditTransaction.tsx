import { OthersMenuBar as Menubar } from "../../../components/OtherMenubar"
import { Form as EditTransactionForm } from "../components/Form";
import { getCategoryApiService } from "../../category/services/GetCategoryApiService";
import { getCurrentUserApiService } from "../../user/services/GetCurrentUserApiService";
import { getTransactionByIdApiService } from "../services/GetTransactionByIdApiService";
import { EditTransactionFormProps } from "../../../types/TransactionInterfaceType";
import { useState, useEffect} from "react";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async(context:GetServerSidePropsContext) =>{
    const token = context.req.cookies['expense_tracker_login']
    const currentUserId = await getCurrentUserApiService.getCurrentUser(token)
    const categories = await getCategoryApiService.getAllCategory(currentUserId)

    const {transactionId} = context.query
    const transaction = await getTransactionByIdApiService.getTransactionById(Number(transactionId))
    
    return{
        props:{
            transaction,
            'categories' : categories.categories,
        }
    }
}

export const MyEditTransaction = ({ transaction, categories} : EditTransactionFormProps) =>{
    const [currencies, setCurrencies] = useState([])
    const [userDefaultCurrency, setUserDefaultCurrency] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
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


    return(
        <>
            <Menubar />
            <h1>Edit Transaction</h1>
            {
                loading ? 
                <div>Loading...</div> :
                <EditTransactionForm 
                    categories={categories} 
                    currencies={currencies} 
                    defaultCurrency={userDefaultCurrency} 
                    existingTransaction={transaction}
                />  
            }
           </>
        
    )
}