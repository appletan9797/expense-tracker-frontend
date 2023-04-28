import { OthersMenuBar } from "../../../components/OtherMenubar"
import { Settings } from "../components/Settings"
import { getCurrentUserApiService } from "../../user/services/GetCurrentUserApiService"
import { GetServerSidePropsContext } from "next"
import { UserProps } from "../../../types/TransactionInterfaceType"

export const getServerSideProps = async(context:GetServerSidePropsContext) =>{
    const token = context.req.cookies['expense_tracker_login']
    const currentUser = await getCurrentUserApiService.getCurrentUser(token)
    return{
        props:{
            currentUser
        }
    }
}

export const MySettings = ({currentUser} : UserProps) =>{

    return(
        <>
            <OthersMenuBar />
            <Settings currentUser={currentUser}/>
        </>
       
    )
}