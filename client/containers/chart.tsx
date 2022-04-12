import {LineChart} from '../component/chartComponent'
import createChartConfig, { ChartData, ChartItem } from 'chart.js'


function ChartContainer(){
    // const clicks = useRef({})

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

    let clickData = (clicks) => {
        return Array(clicks).keys()
    }

    let labels = [...Array(5).keys()].map(k => `${k + 1} click`)
    let data = {
        labels,
        datasets:[
            {
                label: "➕ Plus",
                backgroundColor: [...Object.values(colour1)],
                data: clickData(5),
            },
            {
                label: 'Average',
                backgroundColor: [...Object.values(colour1)],
                data: [1, 2 ,3, 2, 1],
            },
            {
                label: '➖ Minus',
                backgroundColor: [...Object.values(colour1)],
                data: [1, 2 ,3, 2, 1],
            }
        ]
    }

    return(<div>
             <LineChart lineChartdata={{data, options}}/>

    </div>)
}


export default ChartContainer