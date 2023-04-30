import {Controller, useForm} from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { TransactionFormProps, FormData, TransactionDataToSubmit } from '../../../types/TransactionInterfaceType';
import { handleTransactionApiService } from '../services/HandleTransactionApiService';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from "../../../assets/styles/addExpenseForm.module.css";
import axios from 'axios';

export const Form = ({ categories, currencies, defaultCurrency, existingTransaction, userId } : TransactionFormProps) =>{

    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState("")
    const transactionId = existingTransaction ? 
                            Number(existingTransaction["transaction_id" as keyof typeof existingTransaction]) : 0

    const { handleSubmit, control, formState:{errors} } = useForm({
        defaultValues:{
            category: existingTransaction? existingTransaction["category_id" as keyof typeof existingTransaction] : 0,
            currency: existingTransaction? existingTransaction["currency_id" as keyof typeof existingTransaction] : defaultCurrency,
            details: existingTransaction? existingTransaction["transaction_details" as keyof typeof existingTransaction] : '',
            amount: existingTransaction? existingTransaction["transaction_amount" as keyof typeof existingTransaction] : 0,
            paymentMethod: existingTransaction? existingTransaction["payment_method" as keyof typeof existingTransaction] : 'Cash',
            date: existingTransaction? new Date(existingTransaction["transaction_date" as keyof typeof existingTransaction]) : new Date()
        }
    })

    const onFormSubmit = async (data : FormData) =>{
        const { category, currency, date, amount, details, paymentMethod } = data
        let formattedDate
        if (date !== undefined){
            const year = date.getFullYear()
            const month = date.getMonth()+1
            const day = date.getDate()
            formattedDate = year+"-"+month+"-"+day
        }

        const url = existingTransaction ? 
                    'transactions/'+ existingTransaction["transaction_id" as keyof typeof existingTransaction]
                    : 'transactions'
        const method = existingTransaction ? 'patch' : 'post'
        const dataToSubmit : TransactionDataToSubmit = {
                transactionType : 'Expense',
                details: details,
                category: category,
                currency: currency,
                amount: amount,
                paymentMethod: paymentMethod,
                date: formattedDate
        }

        if(userId){
            dataToSubmit.userId = userId
        }

        try{
            const response = await handleTransactionApiService.addOrEditTransaction(method,url,dataToSubmit)
                //if success redirect to main page
            }
        }
        catch(error){
            //if error show the page saying there is issue when adding expense
        }
    }

    const rules = {
        category:{validate: (value:number) => value !== 0},
        currency:{validate: (value:number) => value !== 0},
        amount:{min : 0.01},
        paymentMethod:{validate: (value:number) => value !== 0}
    }

    const size = existingTransaction ? 6 : 12
    const width = existingTransaction ? '40%' : '20%'
    const appendSaveButton = () =>{
        return(
            <Grid item xs={12} md={size} sx={{ textAlign: 'center' }}>
                <Button type='submit' variant='outlined' 
                    sx={{ width: width, backgroundColor:'gray', color:'white', borderRadius:'40px', height:'50px'}}>
                        Save
                </Button>
            </Grid>
        )
    }

    const appendSaveAndDeleteButton = () =>{
        return(
            <>
                {appendSaveButton()}
                <Grid item xs={12} md={size} sx={{ textAlign: 'center' }}>
                    <Button onClick={onDelete} variant='outlined' 
                        sx={{ width: width, backgroundColor:'gray', color:'white', borderRadius:'40px', height:'50px'}}>
                            Delete
                    </Button>
                </Grid>
            </>
            
        )
    }

    const onDelete = async() =>{
        try{
            await handleTransactionApiService.deleteTransaction(transactionId)
            router.push('/transactions')
        }
        catch(error: any){
            setErrorMsg("There is an issue deleting the transaction. Please try again.")
        }
        
    }

    return(
        <Box sx={{ width: '100%' }}>
            <form onSubmit={handleSubmit(onFormSubmit)}>
            
                <Grid container rowSpacing={5} justifyContent="space-between">
                    {/* Category */}
                    <Grid item xs={12} md={6}>
                        <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Category</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller 
                            name={'category'} 
                            control={control}
                            rules={rules.category}
                            render={({field: {onChange, value}}) =>(
                                <Select
                                    id="category-dropdown"
                                    value={value}
                                    onChange={onChange}
                                    sx={{ 
                                        width: {xs:'100%', md:'60%'}
                                    }}
                                >
                                <MenuItem disabled={true} value={0} >Please select one category</MenuItem>
                                {
                                    categories.map((eachCat) => {
                                        return <MenuItem value={eachCat.category_id}>{eachCat.category_name_en}</MenuItem>
                                    })
                                }
                                </Select>
                            )} 
                        />
                        {errors?.category && <span className={styles.errorMsg}> *Please select a category</span>}
                    </Grid>
                    
                    {/* Details */}
                    <Grid item xs={12} md={6}>
                        <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Details</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller 
                            name={'details'} 
                            control={control}
                            render={({field: {onChange, value}}) =>(
                                <TextField
                                    multiline
                                    rows={3}
                                    value={value}
                                    onChange={onChange}
                                    sx={{ 
                                        width: {xs:'100%', md:'60%'}
                                    }}
                                />
                            )} 
                        />
                    </Grid>
                    
                    {/* Amount */}
                    <Grid item xs={12} md={6}>
                        <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Amount</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller 
                                name={'amount'} 
                                control={control}
                                rules={rules.amount}
                                render={({field: {onChange, value}}) =>(
                                    <TextField
                                        type="number"
                                        value={value}
                                        onChange={onChange}
                                        sx={{ 
                                            width: {xs:'100%', md:'60%'}
                                        }}
                                    />
                                )} 
                            />
                    {errors?.amount && <span className={styles.errorMsg}> *Please enter a value bigger than 0</span>}
                    </Grid>
                    
                    {/* Currency */}
                    <Grid item xs={12} md={6}>
                        <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Currency</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller 
                            name={'currency'} 
                            control={control}
                            rules={rules.currency}
                            render={({field: {onChange, value}}) =>(
                                <Select
                                    id="currency-dropdown"
                                    value={value}
                                    onChange={onChange}
                                    sx={{ 
                                        width: {xs:'100%', md:'60%'}
                                    }}
                                >
                                <MenuItem disabled={true} value={0} >Please select one currency</MenuItem>
                                {
                                    currencies.map((eachCurrency) => {
                                        return <MenuItem value={eachCurrency.currency_id}>{eachCurrency.currency_name} - {eachCurrency.currency_country_en}</MenuItem>
                                    })
                                }
                                </Select>
                            )} 
                        />
                    {errors?.currency && <span className={styles.errorMsg}> *Please select a currency</span>}
                    </Grid>
                    
                    {/* Payment Method */}
                    <Grid item xs={12} md={6}>
                        <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Payment Method</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller 
                            name={'paymentMethod'} 
                            control={control}
                            rules={rules.paymentMethod}
                            render={({field: {onChange, value}}) =>(
                                <Select
                                    id="paymentMethod-dropdown"
                                    value={value}
                                    onChange={onChange}
                                    sx={{ 
                                        width: {xs:'100%', md:'60%'}
                                    }}
                                >
                                    <MenuItem disabled={true} value={0} >Please select payment method</MenuItem>
                                    <MenuItem value='Cash'>Cash</MenuItem>
                                    <MenuItem value='Card'>Card</MenuItem>
                                </Select>
                            )} 
                        />
                    {errors?.paymentMethod && <span className={styles.errorMsg}> *Please select a payment method</span>}
                    </Grid>
                    
                    {/* Date */}
                    <Grid item xs={12} md={6}>
                        <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Date</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Controller 
                                name={'date'} 
                                control={control}
                                render={({field: {onChange, value}}) =>(
                                    <DatePicker value={value} onChange={onChange} sx={{width: {xs:'100%', md:'60%'}}}/>
                                )} 
                            />
                        </LocalizationProvider>
                    </Grid>

                    {/* Buttons */}
                    {existingTransaction ? appendSaveAndDeleteButton() : appendSaveButton()}
                    
                    {/* Error message (if there are issue in deleting record)  */}
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