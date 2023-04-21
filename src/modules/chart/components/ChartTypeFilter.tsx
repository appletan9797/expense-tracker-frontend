import { ChartFilterProps } from '../../../types/TransactionInterfaceType'
import { Select, MenuItem, SelectChangeEvent} from '@mui/material'
import { useState } from 'react'

export const ChartTypeFilter = ({updateChartComponent} : ChartFilterProps) =>{

    const [type, setType] = useState("Expense")
    const handleChange = (event : SelectChangeEvent) =>{
        setType(event.target.value)
        updateChartComponent(event.target.value)
    }
    return(
        <Select
            id="type-dropdown"
            value={type}
            onChange={handleChange}
            sx={{ 
                width: '15%'
            }}
        >
            <MenuItem value={"Expense"} >Expense</MenuItem>
            <MenuItem value={"Income"}>Income</MenuItem>
        </Select>
    )
}