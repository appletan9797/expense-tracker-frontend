import axios from "axios"
import { TransactionDataToSubmit } from "../../../types/TransactionInterfaceType"
class HandleTransactionApiService{
    async getTransactionById(transactionId:number){
        const url = process.env.NEXT_PUBLIC_DOMAIN+'transactions/'+transactionId
        const response = await axios.get(url)
        return response.data
    }

    async deleteTransaction(transactionId:number){
        const url = process.env.NEXT_PUBLIC_DOMAIN+'transactions/'+transactionId
        const response = await axios.delete(url)
        return response.data
    }

    async addOrEditTransaction(method:string, url:string, data:TransactionDataToSubmit){
        const response = await axios({
            method:method,
            url:process.env.NEXT_PUBLIC_DOMAIN+url,
            data: data
        })
        return response.data
    }
}

export const handleTransactionApiService = new HandleTransactionApiService()