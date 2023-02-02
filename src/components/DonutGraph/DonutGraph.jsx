import React from 'react'
import { Chart } from 'primereact/chart'; 
import styles from "./DonutGraph.module.css"
function DonutGraph(props) { 
    let chunks = props.chunks 
    let posCount = chunks[0] 
    let negCount = chunks[1] 
    let totalCount = posCount+negCount  
    let posPer = (posCount/totalCount)*100 
    let negPer = (negCount/totalCount)*100
    
    const data = {
        labels: ['Aspect Positive Percentage', 'Aspect Negative Percentage'],
        datasets: [
            {
                data: [posPer,negPer],
                backgroundColor: [
                    
                    
                    'green',
                    'red'
                    
                ],
                hoverBackgroundColor: [
                    
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                   
                ]
            }
        ]
    }
    const options = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true
                }
            }
        }
    };

  return (
    <div>
        <Chart type="pie" data={data} options={options} className={`${styles.donutgraph}`} />
    </div>
  )
}

export default DonutGraph