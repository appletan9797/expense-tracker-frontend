import axios from "axios"

class GetDefaultCurrencyApiService{
    async getDefaultCurrency(userId:number){
        const url = 'http://localhost/api/users/default-currency/'+userId
        const defaultCurrency = await axios.get(url)
        return defaultCurrency.data
    }
}

export const getDefaultCurrencyApiService = new GetDefaultCurrencyApiService()