import { OthersMenuBar } from "../../../components/OtherMenubar"
import { Settings } from "../components/Settings"
import { getCurrentUserApiService } from "../../user/services/GetCurrentUserApiService"
import { GetServerSidePropsContext } from "next"
import { UserId } from "../../../types/TransactionInterfaceType"

export const getServerSideProps = async(context:GetServerSidePropsContext) =>{
    const token = context.req.cookies['expense_tracker_login']
    const userId = await getCurrentUserApiService.getCurrentUser(token)
    return{
        props:{
            userId
        }
    }
}

export const MySettings = ({userId} : UserId) =>{

    return(
        <>
            <OthersMenuBar />
            <Settings currentUserId={userId}/>
        </>
       
    )
}