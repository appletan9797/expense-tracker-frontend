import { OthersMenuBar as Menubar } from "../../../components/OtherMenubar"
import { Form as EditTransactionForm } from "../components/Form";
import { getCategoryApiService } from "../../category/services/GetCategoryApiService";
import { getCurrentUserApiService } from "../../user/services/GetCurrentUserApiService";
import { handleTransactionApiService } from "../services/HandleTransactionApiService";
import { EditTransactionFormProps } from "../../../types/TransactionInterfaceType";
import { useState, useEffect} from "react";
import { useCurrencyList } from "../../currency/hooks/useCurrencyList";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async(context:GetServerSidePropsContext) =>{
    const token = context.req.cookies['expense_tracker_login']
    const currentUser = await getCurrentUserApiService.getCurrentUser(token)
    const categories = await getCategoryApiService.getAllCategory(currentUser.user_id)

    const {transactionId} = context.query
    const transaction = await handleTransactionApiService.getTransactionById(Number(transactionId))
    
    return{
        props:{
            transaction,
            'categories' : categories.categories,
        }
    }
}

export const MyEditTransaction = ({ transaction, categories} : EditTransactionFormProps) =>{
    const [loading, setLoading] = useState(true)
    const currencies = useCurrencyList()

    useEffect(() =>{
        if((currencies.length > 0)){
            setLoading(false)
        }
    },[currencies])

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
                    existingTransaction={transaction}
                />  
            }
           </>
        
    )
}