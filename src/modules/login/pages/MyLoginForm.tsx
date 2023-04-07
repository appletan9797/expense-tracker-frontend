import { LoginForm } from "../components/LoginForm"

export const getServerSideProps = (context) =>{
    let token = context.req.cookies['expense_tracker_login']
    if(token){
        return {
            redirect: {
              permanent: false,
              destination: "../expenses",
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