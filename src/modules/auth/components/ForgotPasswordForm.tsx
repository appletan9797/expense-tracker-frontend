import { Controller, useForm } from "react-hook-form"
import { Box, Grid, TextField, Button, Alert} from "@mui/material"
import { ForgotPasswordFormData } from "../../../types/TransactionInterfaceType"
import { forgotPasswordApiService } from "../services/ForgotPasswordApiService"
import { AiOutlineMail } from "react-icons/ai"
import { useState } from "react"

export const ForgotPasswordForm = () =>{

    const [message, setMessage] = useState('')
    const { handleSubmit, control, formState:{errors} } = useForm()
    const rules = {
        email:{
            required:true,
            pattern:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        }
    }

    const onFormSubmit = async (formData : ForgotPasswordFormData) =>{
        try{
            const response = await forgotPasswordApiService.forgotPassword(formData.email)
            if(response.success){
                setMessage("Email sent. Please check your mailbox for the password-reset instructions.")
            }
        }
        catch(error:any){
            setMessage("There is an issue sending the email. Please try again later")
        }
    }

    const appendErrorMsg = (errorMsg : string) =>{
        return(
            <Alert severity="error">
                {errorMsg}
            </Alert>
        )
    }

    return(
        <Box 
            display="flex" justifyContent="center" 
            alignItems="center" minHeight="80vh" maxWidth="70%"
            marginLeft="18%"
        >
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Grid container rowSpacing={5} justifyContent="space-between" >
                   {/* Email */}
                    <Grid item xs={12} md={12}>
                    <Alert variant="outlined" icon={<AiOutlineMail />} severity="info">
                        Please enter the email address you used to register account. <br />
                        We will send you an email with instructions on how to reset your password.
                    </Alert>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller 
                            name={"email"} 
                            control={control}
                            rules={rules.email}
                            render={({field: {onChange, value}}) =>(
                                <TextField
                                    id="email"
                                    value={value}
                                    onChange={onChange}
                                    sx={{ 
                                        width: {xs:"100%", md:"100%"},
                                        marginBottom:"20px"
                                    }}
                                />
                            )} 
                        />
                        {errors?.email && errors.email.type === "required" && appendErrorMsg('Please fill in email')}
                        {errors?.email && errors.email.type === "pattern" && appendErrorMsg('Not a valid email address')}
                    </Grid>

                    {/* Send button */}
                    <Grid item xs={12} md={12}>
                        <Button type="submit" variant="outlined" 
                            sx={{ width: "100%",backgroundColor:"gray", color:"white", borderRadius:"30px", height:"50px"}}>
                                Set New Password
                        </Button>
                    </Grid>

                    {/* Message */}
                    <Grid item xs={12} md={12}>
                        {message && <Alert variant="outlined" severity="info">{message}</Alert>}
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}