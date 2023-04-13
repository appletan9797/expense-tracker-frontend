import axios from 'axios'

class GetCurrencyApiService{
    async getAllCurrency(){
        const url = process.env.NEXT_PUBLIC_DOMAIN+'currencies'
        const getCurrencies = await axios.get(url)
        return getCurrencies.data
    }
}

export const getCurrencyApiService = new GetCurrencyApiService()