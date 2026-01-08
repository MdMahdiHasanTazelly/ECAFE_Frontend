import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
    // withCredentials: true
});

export const setupAxiosInterceptors = (showLoader, hideLoader) => {
    axiosInstance.interceptors.request.use(
        config => {
            showLoader();
            return config;
        },
        error => {
            hideLoader();
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        response => {
            hideLoader();
            return response;
        },
        error => {
            hideLoader();
            return Promise.reject(error);
        }
    );
};

export default axiosInstance;


//console.log(process.env.REACT_APP_BACKEND_URL);
