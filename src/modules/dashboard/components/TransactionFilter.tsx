import { FaFilter } from "react-icons/fa"
import { Menu, MenuItem} from "@mui/material"
import { useState } from "react";
import { TransactionFilterProps } from "../../../types/TransactionInterfaceType"
import styles from "../../../assets/styles/transactionSummary.module.css"

export const TransactionFilter = ({currencies, userDefaultCurrency, updateTransactionSummaryComponent} : TransactionFilterProps) =>{
    const [menuVisibility, setMenuVisibility] = useState(null)
    const isMenuOpen = Boolean(menuVisibility);
    const handleClick = (event : React.MouseEvent) => {
        setMenuVisibility(event.currentTarget)
    }
    
    const handleClose = () =>{
        setMenuVisibility(null)
    }
    
    const [selectedCurrency, setSelectedCurrency] = useState(userDefaultCurrency)
    const handleCurrencyFilter = (currencyId : number) => {
        setSelectedCurrency(currencyId)
        updateTransactionSummaryComponent(currencyId)
        handleClose()
    }

    return(
        <>
            <FaFilter
                aria-label="currencyFilter"
                id="filterButton"
                aria-controls={isMenuOpen ? 'currencyMenu' : undefined}
                aria-expanded={isMenuOpen ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                size={23} 
                className={styles.iconFilter}
            />
            <Menu
                id="currencyMenu"
                MenuListProps={{
                'aria-labelledby': 'filterButton',
                }}
                anchorEl={menuVisibility}
                open={isMenuOpen}
                onClose={handleClose}
                PaperProps={{
                style: {
                    //maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                },
                }}
            >
                {
                    currencies.map((currency) => (
                        <MenuItem 
                            key={currency.currency_id} 
                            selected={currency.currency_id === selectedCurrency}
                            onClick={()=>handleCurrencyFilter(Number(currency.currency_id))}
                        >
                            {currency.currency_name} ({currency.currency_country_en})
                        </MenuItem>
                    ))
                }
            </Menu>
        </>
    )
}