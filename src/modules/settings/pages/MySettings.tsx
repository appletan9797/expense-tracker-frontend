import { OthersMenuBar } from "../../../components/OtherMenubar"
import { Settings } from "../components/Settings"
import { getCurrentUserApiService } from "../../user/services/GetCurrentUserApiService"
import { getCategoryApiService } from "../../category/services/GetCategoryApiService"
import { GetServerSidePropsContext } from "next"
import { SettingsProps } from "../../../types/TransactionInterfaceType"

export const getServerSideProps = async(context:GetServerSidePropsContext) =>{
    const token = context.req.cookies['expense_tracker_login']
    const currentUser = await getCurrentUserApiService.getCurrentUser(token)
    const categories = await getCategoryApiService.getAllCategory(currentUser.user_id)

    return{
        props:{
            currentUser,
            categories : categories.categories
        }
    }
}

export const MySettings = ({currentUser, categories} : SettingsProps) =>{

    return(
        <>
            <OthersMenuBar />
            <Settings currentUser={currentUser} categories={categories}/>
        </>
       
    )
}