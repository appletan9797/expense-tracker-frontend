import { Box, Grid, Select, Alert, MenuItem,Typography, FormLabel, Button, SelectChangeEvent } from "@mui/material"
import { useCurrencyList } from "../../currency/hooks/useCurrencyList"
import { useDefaultCurrency } from "../../user/hooks/useDefaultCurrency"
import { FormEvent, useEffect, useState } from "react"
import { UserProps } from "../../../types/TransactionInterfaceType"
import { saveSettingsApiService } from "../services/SaveSettingsApiService"
import styles from "../../../assets/styles/settingsMenu.module.css";

export const CurrencySettings = ({currentUser} : UserProps) =>{
    const currencies = useCurrencyList()
    const userDefaultCurrency = useDefaultCurrency()
    const [defaultCurrency, setDefaultCurrency] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [message, setMessage] = useState('')

    const onFormSubmit = async(event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        try{
            const response = await saveSettingsApiService.saveCurrency(Number(defaultCurrency), currentUser.user_id)
            if(response.success){
                setMessage("Default currency updated")
            }
            localStorage.setItem('userDefaultCurrency', defaultCurrency)
        }
        catch(error:any){
            setErrorMsg("There is an issue updating the currency. Please try again later")
        } 
        
    }
    
    const handleChange = (event: SelectChangeEvent) =>{
        setDefaultCurrency(event.target.value)
    }

    useEffect(() =>{
        if(currencies.length > 0){
            setDefaultCurrency(userDefaultCurrency.toString())
        }
    },[currencies, userDefaultCurrency])

    
    return(
        currencies && defaultCurrency ? 
        <Box sx={{ width: '100%', marginTop:'30%' }}>
            <form onSubmit={onFormSubmit}>
                <Grid container rowSpacing={5} justifyContent="space-between">

                    {/* Currency */}
                    <Grid item xs={12} md={6}>
                        <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Currency</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Select
                            id="currency-dropdown"
                            value={defaultCurrency?.toString()}
                            onChange={handleChange}
                            sx={{ 
                                width: '35ch'
                            }}
                        >
                            <MenuItem value={0} disabled={true}>Please select a currency</MenuItem>
                            {
                                currencies.map((eachCurrency) => {
                                    return <MenuItem value={eachCurrency["currency_id"]}>{eachCurrency["currency_name"]} ({eachCurrency["currency_symbol"]})</MenuItem>
                                })
                            }
                        </Select>
                    </Grid>
                    
                    {/* Save Button */}
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

                    {/* Error message (if there are issue updating the record)  */}
                    { errorMsg ? 
                        <Grid item xs={12} md={12} textAlign="center">
                            <span className={styles.errorMsg}>*{errorMsg}</span>
                        </Grid> 
                        : ''
                    }
                    
                </Grid>
            </form>    
        </Box>  :
        <div>Loading...</div>
    )
}