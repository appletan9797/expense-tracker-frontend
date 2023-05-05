import { TransactionTypeFilter } from "./TransactionTypeFilter"
import { PieChart as TransactionChartFigure } from "./PieChart"
import { TransactionDetails as TransactionChartDetails } from "./TransactionDetails"
import { TransactionPeriodFilter } from "./TransactionPeriodFilter"
import { ChartProps, ChartData } from "../../../types/TransactionInterfaceType"
import { useState, useEffect } from "react"
import { getChartDataApiService } from "../services/GetChartDataApiService"
import { useDefaultCurrency } from "../../user/hooks/useDefaultCurrency"
import { TransactionCurrencyFilter } from "./TransactionCurrencyFilter"
import { processChartDataUtils } from "../../../utils/processChartData"

export const Chart = ({transactionsDetails, userId}:ChartProps) =>{

    const defaultCurrency = useDefaultCurrency()
    const [currencyId, setCurrencyId] = useState(0)
    const [transactionType, setTransactionType] = useState("Expense")
    const [chartData, setChartData] = useState<ChartData[]>()
    const [detailData, setDetailData] = useState(transactionsDetails)
    
    const updateTransactionType = (type:string) =>{
        setTransactionType(type)
        setChartData(processChartDataUtils.processChartData(detailData,currencyId,type))
    }

    const updateTransactionCurrency = (currency:number) =>{
        setCurrencyId(currency)
    }
    
    const updateTransactionPeriod = async(month:number, year:number) =>{
        const response = await getChartDataApiService.getChartData(userId, month, year)
        setDetailData(response.data)
        setChartData(processChartDataUtils.processChartData(response.data,currencyId,transactionType))
    }

    useEffect(() =>{
        defaultCurrency !== 0 ? setCurrencyId(defaultCurrency) : setCurrencyId(1)
    },[defaultCurrency])

    useEffect(() =>{
        if(currencyId !== 0){
            setChartData(processChartDataUtils.processChartData(detailData,currencyId,transactionType))
        }
    },[currencyId])

    return(
        <>
            <TransactionTypeFilter onFilterChange={updateTransactionType}/>
            <TransactionCurrencyFilter onFilterChange={updateTransactionCurrency} />
            <TransactionPeriodFilter onFilterChange={updateTransactionPeriod}/>
            {chartData ?
                <>
                    <TransactionChartFigure data={chartData}/>
                    <TransactionChartDetails data={detailData} transactionType={transactionType} currencyId={currencyId}/> 
                </> :
                <div>Loading</div>
            }
        </>
    )
}