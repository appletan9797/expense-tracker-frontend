import { GetServerSidePropsContext } from "next"
import { ResetPasswordFormProps } from "../../../types/TransactionInterfaceType"
import { ResetPasswordForm } from "../components/ResetPasswordForm"

export const getServerSideProps = (context:GetServerSidePropsContext) =>{
    const {passwordResetToken} = context.query

    return{
        props:{
            token : passwordResetToken
        }
    }
}

export const MyResetPassword = ({token} : ResetPasswordFormProps) =>{
    return(
        <>
            <h1>Expense Tracker</h1>
            <ResetPasswordForm token={token}/>
        </>
    )
}