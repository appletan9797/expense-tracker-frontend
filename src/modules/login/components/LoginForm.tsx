import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import { Controller, useForm } from 'react-hook-form';
import styles from "../../../assets/styles/addExpenseForm.module.css";
import { loginApiService } from '../services/LoginApiService';
import { getCurrencyApiService } from '../../currency/services/GetCurrencyApiService';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getDefaultCurrencyApiService } from '../../user/services/GetDefaultCurrencyApiService';

export const LoginForm = () =>{

    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState('')
    const { handleSubmit, control, formState:{errors} } = useForm()
    const rules = {
        username:{required:true},
        password:{required:true}
    }

    const onFormSubmit = async (data) =>{
        const { username, password } = data
        try{
            await loginApiService.login(username,password)
            const currencies = await getCurrencyApiService.getAllCurrency()
            const userDefaultCurrency = await getDefaultCurrencyApiService.getDefaultCurrency()
            localStorage.setItem('currencies', JSON.stringify(currencies))
            localStorage.setItem('userDefaultCurrency', JSON.stringify(userDefaultCurrency))
            router.push('../expenses')
        }
        catch(error:any){
            if(error.response && error.response.status === 401){
                setErrorMsg("Invalid username or password. Please try again")
            }
        }
    }

    const appendErrorMsg = () =>{
        return(
            <Grid item xs={12} md={12} textAlign="center">
                <Typography align='center' marginTop={1.5} fontSize={13}>{ errorMsg }</Typography>
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
                        {errors?.username && <span className={styles.errorMsg}> *Please fill in username</span>}
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
                        {errors?.password && <span className={styles.errorMsg}> *Please fill in password</span>}
                    </Grid>

                    {/* Forgot password and Sign up */}
                    <Grid item md={6} textAlign="right">
                        <Link href='#'>Forgot password?</Link>
                    </Grid>
                    <Grid item md={6} textAlign="center">
                        <Link href='#'>Don't have an account? Sign up</Link>
                    </Grid>

                    {/* Save button */}
                    <Grid item xs={12} md={12} sx={{ textAlign: 'right' }}>
                        <Button type='submit' variant='outlined' 
                            sx={{ width: '70%',backgroundColor:'gray', color:'white', borderRadius:'40px', height:'50px'}}>
                                Login
                        </Button>
                    </Grid>

                    {/* Error message */}
                    {errorMsg && appendErrorMsg()}

                </Grid>
            </form>
        </Box>
    )
}