import { ChartFilterProps } from '../../../types/TransactionInterfaceType'
import { Select, MenuItem, SelectChangeEvent} from '@mui/material'
import { useState } from 'react'

export const TransactionTypeFilter = ({onFilterChange} : ChartFilterProps) =>{

    const [type, setType] = useState("Expense")
    const handleChange = (event : SelectChangeEvent) =>{
        setType(event.target.value)
        onFilterChange(event.target.value) 
    }
    return(
        <Select
            id="type-dropdown"
            value={type}
            onChange={handleChange}
            sx={{ 
                width: {md:"15%",xs:"100%"}
            }}
        >
            <MenuItem value={"Expense"} >Expense</MenuItem>
            <MenuItem value={"Income"}>Income</MenuItem>
        </Select>
    )
}