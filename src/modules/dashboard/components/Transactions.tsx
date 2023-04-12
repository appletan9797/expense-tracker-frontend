import { TransactionSummary } from "../components/TransactionSummary"
import { TransactionRecord } from "../components/TransactionRecord"
import { Grid } from "@mui/material"
import { TransactionComponentProps,TransactionDetails } from "../../../types/TransactionInterfaceType"
import { useEffect, useState } from "react"

export const Transactions = ({ loading, transactions, currencies, userDefaultCurrency } : TransactionComponentProps) =>{
    const [defaultCurrency, setDefaultCurrency] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() =>{
        setIsLoading(true)
        setDefaultCurrency(userDefaultCurrency)
        if(loading === false){
            setIsLoading(false)
        }
    },[userDefaultCurrency, loading])

    const updateCurrency = (currencyId : number) =>{
        setDefaultCurrency(currencyId)
    }

    return(
        <>
        {
            isLoading ? <div>Loading...</div> :
                <>
                <TransactionSummary 
                    monthlyTransactions={transactions} 
                    currencies={currencies}
                    userDefaultCurrency={userDefaultCurrency} 
                    updateTransactionComponent={updateCurrency}
                    />
                    <Grid container>
                        {
                            Object.keys(transactions).map((dailyTransactions)=>{
                            const matchingTransactions = transactions[dailyTransactions].filter((transaction :TransactionDetails) => transaction.currency_id === defaultCurrency)
                            if (matchingTransactions.length > 0){
                                return <TransactionRecord 
                                        dailyTransactions={transactions[dailyTransactions]} 
                                        date={dailyTransactions} 
                                        userDefaultCurrency={defaultCurrency}
                                    />
                            }
                            })
                        }
                    </Grid>
                </>
            }
        </>
    )
    
}