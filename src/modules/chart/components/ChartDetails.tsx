import { ChartDetailsProps } from "../../../types/TransactionInterfaceType"
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material"
import { processChartDataUtils } from "../../../utils/processChartData"
import _ from "lodash"

export const ChartDetails = ({ detailsData, transactionType, currencyId }: ChartDetailsProps) =>{

    const returnTableBody = () =>{
        const groupedData = processChartDataUtils.getGroupedData(detailsData, currencyId, transactionType)

        return(
            _.map(groupedData, (eachCategory, categoryName) =>{
                //To get the data from chart data, which label name equals to current category name (to get the percentage)
                const currentCategory = _.find(processChartDataUtils.getPieChartData(groupedData), (eachCategory) => { return eachCategory.label === categoryName})
                return(
                    <>
                        <TableRow>
                            <TableCell sx={{ borderBottom: "none", cursor:"pointer" }}>
                                {categoryName + " " + (currentCategory ? currentCategory["value"] : 0) + "%"}
                            </TableCell> 
                            <TableCell align="right" sx={{ borderBottom: "none", cursor:"pointer" }}>
                                {
                                    _.sumBy(eachCategory, (eachRecord) =>{
                                        return Number(eachRecord.transaction_amount)
                                    }).toFixed(2)
                                }
                            </TableCell>
                        </TableRow>
                        {
                            eachCategory.map((eachCatTransaction) =>{
                                return(
                                    <TableRow>
                                        <TableCell>
                                            {eachCatTransaction.transaction_details}
                                        </TableCell>
                                        <TableCell align="right">
                                            {eachCatTransaction.transaction_amount}
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </>
                )
            })
        )
    }

    return(
        <>
            <Grid item xs={2} md={2}/>
            <Grid item xs={8} md={8}>
                <TableContainer component={Paper} sx={{ marginBottom:"15px", border:"1px solid silver" }}>
                <Table sx={{ minWidth:350}} >
                    <TableBody>
                        {returnTableBody()}
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12} md={2}/>
        </>
    )
}