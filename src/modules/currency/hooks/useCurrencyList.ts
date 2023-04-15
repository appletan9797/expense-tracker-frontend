import { useEffect, useState } from "react"

export const useCurrencyList = () =>{
    const [currencies, setCurrencies] = useState([])

    useEffect(() => {
        const storedCurrencies = localStorage.getItem('currencies')
        if(storedCurrencies){
            setCurrencies(JSON.parse(storedCurrencies))
        }
    },[])

    return currencies
}