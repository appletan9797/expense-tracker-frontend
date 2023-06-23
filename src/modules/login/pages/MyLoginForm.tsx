import { GetServerSidePropsContext } from "next";
import { LoginForm } from "../components/LoginForm"

export const getServerSideProps = (context:GetServerSidePropsContext) =>{
    let token = context.req.cookies['expense_tracker_login']
    if(token){
        return {
            redirect: {
              permanent: false,
              destination: "../",
            },
          };
    }

    return{
        props:{}
    }
}

export const MyLoginForm = () =>{
    return(
        <>
            <LoginForm></LoginForm>
        </>
    ) 
}