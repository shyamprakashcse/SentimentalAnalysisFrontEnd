import React, { useState,useRef} from 'react'
 import axios from 'axios'
 import {useNavigate} from "react-router-dom"
 import { Toast } from 'primereact/toast'; 
 import { Messages } from 'primereact/messages';
 import {CirclesWithBar} from  'react-loader-spinner'
 import styles from "./NLPUploader.module.css"
 import { Dropdown } from 'primereact/dropdown';
import NLPDashboard from '../NLPDashboard/NLPDashboard';


function NLPUploader() {

    const [file,setFile] = useState(null)
    let [Loader,setLoader] = useState(false); 
    const navigate = useNavigate()
    const toast = useRef(null)
    const msgs1 = useRef(null);  
    const [selectedCol,setSelectedCol] = useState(null)
    let [NLP,setNLP] = useState([])
    let [ColList,SetColList] = useState([])
    let [showColFlag,setShowColFlag] = useState(false)
    let [showUPFlag,SetShowUPFlag] = useState(true)
    let [showNLPFlag,setShowNLPFlag] = useState(false)
    // Navigate to home 
 
    function NavigateHome(){
        navigate("/")
    }
    
    function setColumnDropDown(e){
        setSelectedCol(e.value)
    }
    
    function SentimentalAnalysis(){
      console.log(selectedCol)
      setLoader(true) 
      setShowColFlag(false) 
      const url = 'http://localhost:8000/nlpprocessor';
          
          
          const formData = new FormData();
          formData.append('file', file);
          formData.append('targetcolumn',selectedCol)
          
          
          const config = {
            headers: {
              'content-type': 'multipart/form-data',
              
            },
          };
          
        axios.defaults.baseURL = 'http://localhost:8000';
        axios.defaults.headers.post['Content-Type'] ='multipart/form-data'
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
       
          axios.post(url, formData, config).then((response) => {
             setLoader(false); 
            console.log(response.data);
            setNLP(response.data.res)
            setShowColFlag(false)
            setShowNLPFlag(true)
           

            toast.current.show({severity: 'success', summary: 'Processed Successfully', detail: response.data.message});
            msgs1.current.show({severity: 'success', summary: 'Processed Successfully', detail: response.data.message}); 
            
            
            
            
            
          }).catch((err)=>{
            console.log(err); 
             toast.current.show({severity: 'error', summary: 'Uploading Failed', detail: "Error Occurs"});
             msgs1.current.show({severity: 'error', summary: 'Uploading Failed',detail: "Error Occurs"}); 
             
            setLoader(false); 
            
           
          }); 
         
          
    }
    
      function handleChange(event) { 
        var files = event.target.files
        if (files.length === 0 || files[0] === undefined || files[0] == null) 
        {
          toast.current.show({severity: 'error', summary: 'Uploading Failed', detail: 'please upload a file'});
            msgs1.current.show({severity: 'error', summary: 'Uploading Failed',detail: 'File is not uploaded'});    
            window.location.reload();
        } 
        
          let fileobj = event.target.files[0] 
          if(fileobj.type === "text/csv"){
              setFile(fileobj)
          } 
          else{
             toast.current.show({severity: 'error', summary: 'Uploading Failed', detail: 'please upload a CSV file'});
             msgs1.current.show({severity: 'error', summary: 'Uploading Failed',detail: 'File is not uploaded'});  
             window.location.reload();  
          }
        }
        
        function handleSubmit(event) {
          event.preventDefault(); 
          document.getElementById("filer").value=""
         
          if (file === null) 
        {
          toast.current.show({severity: 'error', summary: 'Uploading Failed', detail: 'please upload a file'});
            msgs1.current.show({severity: 'error', summary: 'Uploading Failed',detail: 'File is not uploaded'});  
           
           
        } 
        else{
           toast.current.show({severity: 'success', summary: 'Uploading Success', detail: 'you have uploaded a file'});
            msgs1.current.show({severity: 'info', summary: 'Uploading Success',detail: 'File has uploaded'});  
            setLoader(true)
        }
          const url = 'http://localhost:8000/getcolumns';
          
          
          const formData = new FormData();
          formData.append('file', file);
          
          
          const config = {
            headers: {
              'content-type': 'multipart/form-data',
              
            },
          };
          
        axios.defaults.baseURL = 'http://localhost:8000';
        axios.defaults.headers.post['Content-Type'] ='multipart/form-data'
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
       
          axios.post(url, formData, config).then((response) => {
             setLoader(false); 
            console.log(response.data);
            SetColList(response.data.res)
            SetShowUPFlag(false)
            setShowColFlag(true)

            toast.current.show({severity: 'success', summary: 'Processed Successfully', detail: response.data.message});
            msgs1.current.show({severity: 'success', summary: 'Processed Successfully', detail: response.data.message}); 
            
            
            
            
            
          }).catch((err)=>{
            console.log(err); 
             toast.current.show({severity: 'error', summary: 'Uploading Failed', detail: "Error Occurs"});
             msgs1.current.show({severity: 'error', summary: 'Uploading Failed',detail: "Error Occurs"}); 
             
            setLoader(false); 
            
           
          }); 
         
          
        }
  
      
      
 


  return (
    <div className="App"> 
         <Toast ref={toast}></Toast>
         <Messages ref={msgs1} /> 
         <CirclesWithBar height="100" width="100" color="cyan" wrapperStyle={{}} wrapperClass="" visible={Loader} outerCircleColor=""/>
         {showUPFlag===true ? 
         <div className={`card card-header  ${styles.uploaddiv}`}>
             <h3 className={`card-header text-center ${styles.uploaddivtit}`}>Sentimental Analysis</h3>
             <form onSubmit={handleSubmit} className={`card-header ${styles.uploadform} card-header`}>
               <h4 className={`card-footer text-center ${styles.formcarder}`}>Upload Your Dataset below to perform Sentimental Analysis</h4>
               <input type="file" onChange={handleChange} name="dataset" id='filer' className={`form-control mb-3 `}/>
               <button type="submit" className='btn btn-dark'>Upload</button>
               <button className='btn btn-warning m-2' onClick={NavigateHome}>Back to Home</button>
             
             </form>  
         </div> : null 

         }
         
         {
           showColFlag === true ? 
           <div className={`${styles.columndiv} card`}>
              <h3 className={`card-header text-center m-1`}>Choose the Review Column to process Sentimental Analysis</h3>  
              <div className={`${styles.dropbar}`}>
                <Dropdown value={selectedCol} options={ColList} placeholder="Select a Review Column" onChange={setColumnDropDown} className={`${styles.drop}`} />
                <button className={`btn btn-dark`} onClick={SentimentalAnalysis}>Process Sentimental Analysis</button>
              </div>
              
               
           
           </div> : null 
         }

         {
          showNLPFlag === true ? <NLPDashboard NLP={NLP}/> : null
         }
        
    </div> 
  )
}

export default NLPUploader