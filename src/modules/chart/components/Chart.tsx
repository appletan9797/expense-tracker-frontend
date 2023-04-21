import { ChartTypeFilter } from "./ChartTypeFilter"
import { ChartFigure } from "./ChartFigure"
import { ChartDetails } from "./ChartDetails"
import { ChartPeriodFilter } from "./ChartPeriodFilter"
import { ChartProps } from "../../../types/TransactionInterfaceType"
import { useState, useEffect } from "react"
import { getChartDataApiService } from "../services/GetChartDataApiService"
import { useDefaultCurrency } from "../../user/hooks/useDefaultCurrency"
import { ChartCurrencyFilter } from "./ChartCurrencyFilter"

export const Chart = ({expenseChartData, incomeChartData, detailsData}:ChartProps) =>{

    const defaultCurrency = useDefaultCurrency()
    const [expenseData, setExpenseData] = useState(expenseChartData)
    const [incomeData, setIncomeData] = useState(incomeChartData)
    const [detailData, setDetailData] = useState(detailsData)
    const [transactionType, setTransactionType] = useState("Expense")
    const [currencyId, setCurrencyId] = useState(defaultCurrency)
    const [chartData, setChartData] = useState(expenseData)

    const updateTransactionType = (type:string) =>{
        setTransactionType(type)
        updateChartData(type)
    }

    const updateTransactionCurrency = (currency:number) =>{
        setCurrencyId(currency)
    }
    const updateTransactionPeriod = async(month:number, year:number) =>{
        const response = await getChartDataApiService.getChartData(month, year)
        setExpenseData(response.expense_chart_data)
        setIncomeData(response.income_chart_data)
        setDetailData(response.details_data)
    }

    const updateChartData = (transactionTypeParam: string) =>{
        transactionTypeParam === "Expense" ? setChartData(expenseData) : setChartData(incomeData)
    }

    useEffect(() =>{
        updateChartData(transactionType)
    })

    useEffect(() =>{
        defaultCurrency !== 0 ? setCurrencyId(defaultCurrency) : setCurrencyId(1)
    },[defaultCurrency])

    return(
        <>
            <ChartTypeFilter updateChartComponent={updateTransactionType}/>
            <ChartCurrencyFilter updateChartComponent={updateTransactionCurrency} />
            <ChartPeriodFilter updateChartComponent={updateTransactionPeriod}/>
            <ChartFigure chartData={chartData} currencyId={currencyId}/>
            <ChartDetails detailsData={detailData} chartData={chartData} currencyId={currencyId}/>
        </>
    )
}