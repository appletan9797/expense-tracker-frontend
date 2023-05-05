import { GroupedChartData, TransactionDetails } from "../types/TransactionInterfaceType"
import _ from "lodash"

class ProcessChartDataUtils{
    
    getGroupedData(transactionDetails:TransactionDetails[], currencyId: number, transactionType:string){
        const filteredTransaction = _.filter(transactionDetails, (eachTransaction) => 
                                                        eachTransaction.currency_id === currencyId && 
                                                        eachTransaction.transaction_type === transactionType)                                  
        const groupedData = _.groupBy(filteredTransaction, (eachTransaction) => eachTransaction.category_name_en)
        return groupedData
    }

    getPieChartData(data:GroupedChartData){
        const totalAmount = _.sumBy(_.flatten((Object.values(data))), transaction => Number(transaction.transaction_amount))
        const res = _.map(data, (eachCategory, categoryName) =>{
            return{
                "label":categoryName,
                "value":((_.sumBy(eachCategory,(transaction) => Number(transaction.transaction_amount))/ totalAmount) * 100).toFixed(1)
            }
        })
        return res
    }
}

export const processChartDataUtils = new ProcessChartDataUtils()