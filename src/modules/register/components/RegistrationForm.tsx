import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import styles from "../../../assets/styles/registrationForm.module.css";
import { Controller, useForm } from 'react-hook-form';
import { registerApiService } from '../services/RegisterApiService';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RegisterFormData } from '../../../types/TransactionInterfaceType';
import { saveDataUponLogin } from '../../../utils/saveDataUponLogin';
import { loginApiService } from '../../login/services/LoginApiService';

export const RegistrationForm = () =>{

    const router = useRouter()
    const [registrationErrorMsg, setRegistrationErrorMsg] = useState('')
    const { handleSubmit, control, formState:{errors} } = useForm()
    const rules = {
        username:{
            required:true,
        },
        email:{
            required:true,
            validate : async(email:string) => await checkExist(email)
        },
        password:{
            required:true,
            pattern:/^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/
        }
    }

    const checkExist = async (email:string) =>{
        const res = await registerApiService.checkIsEmailExist(email)
        return res === 1 ? false : true
    }

    const onFormSubmit = async (data:RegisterFormData) =>{
        const { username, email, password } = data
        try{
            await registerApiService.register(username,email,password)
            const user = await loginApiService.login(username, password)
            saveDataUponLogin.setLoginCookies(user)
            saveDataUponLogin.setLocalStorage(user)
            router.push('../transactions')
        }
        catch(error:any){
            setRegistrationErrorMsg("Sorry, there was an error creating your account. Please try again later")
        }
    }

    const appendErrorMsg = () =>{
        return(
            <Grid item xs={12} md={12} textAlign="center">
                <Typography className={styles.errorMsg} align='center' marginTop={1.5} fontSize={13}>{registrationErrorMsg}</Typography>
            </Grid>
        )
    }

    return(
        <Box 
            display="flex" justifyContent="center" 
            alignItems="center" minHeight="100vh"
        >
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Grid container rowSpacing={5} justifyContent="space-between" >
                   {/* Username */}
                    <Grid item xs={12} md={6}>
                    <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Username</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller 
                            name={'username'} 
                            control={control}
                            rules={rules.username}
                            render={({field: {onChange, value}}) =>(
                                <TextField
                                    id="username"
                                    value={value}
                                    onChange={onChange}
                                    sx={{ 
                                        width: {xs:'100%', md:'100%'}
                                    }}
                                />
                            )} 
                        />

                        {errors?.username && errors.username.type === "required" &&
                            <div className={styles.errorMsg}> 
                                Please fill in username
                            </div>
                        }
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12} md={6}>
                    <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Email</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller 
                            name={'email'} 
                            control={control}
                            rules={rules.email}
                            render={({field: {onChange, value}}) =>(
                                <TextField
                                    id="email"
                                    value={value}
                                    onChange={onChange}
                                    sx={{ 
                                        width: {xs:'100%', md:'100%'}
                                    }}
                                />
                            )} 
                        />

                        {errors?.email && errors.email.type === "required" &&
                            <div className={styles.errorMsg}> 
                                Please fill in email
                            </div>
                        }
                        {errors?.email && errors.email.type === "validate" &&
                            <div className={styles.errorMsg}> 
                                Email exists
                            </div>
                        }
                    </Grid>

                    {/* Password */}
                    <Grid item xs={12} md={6}>
                        <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Password</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller 
                            name={'password'} 
                            control={control}
                            rules={rules.password}
                            render={({field: {onChange, value}}) =>(
                                <TextField
                                    id="password"
                                    value={value}
                                    onChange={onChange}
                                    sx={{ 
                                        width: {xs:'100%', md:'100%'}
                                    }}
                                />
                            )} 
                        />
                        {errors?.password && 
                            <div className={styles.errorMsg}>
                                Your password must be at least: <br />
                                - 8 characters long<br />
                                - 1 special characters<br />
                                - 1 number 
                            </div>
                        }
                    </Grid>

                    {/* Register button */}
                    <Grid item xs={12} md={12} sx={{ textAlign: 'right' }}>
                        <Button type='submit' variant='outlined' 
                            sx={{ width: '70%',backgroundColor:'gray', color:'white', borderRadius:'40px', height:'50px'}}>
                                Register
                        </Button>
                    </Grid>

                    {/* Error message */}
                    {registrationErrorMsg && appendErrorMsg()}

                </Grid>
            </form>
        </Box>
    )
}