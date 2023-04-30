import { ChartTypeFilter } from "./ChartTypeFilter"
import { ChartFigure } from "./ChartFigure"
import { ChartDetails } from "./ChartDetails"
import { ChartPeriodFilter } from "./ChartPeriodFilter"
import { ChartProps, ChartData } from "../../../types/TransactionInterfaceType"
import { useState, useEffect } from "react"
import { getChartDataApiService } from "../services/GetChartDataApiService"
import { useDefaultCurrency } from "../../user/hooks/useDefaultCurrency"
import { ChartCurrencyFilter } from "./ChartCurrencyFilter"
import { processChartDataUtils } from "../../../utils/processChartData"

export const Chart = ({transactionsDetails, userId}:ChartProps) =>{

    const defaultCurrency = useDefaultCurrency()
    const [currencyId, setCurrencyId] = useState(0)
    const [transactionType, setTransactionType] = useState("Expense")
    const [chartData, setChartData] = useState<ChartData[]>()
    const [detailData, setDetailData] = useState(transactionsDetails)
    
    const updateTransactionType = (type:string) =>{
        setTransactionType(type)
        setChartData(processChartDataUtils.processChartData(transactionsDetails,currencyId,type))
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
            setChartData(processChartDataUtils.processChartData(transactionsDetails,currencyId,transactionType))
        }
    },[currencyId])

    return(
        <>
            <ChartTypeFilter updateChartComponent={updateTransactionType}/>
            <ChartCurrencyFilter updateChartComponent={updateTransactionCurrency} />
            <ChartPeriodFilter updateChartComponent={updateTransactionPeriod}/>
            {chartData ?
                <>
                    <ChartFigure chartData={chartData}/>
                    <ChartDetails detailsData={detailData} transactionType={transactionType} currencyId={currencyId}/> 
                </> :
                <div>Loading</div>
            }
        </>
    )
}