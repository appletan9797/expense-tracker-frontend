import { Controller, useForm } from "react-hook-form"
import { Box, Grid, TextField, Button, Alert} from "@mui/material"
import { forgotPasswordApiService } from "../services/ForgotPasswordApiService"
import { ResetPasswordFormProps, ResetPasswordFormData } from "../../../types/TransactionInterfaceType"
import { RiLockPasswordLine } from "react-icons/ri"
import { useState } from "react"

export const ResetPasswordForm = ({token} : ResetPasswordFormProps) =>{
    const [message, setMessage] = useState('')
    const { handleSubmit, control, formState:{errors} } = useForm()
    const rules = {
        password:{
            required:true,
            pattern:/^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/
        }
    }

    const onFormSubmit = async (formData : ResetPasswordFormData) =>{
        try{
            const response = await forgotPasswordApiService.resetPassword(token, formData.password)
            if(response.success){
                setMessage("Password updated. Try to login with new password.")
            }
        }
        catch(error:any){
            setMessage("There is an issue updating the password. Please try again later")
        }
    }

    const appendErrorMsg = (errorMsg : string) =>{
        if (errorMsg === "pattern"){
            errorMsg = "Your password must be at least \n" +
            "- 8 characters long \n" +
            "- 1 special characters \n" +
            "- 1 number"
        }

        return(
            <Alert severity="error">
                {errorMsg.split('\n').map((message) =>(
                    <span>
                        {message}
                        <br />
                    </span>
                ))}
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
                    <Alert variant="outlined" icon={<RiLockPasswordLine />} severity="info">
                        Reset Your Password
                    </Alert>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller 
                            name={"password"} 
                            control={control}
                            rules={rules.password}
                            render={({field: {onChange, value}}) =>(
                                <TextField
                                    id="passowrd"
                                    value={value}
                                    onChange={onChange}
                                    sx={{ 
                                        width: {xs:"100%", md:"100%"},
                                        marginBottom:"20px"
                                    }}
                                />
                            )} 
                        />
                        {errors?.password && errors.password.type === "required" && appendErrorMsg("Please fill in password")}
                        {errors?.password && errors.password.type === "pattern" && appendErrorMsg("pattern")}
                    </Grid>

                    {/* Update button */}
                    <Grid item xs={12} md={12}>
                        <Button type="submit" variant="outlined" 
                            sx={{ width: "100%",backgroundColor:"gray", color:"white", borderRadius:"30px", height:"50px"}}>
                                Update Password
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