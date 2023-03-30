import { expenseFormApiService } from "../services/ExpenseFormApiService";
import { MyAddExpenseFormProps } from "../../../types/ExpenseInterfaceType";
import { Form as AddExpenseForm } from "../components/Form";
import {OthersMenuBar as Menubar} from "../../../components/otherpage-menubar"

export const getServerSideProps = async() =>{
    const fieldsData = await expenseFormApiService.getFormFieldsData()
    return{
        props:{
            'categories' : Object.values(fieldsData)[0],
            'currencies' : Object.values(fieldsData)[1],
            'defaultCurrency' : Object.values(fieldsData)[2]
        },
    }
}

export const MyAddExpenseForm = ({ categories, currencies, defaultCurrency } : MyAddExpenseFormProps) =>{
    return(
        <>
            <Menubar></Menubar>
            <h1>Add Expense</h1>
            <AddExpenseForm categories={categories} currencies={currencies} defaultCurrency={defaultCurrency} />
        </>
    )
}