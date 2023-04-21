import { ChartFigure } from "./ChartFigure"
import { ChartDetails } from "./ChartDetails"
import { ChartProps } from "../../../types/TransactionInterfaceType"

export const Chart = ({chartData, detailsData}:ChartProps) =>{

    return(
        <>
            <ChartFigure chartData={chartData} />
            <ChartDetails detailsData={detailsData} chartData={chartData}/>
        </>
    )
}