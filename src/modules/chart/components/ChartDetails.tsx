import { ChartDetailsProps } from "../../../types/TransactionInterfaceType"
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material"
import _ from "lodash"

export const ChartDetails = ({ detailsData, chartData, currencyId }: ChartDetailsProps) =>{

    const returnTableBody = () =>{
        return(
            chartData.map((eachCategory) =>{
                const filteredTransaction = detailsData.filter((eachTransaction) => 
                                                eachTransaction.category_id === eachCategory.category_id &&
                                                eachTransaction.currency_id === currencyId
                                            )
                return(
                    <>
                        <TableRow>
                            <TableCell sx={{ borderBottom: "none", cursor:"pointer" }}>
                                {eachCategory.label+" "+eachCategory.value+"%"}
                            </TableCell> 
                            <TableCell align="right" sx={{ borderBottom: "none", cursor:"pointer" }}>
                                {
                                    _.sumBy(detailsData, (eachRecord) =>{
                                        return eachRecord.category_id === eachCategory.category_id ? 
                                                Number(eachRecord.transaction_amount) : 0
                                    }).toFixed(2)
                                }
                            </TableCell>
                        </TableRow>
                        {
                            filteredTransaction.map((eachCatTransaction) =>{
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