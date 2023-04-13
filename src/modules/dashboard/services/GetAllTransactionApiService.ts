import axios from "axios"

class GetAllExpenseApiService{
    async getAllExpense(userId:number){
        const url = process.env.NEXT_PUBLIC_DOMAIN+'users/'+userId+'/transactions' 
        const expense = await axios.get(url)
        return expense.data
    }
}

export const getAllExpenseApiService = new GetAllExpenseApiService()