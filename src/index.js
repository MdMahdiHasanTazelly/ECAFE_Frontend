import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { LoaderProvider, useLoader } from "./context/LoaderContext.js";
import GlobalLoader from "./loader/GlobalLoader.js";
import { setupAxiosInterceptors } from "./api/axios.js"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  <LoaderProvider>

    <GlobalLoader />
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </LoaderProvider>



);


reportWebVitals();
