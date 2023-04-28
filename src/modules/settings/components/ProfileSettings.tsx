import { Box, Grid, TextField,Typography, FormLabel, Button, Alert } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { useState, FormEvent } from "react"
import { UserProps, UpdatePasswordFormData } from "../../../types/TransactionInterfaceType"
import styles from "../../../assets/styles/settingsMenu.module.css";
import { saveSettingsApiService } from "../services/SaveSettingsApiService";

export const ProfileSettings = ({currentUser} : UserProps) =>{

    const [errorMsg, setErrorMsg] = useState("")
    const [message, setMessage] = useState("")
    const { handleSubmit, control, formState:{errors}, watch } = useForm()
    const rules = {
        password:{
            required:true,
            pattern:/^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/
        },
        confirmPassword:{
            validate : (value: string) => value === watch("password")
        }
    }

    const onFormSubmit = async (data:UpdatePasswordFormData, event:FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        try{
            const response = await saveSettingsApiService.updatePassword(data.password, currentUser.user_id)
            if(response.success){
                setMessage("Password updated")
            }
            /* await registerApiService.register(username,email,password)
            router.push('../transactions') */
        }
        catch(error:any){
            setErrorMsg("There is an issue updating the currency. Please try again later")
        }
    }

    return(
        <Box sx={{ width: '100%', marginTop:'20%'  }} >
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Grid container rowSpacing={5} justifyContent="space-between" >
                    {/* Username */}
                    <Grid item xs={12} md={6}>
                    <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Username</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                                    id="username"
                                    value={currentUser.user_name}
                                    disabled
                                    sx={{ 
                                        width: {xs:'100%', md:'100%'}
                                    }}
                        />
                    </Grid>

                    {/* Password */}
                    <Grid item xs={12} md={6}>
                        <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>New password</FormLabel></Typography>
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
                                    type="password"
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

                    {/* Confirm Password */}
                    <Grid item xs={12} md={6}>
                        <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Confirm password</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller 
                            name={'confirmPassword'} 
                            control={control}
                            rules={rules.confirmPassword}
                            render={({field: {onChange, value}}) =>(
                                <TextField
                                    type="password"
                                    value={value}
                                    onChange={onChange}
                                    sx={{ 
                                        width: {xs:'100%', md:'100%'}
                                    }}
                                />
                            )} 
                        />
                        {errors?.confirmPassword && 
                            <div className={styles.errorMsg}>
                                Password do not match
                            </div>
                        }
                    </Grid>

                    {/* Save button */}
                    <Grid item xs={12} md={12} sx={{ textAlign: 'right' }}>
                        <Button type='submit' variant='outlined' 
                            sx={{ width: '70%',backgroundColor:'gray', color:'white', borderRadius:'40px', height:'50px'}}>
                                Save
                        </Button>
                    </Grid>

                    {/* Message */}
                     <Grid item xs={12} md={12}>
                        {message && <Alert variant="outlined" severity="success">{message}</Alert>}
                    </Grid>

                    {/* Error message */}
                    { errorMsg ? 
                        <Grid item xs={12} md={12} textAlign="center">
                            <span className={styles.errorMsg}>*{errorMsg}</span>
                        </Grid> 
                        : ''
                    }

                </Grid>
            </form>
        </Box>
    )
}