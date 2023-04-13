import axios from "axios"

class GetDefaultCurrencyApiService{
    async getDefaultCurrency(userId:number){
        const url = process.env.NEXT_PUBLIC_DOMAIN+'users/default-currency/'+userId
        const defaultCurrency = await axios.get(url)
        return defaultCurrency.data.default_currency_id
    }
}

export const getDefaultCurrencyApiService = new GetDefaultCurrencyApiService()