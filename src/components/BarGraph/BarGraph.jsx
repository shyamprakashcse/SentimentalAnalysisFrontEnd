import React from 'react'
import { Chart } from 'primereact/chart'; 
import styles from "./BarGraph.module.css"
function BarGraph(props) { 
    let chunks = props.chunks 
    let chunk_size = chunks.length 
    let label = chunks[chunk_size-1]
    let posCount = chunks[0] 
    let negCount = chunks[1] 
    let totalCount = posCount+negCount 
    
    const data = {
        labels: ['Total Reviews', 'Positive Reviews', 'Negative Reviews'],
        datasets: [
            {
                label: label,
                
                
                
                
                data: [totalCount, posCount, negCount],
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 159, 64)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)'
                  ],
                  borderWidth: 1
            }
        ]
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                
            }
        }
    };
  return (
    <div className={`${styles.bargraph}`}>
        <Chart type="bar" data={data} options={options}  /> 
       
    </div>
  )
}

export default BarGraph