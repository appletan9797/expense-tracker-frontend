import { Chart } from "../components/Chart"
import { ChartProps } from "../../../types/TransactionInterfaceType"
import { getChartDataApiService } from "../services/GetChartDataApiService"
import { OthersMenuBar } from "../../../components/OtherMenubar"

export const getServerSideProps = async () =>{
    const response = await getChartDataApiService.getChartData()
    return{
        props:{
            incomeChartData : response.income_chart_data,
            expenseChartData : response.expense_chart_data,
            detailsData : response.details_data
        }
    }
}

export const MyChart = ({ incomeChartData, expenseChartData, detailsData } : ChartProps) =>{
    return(
        <>
            <OthersMenuBar />
            <Chart expenseChartData={expenseChartData} incomeChartData={incomeChartData} detailsData={detailsData}/>
        </>
    )
}