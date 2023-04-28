import { Box, Grid, Select, MenuItem, TextField,Typography, FormLabel, Button, Alert, SelectChangeEvent } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { BsPlusSquareFill } from "react-icons/bs"
import { SaveCategoryFormData, SettingsProps } from "../../../types/TransactionInterfaceType"
import { FormEvent, useState } from "react"
import { saveSettingsApiService } from "../services/SaveSettingsApiService"
import styles from "../../../assets/styles/settingsMenu.module.css"
import _ from "lodash"

export const CategoriesSettings = ({currentUser, categories} : SettingsProps) =>{

    const [selectedCategory, setSelectedCategory] = useState(0)
    const [categoryNameEn, setCategoryNameEn] = useState("")
    const [categoryNameCn, setCategoryNameCn] = useState("")
    const [message, setMessage] = useState("")
    const [errorMsg,setErrorMsg] = useState("")

    const { handleSubmit, control, formState:{errors} } = useForm()
    const rules = {
        required:true
    }

    const handleChange = (event: SelectChangeEvent) =>{
        setSelectedCategory(Number(event.target.value))
        const selectedCatData = _.find(categories, (categories) => categories.category_id === event.target.value)
        if(selectedCatData){
            setCategoryNameEn(selectedCatData.category_name_en) 
            selectedCatData.category_name_cn === null ? setCategoryNameCn(" ") : setCategoryNameCn(selectedCatData.category_name_cn)
        }
    }

    const addNewCategory = () =>{
        setSelectedCategory(0)
        setCategoryNameCn(" ")
        setCategoryNameEn(" ")
    }

    const onFormSubmit = async(data: SaveCategoryFormData, event:FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        try{
            if(selectedCategory === 0){
                const response = await saveSettingsApiService.saveCategory(data.categoryNameEn, data.categoryNameCn, currentUser.user_id)
                if (response.success){
                    setMessage("Category created")
                }
            }
            else{
                const response = await saveSettingsApiService.updateCategory(selectedCategory, data.categoryNameEn, data.categoryNameCn, currentUser.user_id)
                if (response.success){
                    setMessage("Category updated")
                }
            }
        }
        catch(error:any){
            setErrorMsg("There is an error creating / updating the record. Please try again later.")
        }
    }

    return(
        <Box sx={{ width: '100%', marginTop:'20%' }}>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Grid container rowSpacing={5} justifyContent="space-between">

                    {/* Currency */}
                    <Grid item xs={12} md={6}>
                        <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Category</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Select
                            id="categories-dropdown"
                            value={selectedCategory.toString()}
                            onChange={handleChange}
                            sx={{ 
                                width: '35ch'
                            }}
                        >
                            <MenuItem value={0} disabled={true}>Please select a category</MenuItem>
                            {
                                categories.map((eachCategory) => {
                                    return <MenuItem value={eachCategory["category_id"]}>{eachCategory["category_name_en"]}</MenuItem>
                                })
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={12} md={2} className={styles.plusIconGrid}>
                        <BsPlusSquareFill size={30} className={styles.plusIcon} onClick={addNewCategory}></BsPlusSquareFill>
                    </Grid>

                    {/* Category Name (Eng) */}
                    <Grid item xs={12} md={6}>
                        <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Category Name (English)</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller 
                            name={"categoryNameEn"} 
                            rules={rules}
                            control={control}
                            render={({field: {onChange}}) =>(
                                <TextField
                                    id="categoryNameEn"
                                    value={categoryNameEn}
                                    onChange={(e) =>{
                                        setCategoryNameEn(e.target.value)
                                        onChange(e.target.value)
                                    }}
                                    sx={{ 
                                        width: {xs:'100%', md:'100%'}
                                    }}
                                />
                            )} 
                        />
                    </Grid>

                    {/* Category Name (Cn) */}
                    <Grid item xs={12} md={6}>
                    <Typography align='center' marginTop={1.5} fontSize={13}><FormLabel>Category Name (Mandarin)</FormLabel></Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller 
                            name={"categoryNameCn"}
                            control={control}
                            render={({field: {onChange}}) =>(
                                <TextField
                                    id="categoryNameCn"
                                    value={categoryNameCn}
                                    onChange={(e) =>{
                                        setCategoryNameCn(e.target.value)
                                        onChange(e.target.value)
                                    }}
                                    sx={{ 
                                        width: {xs:'100%', md:'100%'}
                                    }}
                                />
                            )} 
                        />
                    </Grid>

                    <Grid xs={12} md={6} />
                    {errors?.categoryNameEn && 
                        <Grid item xs={12} md={6}>
                            <Alert variant="outlined" severity="error">
                                Category Name (English) is required and must be filled
                            </Alert>
                        </Grid>
                    }
                    
                    {/* Save Button */}
                    <Grid item xs={12} md={12} sx={{ textAlign: 'right' }}>
                        <Button type='submit' variant='outlined' 
                            sx={{ width: '70%',backgroundColor:'gray', color:'white', borderRadius:'40px', height:'50px'}}>
                                Save
                        </Button>
                    </Grid>

                    {/* Message */}
                    { message && 
                        <Grid item xs={12} md={12}>
                            <Alert variant="outlined" severity="success">{message}</Alert>
                        </Grid>
                    }

                    {/* Error message (if there are issue updating the record)  */}
                    { errorMsg && 
                        <Grid item xs={12} md={12} textAlign="center">
                            <span className={styles.errorMsg}>*{errorMsg}</span>
                        </Grid> 
                    }
                    
                </Grid>
            </form>    
        </Box>
    )
}