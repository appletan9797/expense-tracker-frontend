import { TransactionSummary } from "../components/TransactionSummary"
import { TransactionRecord } from "../components/TransactionRecord"
import { getAllExpenseApiService } from "../services/GetAllTransactionApiService"
import { Grid } from "@mui/material"
import { TransactionComponentProps,TransactionDetails } from "../../../types/TransactionInterfaceType"
import { useEffect, useState } from "react"

export const Transactions = ({ loading, transactions, currencies, userDefaultCurrency, userId } : TransactionComponentProps) =>{
    const [transactionsData, setTransactionsData] = useState(transactions)
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

    const updateTransaction = async(month: number, year: number) =>{
        const transactions = await getAllExpenseApiService.getAllExpense(userId,month,year)
        setTransactionsData(transactions)
    }

    return(
        <>
        {
            isLoading ? <div>Loading...</div> :
            <>
                <TransactionSummary 
                    key={1}
                    dateTransactionsMap={transactionsData} 
                    currencies={currencies}
                    userDefaultCurrency={userDefaultCurrency} 
                    updateTransactionComponent={updateCurrency}
                    updateTransactions={updateTransaction}
                    />
                <Grid container>
                    {
                        Object.keys(transactionsData).map((dailyTransactions)=>{
                            const matchingTransactions = transactionsData[dailyTransactions].filter((transaction :TransactionDetails) => transaction.currency_id === defaultCurrency)
                            if (matchingTransactions.length > 0){
                                return <TransactionRecord 
                                        key={dailyTransactions}
                                        dailyTransactions={transactionsData[dailyTransactions]} 
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