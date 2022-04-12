import {LineChart} from '../component/chartComponent'
import createChartConfig, { ChartData, ChartItem } from 'chart.js'
import { useRef } from 'react'
import { useSockets } from '../context/socket.context'
import EVENTS from '../config/events'


function ChartContainer(){
  
    const {socket, clientResult} = useSockets()

    function getMaxCounts(value) {
        const min = value?.minus?.length || 0
        const plus = value?.plus?.length || 0
        return min ? min > plus : plus
    }

   

    const colour1 = {
        yellow: '#f1cf00',
        darkBlue: '#0064bc',
        lightblue: '#61c0e6',
    }
    const colour2 = {
        yellow: '#e9e0a8',
        darkBlue: '#6695bf',
        lightblue: '#afd1ef',
    }

    let options ={
        responsive: true,
        plugins: {
            legend: {
                labels:{
                    size: 1,
                    font: { family: 'Consolas,monaco,monospace;'}
                },
                position: 'top' as const
            },

            title: {
                display: true,
                text: "readings"
            }
        }
    }



    let labels = [...Array(10).keys()].map(k => `${k + 1} click`)
    let data = {
        labels,
        datasets:[
            {
                label: "➕ Plus",
                backgroundColor: [...Object.values(colour1)],
                data: clientResult.plus,
            },
            {
                label: 'Average',
                backgroundColor: [...Object.values(colour1)],
                data: [],
            },
            {
                label: '➖ Minus',
                backgroundColor: [...Object.values(colour1)],
                data: clientResult.minus,
            }
        ]
    }

    return(<div>
  
             <LineChart lineChartdata={{data, options}}/>

    </div>)
}


export default ChartContainer