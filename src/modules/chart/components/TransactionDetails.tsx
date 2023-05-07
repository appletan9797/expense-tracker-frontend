import { ChartDetailsProps, DetailsBodyProps, ChartData } from "../../../types/TransactionInterfaceType"
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material"
import { processChartDataUtils } from "../../../utils/processChartData"
import _ from "lodash"

export const TransactionDetails = ({ data }: ChartDetailsProps) =>{
    const DetailsTable = () =>{
        return(
            <TableContainer component={Paper} sx={{ marginBottom:"15px", border:"1px solid silver" }}>
                <Table sx={{ minWidth:350}} >
                    <TableBody>
                        { 
                            _.map(data, (eachCategory, categoryName) =>{
                                //To get the data from chart data, which label name equals to current category name 
                                //(to get the percentage)
                                const currentCategory = _.find(processChartDataUtils.getPieChartData(data), 
                                                                (eachCategory) => { 
                                                                    return eachCategory.label === categoryName
                                                                })
                                return(
                                    <DetailsTableBody 
                                        categoryName={categoryName} 
                                        currentCategoryChartData={currentCategory ? currentCategory : {}}
                                        currentCategoryTransactions={eachCategory}
                                    />
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
    
    const DetailsTableBody = ({categoryName, currentCategoryChartData, currentCategoryTransactions} : DetailsBodyProps) =>{
        return(
            <>
                <EachCategoryFirstRow 
                    categoryName={categoryName} 
                    currentCategoryChartData={currentCategoryChartData ? currentCategoryChartData : {}} 
                    currentCategoryTransactions={currentCategoryTransactions}
                />
                {
                    currentCategoryTransactions.map((eachCatTransaction) =>{
                        return <EachCategoryDetailsRow currentCategoryTransactions={eachCatTransaction}/>
                    })
                }
            </>
        )
    }

    const EachCategoryFirstRow = ({categoryName, currentCategoryChartData, currentCategoryTransactions} : DetailsBodyProps) =>{
        return(
            <TableRow>
                <TableCell sx={{ borderBottom: "none", cursor:"pointer" }}>
                    {categoryName + " " + (currentCategoryChartData ? currentCategoryChartData["value"] : 0) + "%"}
                </TableCell> 
                <TableCell align="right" sx={{ borderBottom: "none", cursor:"pointer" }}>
                    {
                        _.sumBy(currentCategoryTransactions, (eachRecord) =>{
                            return Number(eachRecord.transaction_amount)
                        }).toFixed(2)
                    }
                </TableCell>
            </TableRow>
        )
    }

    const EachCategoryDetailsRow = ({currentCategoryTransactions} : {currentCategoryTransactions : ChartData}) =>{
        return(
            <TableRow>
                <TableCell>
                    {
                        currentCategoryTransactions.transaction_details ? 
                            currentCategoryTransactions.transaction_details : currentCategoryTransactions.category_name_en
                    }
                </TableCell>
                <TableCell align="right">
                    {currentCategoryTransactions.transaction_amount}
                </TableCell>
            </TableRow>
        )
    }

    return(
        <>
            <Grid item xs={2} md={2}/>
            <Grid item xs={8} md={8}>
                <DetailsTable />
            </Grid>
            <Grid item xs={12} md={2}/>
        </>
    )
}