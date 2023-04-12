import axios from 'axios';

class GetTransactionByIdApiService{
    async getTransactionById(transactionId : number){
        const url = 'http://localhost/api/transactions/'+transactionId
        const response = await axios.get(url)
        return response.data
    }
}

export const getTransactionByIdApiService = new GetTransactionByIdApiService()