import axios from 'axios'

class GetCurrencyApiService{
    async getAllCurrency(){
        const url = 'http://localhost/api/currencies'
        const getCurrencies = await axios.get(url)
        return getCurrencies.data
    }
}

export const getCurrencyApiService = new GetCurrencyApiService()