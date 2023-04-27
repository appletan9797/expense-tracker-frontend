import { SettingsMenu } from "./SettingsMenu"
import { CategoriesSettings } from "./CategoriesSettings"
import { CurrencySettings } from "./CurrencySettings"
import { ProfileSettings } from "./ProfileSettings"
import { Grid } from "@mui/material"
import { useState } from "react"

export const Settings = () =>{
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
                {menu === 0 && <CategoriesSettings />}
                {menu === 1 && <CurrencySettings />}
                {menu === 2 && <ProfileSettings />}
            </Grid>
        </Grid>
        
    )
}