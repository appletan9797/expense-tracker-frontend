import axios from 'axios';

class LoginApiService{
    async login(username:String, password:String){
        const url = process.env.NEXT_PUBLIC_DOMAIN+'login'
        const response = await axios.post(url, {
            username: username,
            password:password,
            },{
            withCredentials : true,
        })

        return response.data
    }
}

export const loginApiService = new LoginApiService();
