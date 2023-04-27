import { Box, List, ListItemButton } from "@mui/material"
import { useState } from "react"
import style from "../../../assets/styles/settingsMenu.module.css"
import { SettingsProps } from "../../../types/TransactionInterfaceType";

export const SettingsMenu = ({updateSettings} : SettingsProps) =>{
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (menuNumber: number) => {
        setSelectedIndex(menuNumber);
        updateSettings(menuNumber)
    }

    return(
        <Box sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper', position:'absolute',top:'30%' }}>
        <List component="nav" aria-label="main mailbox folders">
            <ListItemButton
                selected={selectedIndex === 0}
                onClick={() => handleListItemClick(0)}
            >
                <span className={style.menuText}>Manage categories</span>
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 1}
                onClick={() => handleListItemClick(1)}
            >
                <span className={style.menuText}>Manage default currency</span>
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(2)}
            >
                <span className={style.menuText}>Edit profile</span>
            </ListItemButton>
      </List>
    </Box>
    )
}