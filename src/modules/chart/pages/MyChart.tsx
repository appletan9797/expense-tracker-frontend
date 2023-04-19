import { Chart } from "../components/Chart"
import { ChartDetails } from "../components/ChartDetails"
import { ChartProps } from "../../../types/TransactionInterfaceType"
import { getChartDataApiService } from "../services/GetChartDataApiService"
import { OthersMenuBar } from "../../../components/OtherMenubar"

export const getServerSideProps = async () =>{
    const response = await getChartDataApiService.getChartData()
    return{
        props:{
            chartData : response.chart_data,
            detailsData : response.details_data
        }
    }
}

export const MyChart = ({ chartData, detailsData } : ChartProps) =>{
    return(
        <>
            <OthersMenuBar />
            <Chart chartData={chartData} />
            <ChartDetails detailsData={detailsData} chartData={chartData}/>
        </>
    )
}