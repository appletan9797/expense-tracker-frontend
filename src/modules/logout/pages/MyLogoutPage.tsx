import Cookies from 'universal-cookie'
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

export const MyLogout = () =>{
    const cookies = new Cookies()
    
    useEffect(() =>{
        cookies.remove('expense_tracker_login')
        localStorage.removeItem('userDefaultCurrency')
        localStorage.removeItem('currencies')
    },[])
    
    return(
        <>
            <h2>Expense Tracker</h2>
            <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h4" align="center">
                You have successfully logged out.
                <br />
                <a href='../login'>Back to login page</a>
            </Typography>
      </Box>
        </>
        
    )
}