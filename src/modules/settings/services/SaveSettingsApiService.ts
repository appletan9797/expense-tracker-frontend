import axios from "axios"

class SaveSettingsApiService{
    async saveCurrency(defaultCurrency: number, userId: number){
        const url = process.env.NEXT_PUBLIC_DOMAIN+"users/default-currency/"+userId
        const response = await axios.patch(url,{
            "currency_id" : defaultCurrency
        })

        return response.data
    }

    async updatePassword(password: string, userId:number){
        const url= process.env.NEXT_PUBLIC_DOMAIN+"users/"+userId+"/password"
        const response = await axios.patch(url,{
            "newPassword" : password
        })

        return response.data
    }

    async saveCategory(categoryNameEn:string, categoryNameCn:string, userId:number){
        const url= process.env.NEXT_PUBLIC_DOMAIN+"categories"
        const response = await axios.post(url,{
            "categoryNameEn" : categoryNameEn,
            "categoryNameCn" : categoryNameCn,
            "userId" : userId
        })
        
        return response.data
    }

    async updateCategory(categoryId:number, categoryNameEn:string, categoryNameCn:string, userId:number){
        const url = process.env.NEXT_PUBLIC_DOMAIN+"categories/"+categoryId
        const response = await axios.patch(url,{
            "categoryNameEn" : categoryNameEn,
            "categoryNameCn" : categoryNameCn,
            "userId" : userId
        })

        return response.data
    }
}

export const saveSettingsApiService = new SaveSettingsApiService()