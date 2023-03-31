import {useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Button from '@mui/material/Button';
import { MyAddExpenseFormProps } from '../../../types/ExpenseInterfaceType';

export const Form = ({ categories, currencies, defaultCurrency } : MyAddExpenseFormProps) =>{
    const formatDate = (date:Date) =>{
        const year = date.getFullYear()
        const month = date.getMonth()+1
        const day = date.getDate()
        return year+"-"+month+"-"+day
    }

    const [category, setCategory] = useState('0')
    const [details, setDetails] = useState('')
    const [amount, setAmount] = useState<number>(0)
    const [currency, setCurrency] = useState(() => {
        if (defaultCurrency != null){
            return defaultCurrency.currency_id
        }
        return '0'
    })
    const [paymentMethod, setPaymentMethod] = useState('0')
    const [date, setDate] = useState(new Date())
    const [dateToSubmit, setDateToSubmit] = useState(()=>{
        return formatDate(new Date())
    })

    const handleCategoryChange = (event:SelectChangeEvent) =>{
        setCategory(event.target.value)
    }
    const handleDetailsChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setDetails(event.target.value)
    }
    const handleAmountChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setAmount(Number(event.target.value))
    }
    const handleCurrencyChange = (event:SelectChangeEvent) =>{
        setCurrency(event.target.value)
    }
    const handlePaymentMethodChange = (event:SelectChangeEvent)=>{
        setPaymentMethod(event.target.value)
    }
    const handleDateChange = (date: Date) =>{
        setDate(date)
        setDateToSubmit(formatDate(date))
    }

    return(
        <Box sx={{ width: '100%' }}>
            <form method='post' action='http://localhost/api/add-expense?'>
            
                <Grid container rowSpacing={5} justifyContent="space-between">
                    {/* Category */}
                    <Grid item xs={12} md={6}>
                        <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Category</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Select
                            name='category'
                            id="category-dropdown"
                            value={category}
                            onChange={handleCategoryChange}
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
                    </Grid>

                    {/* Details */}
                    <Grid item xs={12} md={6}>
                        <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Details</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            multiline
                            rows={3}
                            name='details'
                            value={details}
                            onChange={handleDetailsChange}
                            sx={{ 
                                width: {xs:'100%', md:'60%'}
                            }}
                        />
                    </Grid>

                    {/* Amount */}
                    <Grid item xs={12} md={6}>
                        <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Amount</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            type="number"
                            name='amount'
                            value={amount}
                            onChange={handleAmountChange}
                            sx={{ 
                                width: {xs:'100%', md:'60%'}
                            }}
                        />
                    </Grid>

                    {/* Currency */}
                    <Grid item xs={12} md={6}>
                        <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Currency</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Select
                            id="currency-dropdown"
                            name='currency'
                            value={currency}
                            onChange={handleCurrencyChange}
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
                    </Grid>

                    {/* Payment Method */}
                    <Grid item xs={12} md={6}>
                        <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Payment Method</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Select
                            id="paymentMethod-dropdown"
                            name='paymentMethod'
                            value={paymentMethod}
                            onChange={handlePaymentMethodChange}
                            sx={{ 
                                width: {xs:'100%', md:'60%'}
                            }}
                        >
                        <MenuItem disabled={true} value={0} >Please select payment method</MenuItem>
                        <MenuItem value='Cash'>Cash</MenuItem>
                        <MenuItem value='Card'>Card</MenuItem>
                        </Select>
                    </Grid>

                    {/* Date */}
                    <Grid item xs={12} md={6}>
                        <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Date</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker value={date} onChange={handleDateChange} sx={{width: {xs:'100%', md:'60%'}}}/>
                        </LocalizationProvider>
                    </Grid>
                    <input type='hidden' name='date' value={dateToSubmit} />

                    {/* Save button */}
                    <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
                        <Button type='submit' variant='outlined' 
                            sx={{ width: '20%', backgroundColor:'gray', color:'white', borderRadius:'40px', height:'50px'}}>
                                Save
                        </Button>
                    </Grid>
                </Grid>
            </form>    
        </Box>   
    )
}