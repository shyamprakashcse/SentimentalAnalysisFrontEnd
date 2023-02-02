import React from 'react'
import styles from "./NLPDashboard.module.css"
import { Knob } from 'primereact/knob';
import BarGraph from '../BarGraph/BarGraph'; 
import DonutGraph from '../DonutGraph/DonutGraph';
import { Carousel } from 'primereact/carousel'; 

function NLPDashboard(props) { 
    // let res =  [[5,9,"bedrooms"],[0,2,"taxes"],[0,2,"taxes"],[0,2,"taxes"],[0,2,"taxes"],[0,2,"taxes"],[0,2,"taxes"],[36.8,"overallPositive"],[62.5,"overallNegative"]]  
    let res = props.NLP
    let ressize = res.length
    let  overallpos = res[ressize-2][0]
    let  overallneg = res[ressize-1][0]

    function getNegPer(chunk){
        let pos = chunk[0] 
        let neg = chunk[1] 
        let tot = pos+neg 
        let res = (neg/tot)*100
        return Math.trunc(res)
    }

    const aspectTemplate = (reschunk)=>{
          return (
            <div className={`${styles.aspectsgraphdiv}`}>  

            <div className={`${styles.cards} bg-dark`}>
                <h2 className={`text-center bg-white `}>Negative Percentage of Aspect :  {reschunk[2]}</h2>
               
                <div className={`${styles.topknobdiv}`}>
                    <Knob value={getNegPer(reschunk)} valueTemplate={'{value}%'}  min={0} max={100} valueColor={"red"} size={200} className={`${styles.topknob}`}  />
                </div>

               
               
            </div>
                
                <BarGraph chunks={reschunk} />
                <DonutGraph chunks={reschunk}/> 
            </div>
          )
    }


  return (
    <div className={`${styles.nlpdashboard}`}>
    <h3 className='bg-warning text-center'>Sentimental Analysis Details</h3>
    <div className={`${styles.topboard} `}>
       
        <div className={`${styles.cards} `}>
            <h2 className={` text-center bg-white rounded m-2 `}>Overall Positive Reviews</h2>
            <div className={`${styles.topknobdiv}`}>
                <Knob value={overallpos} valueTemplate={'{value}%'}  min={0} max={100} valueColor={"green"} size={200} className={`${styles.topknob}`}  />
            </div>
        </div>

        <div className={`${styles.cards}`}>
            <h2 className={`text-center bg-white rounded m-2`}>Overall Negative Reviews</h2>
            <div className={`${styles.topknobdiv}`}>
                <Knob value={overallneg} valueTemplate={'{value}%'}  min={0} max={100} valueColor={"red"} size={200} className={`${styles.topknob}`}  />
            </div>
        </div>

    </div>

    <div className={`card ${styles.aspectcarosel}`}> 
        <Carousel value={res.slice(0,ressize-2)} numScroll={1} numVisible={1} autoplayInterval={1000}  itemTemplate={aspectTemplate} />
    </div>
  

    </div>
  )
}

export default NLPDashboard