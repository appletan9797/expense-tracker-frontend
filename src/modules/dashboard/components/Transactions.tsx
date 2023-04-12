import { TransactionSummary } from "../components/TransactionSummary"
import { TransactionRecord } from "../components/TransactionRecord"
import { Grid } from "@mui/material"

export const Transactions = ({ loading, transactions, currencies, userDefaultCurrency } : TransactionComponentProps) =>{

    return(
        <>
        {
                loading ? <div>Loading...</div> :
                <>
                    <TransactionSummary monthlyTransactions={transactions} currencies={currencies} userDefaultCurrency={userDefaultCurrency}/>
                    <Grid container>
                        {
                            Object.keys(transactions).map((dailyTransactions)=>{
                                return <TransactionRecord dailyTransactions={transactions[dailyTransactions]} date={dailyTransactions}/>
                            })
                        }
                    </Grid>
                </>
            }
        </>
    )
    
}