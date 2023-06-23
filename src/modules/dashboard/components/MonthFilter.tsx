import { MdCalendarMonth } from "react-icons/md"
import { Menu } from "@mui/material"
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useState } from "react"
import { MonthFilterProps } from "../../../types/TransactionInterfaceType"
import styles from "../../../assets/styles/transactionSummary.module.css"

export const MonthFilter = ({updateTransactions} : MonthFilterProps) =>{

    const [isMenuOpen, setMenuOpen] = useState(false)

    const date = new Date()
    const [selectedDate, setSelectedDate] = useState(date)

    const handleChange = (selectedPeriod : Date | null) =>{
        if(selectedPeriod !== null){
            setSelectedDate(selectedPeriod)
            const date = new Date(selectedPeriod)
            const month = date.getMonth()+1
            const year = date.getFullYear()
            updateTransactions(month,year)
        }
        handleClose()
    } 

    const handleClick = () => {
        setMenuOpen(true)
    }
    
    const handleClose = () =>{
        setMenuOpen(false)
    }

    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MdCalendarMonth 
                size={28}
                aria-label="calendar"
                id="calendarButton"
                aria-controls={isMenuOpen ? 'calendarMenu' : undefined}
                aria-expanded={isMenuOpen ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                className={styles.monthFilter}
            />
            <Menu
                id="calendarMenu"
                anchorEl={document.getElementById('calendarButton')}
                open={isMenuOpen}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'calendarButton',
                }}
            >
                <DateCalendar
                    onMonthChange={handleChange}
                    views={["year", "month"]}
                    minDate={new Date("2010-01-01")}
                    defaultValue={selectedDate}
                />
            </Menu>
        </LocalizationProvider>
    )
}