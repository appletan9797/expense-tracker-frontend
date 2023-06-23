import axios from "axios"

class GetAllExpenseApiService{
    async getAllExpense(userId:number, month?:number, year?:number){
        let url = process.env.NEXT_PUBLIC_DOMAIN+'users/'+userId+'/transactions' 
        if(month !== undefined && year !==undefined){
            url = url + "/" + month + "/" + year
        }
        const expense = await axios.get(url)
        return expense.data
    }
}

export const getAllExpenseApiService = new GetAllExpenseApiService()