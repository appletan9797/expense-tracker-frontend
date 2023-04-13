import axios from 'axios';

class GetTransactionByIdApiService{
    async getTransactionById(transactionId : number){
        const url = process.env.NEXT_PUBLIC_DOMAIN+'transactions/'+transactionId
        const response = await axios.get(url)
        return response.data
    }
}

export const getTransactionByIdApiService = new GetTransactionByIdApiService()