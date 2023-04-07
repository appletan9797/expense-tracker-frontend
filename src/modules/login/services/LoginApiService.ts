import axios from 'axios';

class LoginApiService{
    async login(username:String, password:String){
        const url = 'http://localhost/api/login'
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
