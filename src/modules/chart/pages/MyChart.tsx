import { Chart } from "../components/Chart"
import { ChartProps } from "../../../types/TransactionInterfaceType"
import { getChartDataApiService } from "../services/GetChartDataApiService"
import { OthersMenuBar } from "../../../components/OtherMenubar"

export const getServerSideProps = async () =>{
    const response = await getChartDataApiService.getChartData()
    return{
        props:{
            transactionsDetails:response.data
        }
    }
}

export const MyChart = ({ transactionsDetails } : ChartProps) =>{
    
    return(
        <>
            <OthersMenuBar />
            <Chart transactionsDetails={transactionsDetails} />
        </>
    )
}