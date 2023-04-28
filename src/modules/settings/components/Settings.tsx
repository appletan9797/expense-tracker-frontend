import { SettingsMenu } from "./SettingsMenu"
import { CategoriesSettings } from "./CategoriesSettings"
import { CurrencySettings } from "./CurrencySettings"
import { ProfileSettings } from "./ProfileSettings"
import { Grid } from "@mui/material"
import { useState } from "react"
import { UserProps } from "../../../types/TransactionInterfaceType"

export const Settings = ({currentUser} : UserProps) =>{
    const [menu, SetMenu] = useState(0)

    const updateMenuContent = (menuNumber:number) =>{
        SetMenu(menuNumber)
    }

    return(
        <Grid container>
            <Grid item xs={12} md={4}>
                <SettingsMenu updateSettings={updateMenuContent}/>
            </Grid>
            <Grid item xs={12} md={8}>
                {menu === 0 && <CategoriesSettings currentUser={currentUser}/>}
                {menu === 1 && <CurrencySettings currentUser={currentUser}/>}
                {menu === 2 && <ProfileSettings currentUser={currentUser}/>}
            </Grid>
        </Grid>
        
    )
}