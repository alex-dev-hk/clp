import React, {Component} from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import 'chart.js/auto';
import {Chart as ChartJS, ChartData, ScatterDataPoint } from 'chart.js';



export const LineChart = (({...props}) => {
    return (
        <div className='linechart'  style={{width: 600, height: 600, padding: '1%', margin: '0', position:"absolute", left: '50%', transform: 'translate(-50%)'}}>
            <Line datasetIdKey='id' data={props.lineChartdata.data} options={props.lineChartdata.options}/>
        </div>
    )
})

export const BarChart = (({...props}) => {
    return (
        <div className='barchart'  style={{padding: '1%',width: 400, height: 400, display: 'inline-block'}}>
            <Bar datasetIdKey='id' data={props.barChartdata}/>
        </div>
    )
})

export const PieChart = (({...props}) => {
    return (
        <div className='piechart'  style={{padding: '1%',width: 400, height: 400, display: 'inline-block'}}>
            <Pie datasetIdKey='id' data={props.pieChartdata}/>
        </div>
    )
})
