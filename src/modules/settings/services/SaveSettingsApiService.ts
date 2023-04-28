import axios from "axios"

class SaveSettingsApiService{
    async saveCurrency(defaultCurrency: number, userId: number){
        const url = process.env.NEXT_PUBLIC_DOMAIN+"users/default-currency/"+userId
        const response = await axios.patch(url,{
            "currency_id" : defaultCurrency
        })

        return response.data
    }
}

export const saveSettingsApiService = new SaveSettingsApiService()