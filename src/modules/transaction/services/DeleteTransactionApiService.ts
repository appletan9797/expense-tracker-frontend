import axios from 'axios'

class DeleteTransactionApiService{
    async deleteTransaction(transactionId :number){
        const url = process.env.NEXT_PUBLIC_DOMAIN+'transactions/'+transactionId
        const response = await axios.delete(url)
        return response.data
    }
}

export const deleteTransactionApiService = new DeleteTransactionApiService()