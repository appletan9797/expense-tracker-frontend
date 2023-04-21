import { useEffect, useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';
import { ChartData, ChartProps } from '../../../types/TransactionInterfaceType';

export const ChartFigure = ({chartData} : ChartProps) =>{
    const [loading, setLoading] = useState(true)
    const [option, setOption] = useState<AgChartOptions>({})

    const setDataForChart = (data:ChartData[]) =>{
        setOption({
            data: data,
            series: [
                {
                    type: 'pie',
                    angleKey: 'value',
                    calloutLabelKey: 'label',
                    sectorLabelKey: 'value',
                    fills:['#618099','#619998','#618F99','#856199','#996179','#616D99'],
                    strokes:['#618099','#619998','#618F99','#856199','#996179','#616D99'],
                    cursor:'pointer',
                    highlightStyle: {
                        item:{
                            fill:'#005F9D'
                        }
                    },
                    sectorLabel: {
                    color: 'white',
                    fontWeight: 'bold',
                    formatter: ({ datum, angleKey }) => {
                        return `${datum[angleKey]}%`;
                        }
                    },
                },
            ],
        })

        setLoading(false)
    }
    useEffect(() =>{
        setDataForChart(chartData)
    },[chartData])

    return(
        loading ? <div>Loading...</div> : <AgChartsReact options={option} />
    )
}