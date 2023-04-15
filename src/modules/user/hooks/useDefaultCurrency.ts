import { useEffect, useState } from "react"

export const useDefaultCurrency = () =>{
    const [userDefaultCurrency, setUserDefaultCurrency] = useState(1)

    useEffect(() => {
        const storedUserDefaultCurrency = localStorage.getItem('userDefaultCurrency')

        if(storedUserDefaultCurrency){
            setUserDefaultCurrency(Number(storedUserDefaultCurrency))
        }
    },[userDefaultCurrency])

    return userDefaultCurrency
}