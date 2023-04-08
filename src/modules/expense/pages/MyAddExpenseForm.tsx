import { getCategoryApiService } from "../../category/services/GetCategoryApiService";
import { Categories } from "../../../types/ExpenseInterfaceType";
import { Form as AddExpenseForm } from "../components/Form";
import {OthersMenuBar as Menubar} from "../../../components/otherpage-menubar"
import { useState, useEffect} from "react";
import { getCurrentUserApiService } from "../../user/services/GetCurrentUserApiService";
import { GetServerSidePropsContext } from "next";

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

export const MyAddExpenseForm = ({ categories }: {categories :Categories[]}) =>{
    const [currencies, setCurrencies] = useState([])
    const [userDefaultCurrency, setUserDefaultCurrency] = useState(0)

    useEffect(()=>{
        const storedCurrencies = localStorage.getItem('currencies')
        const userDefaultCurrency = localStorage.getItem('userDefaultCurrency')
        if(storedCurrencies){
            setCurrencies(JSON.parse(storedCurrencies))
        }
        if(userDefaultCurrency){
            const defaultCurrency = JSON.parse(userDefaultCurrency)
            setUserDefaultCurrency(defaultCurrency.default_currency_id)
        }
      },[])

    return(
        <>
            <Menubar></Menubar>
            <h1>Add Expense</h1>
            <AddExpenseForm categories={categories} currencies={currencies} defaultCurrency={userDefaultCurrency} />
        </>
    )
}