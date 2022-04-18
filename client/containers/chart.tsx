import {LineChart} from '../component/chartComponent'
import createChartConfig, { ChartData, ChartItem } from 'chart.js'
import { useSockets } from '../context/socket.context'
import EVENTS from '../config/events'
import { colour2 } from '../config/default'
import { useEffect, useRef, useState } from 'react'


function ChartContainer(){
  
    const {socket} = useSockets()
    const [dataList, setData] = useState([])
    const [minusData, setMinusData] = useState([])
    const [plusData, setPlusData] = useState([])
    
    let secondsRange = useRef(2)
   

    socket.on(EVENTS.SERVER.RECEIVED_CLIENT_RESULT, ({dataList})=>{
        setData(dataList)
    })
   
    const generateSecondLabels= () => {
        const multiplier = 0.5
        return [...Array((5/ multiplier) + 1)].map((x, i) => `${i * multiplier}`)
    }


    const getSecondsRange = (dates) => {
        // get the lat
        const latest = new Date(dates.reduce((a, b) => (a.time > b.time ? a : b)));
        const eariest = new Date(dates.reduce((a, b) => (a.time < b.time ? b : a)));
        return Math.abs((latest.getTime() - eariest.getTime())/ 1000) 

        // console.log(`lastest : ${lastest}`)
        // console.log(`eariest: ${eariest}`)
        // console.log(`dif: ${result}`)

    }

    const generateDataSet = (timeData) => {
        
        let arrOfSeconds = []
        for (var time of timeData){
            let second = new Date(time).getSeconds()
            let index = arrOfSeconds.findIndex(a => a.Second == second)
            if (index == -1){
                let obj = {Second: 0, Times: []}
                obj.Second = second
                obj.Times = []
                obj.Times.push(time);
                arrOfSeconds.push(obj)
            } else {
                arrOfSeconds[index].Times.push(time)
            }
        }
        return arrOfSeconds
    }




 
    useEffect(()=>{
    
        if(dataList.length){
            setMinusData(dataList.filter(x=>x.operation === '-'))
            setPlusData(dataList.filter(x=>x.operation === '+'))

            // console.log(minusData)
            // console.log(plusData)
            //secondsRange = generateSecondLabels(getSecondsRange(dataList.map(x=>x.time)))
            // secondsRange.current = getSecondsRange(dataList.map(x=>x.time))
            // console.log(`second range: ${secondsRange.current}`)
    
            
         
        }
     

    }, [dataList])
    





    





    let options ={
        responsive: true,
        scales:{
            x: {
                display:true, 
                title:{
                    display:true,
                    text: '# of Seconds',
                    color: colour2.darkBlue, 
                    font:{},
                    padding: {top: 20, left: 0, right: 0, bottom: 0}
                }
            },
            y: {
                display:true, 
                title:{
                    display:true,
                    text: '# of Clicks',
                    color: colour2.lightblue, 
                    font:{},
                    padding: {top: 20, left: 0, right: 0, bottom: 0}
                }
            }
        },
    
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
                text: "clp test"
            }
        }
    }



    //let labels = [...Array(10).keys()].map(k => `${k + 1} `)
    let data = {
        
        datasets:[
            {
                label: "➕ Plus",
                backgroundColor: [colour2.orange],
                borderColor: [colour2.orange],
                data: generateDataSet(minusData.map(m=>m.time)).map(count => count.Times.length),
            },
         
            {
                label: '➖ Minus',
                backgroundColor: [colour2.originalBlue],
                borderColor: [colour2.originalBlue],
                data: generateDataSet(plusData.map(m=>m.time)).map(count => count.Times.length),
            }
        ],
        labels:generateSecondLabels()

    }

    return <LineChart lineChartdata={{data, options}}/>
            
 
}


export default ChartContainer