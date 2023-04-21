import { ChartTypeFilter } from "./ChartTypeFilter"
import { ChartFigure } from "./ChartFigure"
import { ChartDetails } from "./ChartDetails"
import { ChartProps } from "../../../types/TransactionInterfaceType"
import { useState } from "react"

export const Chart = ({expenseChartData, incomeChartData, detailsData}:ChartProps) =>{

    const [chartData, setChartData] = useState(expenseChartData)
    const updateTransactionType = (transactionType:string) =>{
        transactionType === "Expense" ? setChartData(expenseChartData) : setChartData(incomeChartData)
    }

    return(
        <>
            <ChartTypeFilter updateChartComponent={updateTransactionType}/>
            <ChartFigure chartData={chartData} />
            <ChartDetails detailsData={detailsData} chartData={chartData}/>
        </>
    )
}