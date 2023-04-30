import axios from "axios"

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
}

export const handleTransactionApiService = new HandleTransactionApiService()