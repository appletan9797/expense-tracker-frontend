import { getCategoryApiService } from "../../category/services/GetCategoryApiService";
import { Categories } from "../../../types/TransactionInterfaceType";
import { Form as AddTransactionForm } from "../components/Form";
import { OthersMenuBar as Menubar } from "../../../components/OtherMenubar"
import { useState, useEffect} from "react";
import { getCurrentUserApiService } from "../../user/services/GetCurrentUserApiService";
import { GetServerSidePropsContext } from "next";
import { useCurrencyList } from "../../currency/hooks/useCurrencyList";
import { useDefaultCurrency } from "../../user/hooks/useDefaultCurrency";

export const getServerSideProps = async(context:GetServerSidePropsContext) =>{
    const token = context.req.cookies['expense_tracker_login']
    const currentUserId = await getCurrentUserApiService.getCurrentUser(token)
    const categories = await getCategoryApiService.getAllCategory(currentUserId)
    
    return{
        props:{
            'categories' : categories.categories,
        },
    }
}

export const MyAddTransactionForm = ({ categories }: {categories :Categories[]}) =>{
    const [loading, setLoading] = useState(true)
    const currencies = useCurrencyList()
    const userDefaultCurrency = useDefaultCurrency()

    useEffect(() =>{
        if((currencies.length > 0)){
            setLoading(false)
        }
    },[currencies])

    return(
        <>
            <Menubar></Menubar>
            <h1>Add Transaction</h1>
            { 
                loading ? 
                <div>Loading...</div> : 
                <AddTransactionForm categories={categories} currencies={currencies} defaultCurrency={userDefaultCurrency} />
            }
        </>
    )
}