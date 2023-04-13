import axios from "axios"

class GetCategoryApiService{
    async getAllCategory(userId : number){
        const url = process.env.NEXT_PUBLIC_DOMAIN+'categories/'+userId
        const categories = await axios.get(url)
        return categories.data
    }
}

export const getCategoryApiService = new GetCategoryApiService()