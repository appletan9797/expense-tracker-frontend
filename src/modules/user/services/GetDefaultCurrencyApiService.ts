import axios from "axios"

class GetDefaultCurrencyApiService{
    async getDefaultCurrency(){
        const userId = 1
        const url = 'http://localhost/api/users/default-currency/'+userId
        const defaultCurrency = await axios.get(url)
        return defaultCurrency.data
    }
}

export const getDefaultCurrencyApiService = new GetDefaultCurrencyApiService()