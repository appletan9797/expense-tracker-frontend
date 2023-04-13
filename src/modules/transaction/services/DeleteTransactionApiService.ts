import axios from 'axios'

class DeleteTransactionApiService{
    async deleteTransaction(transactionId :number){
        const url = 'http://localhost/api/transactions/'+transactionId
        const response = await axios.delete(url)
        return response.data
    }
}

export const deleteTransactionApiService = new DeleteTransactionApiService()