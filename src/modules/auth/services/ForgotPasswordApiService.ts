import axios from 'axios'

class ForgotPasswordApiService{
    async forgotPassword(email:string){
        const url = process.env.NEXT_PUBLIC_DOMAIN+'users/forgot-password'
        const response = await axios.post(url,{
            "email":email
        })
        return response.data
    }

    async resetPassword(token:string, password:string){
        const url = process.env.NEXT_PUBLIC_DOMAIN+'users/reset-password'
        const response = await axios.post(url,{
            "token":token,
            "password":password
        })
        return response.data
    }
}

export const forgotPasswordApiService = new ForgotPasswordApiService()