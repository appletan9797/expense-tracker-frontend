import axios from "axios"

class GetCurrentUserApiService{
    async getCurrentUser(token : any){
        try{
            const url = process.env.NEXT_PUBLIC_DOMAIN+'user'
            const response = await axios.get(url,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            return response.data.user_id
        }
        catch(error){
            console.log(error)
        }
    }
}

export const getCurrentUserApiService = new GetCurrentUserApiService()