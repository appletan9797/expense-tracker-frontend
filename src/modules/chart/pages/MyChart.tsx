import { Chart } from "../components/Chart"
import { ChartProps } from "../../../types/TransactionInterfaceType"
import { getChartDataApiService } from "../services/GetChartDataApiService"
import { OthersMenuBar } from "../../../components/OtherMenubar"
import { useProcessChartData } from "../hooks/useProcessChartData"

export const getServerSideProps = async () =>{
    const response = await getChartDataApiService.getChartData()
    return{
        props:{
            chartData:response.data
        }
    }
}

export const MyChart = ({ chartData } : ChartProps) =>{

    const { expenseChartData, incomeChartData, detailsData } = useProcessChartData(chartData)
    return(
        <>
            <OthersMenuBar />
            <Chart expenseChartData={expenseChartData} incomeChartData={incomeChartData} detailsData={detailsData}/>
        </>
    )
}