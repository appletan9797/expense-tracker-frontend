import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ChartFilterProps } from '../../../types/TransactionInterfaceType'

export const ChartPeriodFilter = ({updateChartComponent}:ChartFilterProps) =>{
    
    const handleChange = (selecedDate : Date | null) =>{
        if(selecedDate !== null){
            const date = new Date(selecedDate)
            const month = date.getMonth()+1
            const year = date.getFullYear()
            updateChartComponent(month,year)
        }
    }

    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker 
                onAccept={handleChange} 
                views={['year', 'month']}
                minDate={new Date('2010-01-01')}
                defaultValue={new Date()}
                format="MM/yyyy"
                sx={{width: {xs:'100%', md:'18%'}, marginLeft:'10px'}}/>
        </LocalizationProvider>
    )
}