import axios from 'axios'

class RegisterApiService{

    async checkIsEmailExist(email:string){
        const url = process.env.NEXT_PUBLIC_DOMAIN+'user/'+email
        const response = await axios.get(url)
        return response.data
    }

    async register(username:string, email:string, password:string){
        const url = process.env.NEXT_PUBLIC_DOMAIN+'register'
        const response = await axios.post(url,{
            "username":username,
            "email":email,
            "password":password
        })
        return response.data
    }
}

export const registerApiService = new RegisterApiService()