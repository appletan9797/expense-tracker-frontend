import { useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';
import { ChartProps } from '../../../types/TransactionInterfaceType';

export const Chart = ({chartData} : ChartProps) =>{
    const [options, setOptions] = useState<AgChartOptions>({
        data: chartData,
        series: [
            {
                type: 'pie',
                angleKey: 'value',
                calloutLabelKey: 'label',
                sectorLabelKey: 'value',
                fills:['#618099','#619998','#618F99','#856199','#996179','#616D99'],
                strokes:['#618099','#619998','#618F99','#856199','#996179','#616D99'],
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
      });

    return <AgChartsReact options={options} />
}