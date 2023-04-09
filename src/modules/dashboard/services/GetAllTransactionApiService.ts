import axios from "axios"

class GetAllExpenseApiService{
    async getAllExpense(userId:number){
        const url = 'http://localhost/api/users/'+userId+'/transactions' 
        const expense = await axios.get(url)
        return expense.data
    }
}

export const getAllExpenseApiService = new GetAllExpenseApiService()