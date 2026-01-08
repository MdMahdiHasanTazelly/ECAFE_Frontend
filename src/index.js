import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { LoaderProvider, useLoader } from "./context/LoaderContext.js";
import GlobalLoader from "./loader/GlobalLoader.js";
import { setupAxiosInterceptors } from "./api/axios.js"


const AxiosInterceptorSetup = ({ children }) => {
  const { showLoader, hideLoader } = useLoader();

  React.useEffect(() => {
    setupAxiosInterceptors(showLoader, hideLoader);
  }, [showLoader, hideLoader]);

  return children;
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  <LoaderProvider>
    <AxiosInterceptorSetup>
      <GlobalLoader />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AxiosInterceptorSetup>
  </LoaderProvider>

  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>

);


reportWebVitals();
