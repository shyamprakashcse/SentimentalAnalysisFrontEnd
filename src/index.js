import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import 'react-bootstrap'
import 'font-awesome/css/font-awesome.min.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme 
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import {BrowserRouter} from "react-router-dom"
import App from "./components/App/App.jsx"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <App />
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

