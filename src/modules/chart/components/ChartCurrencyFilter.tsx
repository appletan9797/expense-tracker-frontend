import { ChartFilterProps } from '../../../types/TransactionInterfaceType'
import { Select, MenuItem, SelectChangeEvent} from '@mui/material'
import { useCurrencyList } from '../../currency/hooks/useCurrencyList'
import { useDefaultCurrency } from '../../user/hooks/useDefaultCurrency'
import { useEffect, useState } from 'react'

export const ChartCurrencyFilter = ({updateChartComponent} : ChartFilterProps) =>{

    const currencyList = useCurrencyList()
    const defaultCurrency = useDefaultCurrency()
    const [currency, setCurrency] = useState(defaultCurrency)
    const [loading, setLoading] = useState(true)

    const handleChange = (event : SelectChangeEvent) =>{
        setCurrency(Number(event.target.value))
        updateChartComponent(event.target.value)
    }

    useEffect(() =>{
        if(currencyList.length>0){
            defaultCurrency !== 0 ? setCurrency(defaultCurrency) : setCurrency(1)
            setLoading(false)
        }
    },[currencyList, defaultCurrency])

    return(
        loading ? <div></div> :
        <Select
            id="type-dropdown"
            value={currency}
            onChange={handleChange}
            sx={{ 
                width: '18%',
                marginLeft:'15px'
            }}
        >
            {
                currencyList.map((eachCurrency) => {
                    return <MenuItem value={eachCurrency["currency_id"]}>{eachCurrency["currency_name"]} - {eachCurrency["currency_country_en"]}</MenuItem>
                })
            }
        </Select>
    )
}