import React from 'react'
import "./App.module.css"
import { Route,Routes } from 'react-router-dom'  
import NLPUploader from '../NLPUploader/NLPUploader'
import NLPDashboard from '../NLPDashboard/NLPDashboard'
function App() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<NLPUploader/>}></Route>
            <Route path='/dashboard' element={<NLPDashboard/>}></Route>
        </Routes>
    </div>
  )
}

export default App