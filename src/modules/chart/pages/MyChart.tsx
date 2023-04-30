import { Chart } from "../components/Chart"
import { ChartProps } from "../../../types/TransactionInterfaceType"
import { getChartDataApiService } from "../services/GetChartDataApiService"
import { getCurrentUserApiService } from "../../user/services/GetCurrentUserApiService"
import { OthersMenuBar } from "../../../components/OtherMenubar"
import { GetServerSidePropsContext } from "next"

export const getServerSideProps = async (context:GetServerSidePropsContext) =>{
    const token = context.req.cookies['expense_tracker_login']
    const currentUser = await getCurrentUserApiService.getCurrentUser(token)
    const response = await getChartDataApiService.getChartData(currentUser.user_id)
    return{
        props:{
            transactionsDetails:response.data,
            userId:currentUser.user_id
        }
    }
}

export const MyChart = ({ transactionsDetails, userId } : ChartProps) =>{
    
    return(
        <>
            <OthersMenuBar />
            <Chart transactionsDetails={transactionsDetails} userId={userId}/>
        </>
    )
}