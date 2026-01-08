// import { createContext, useContext, useState, useRef } from "react";

// const LoaderContext = createContext();

// export const LoaderProvider = ({ children }) => {
//     const startTimeRef = useRef(null);

//     const [loadingCount, setLoadingCount] = useState(0);

//     const showLoader = () => {
//         setLoadingCount(prev => prev + 1);
//     };



//     const hideLoader = () => {
//         setLoadingCount(prev => Math.max(prev - 1, 0));
//     };



//     return (
//         <LoaderContext.Provider
//             value={{
//                 loading: loadingCount > 0,
//                 showLoader,
//                 hideLoader
//             }}
//         >
//             {children}
//         </LoaderContext.Provider>
//     );
// };

// export const useLoader = () => useContext(LoaderContext);













import { createContext, useContext, useRef, useState } from "react";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
    const [loadingCount, setLoadingCount] = useState(0);
    const startTimeRef = useRef(null);

    const showLoader = () => {
        if (loadingCount === 0) {
            startTimeRef.current = Date.now();
        }
        setLoadingCount(prev => prev + 1);
    };

    const hideLoader = () => {
        const elapsed = Date.now() - (startTimeRef.current || 0);
        const delay = Math.max(300 - elapsed, 0); // 👈 300ms minimum

        setTimeout(() => {
            setLoadingCount(prev => Math.max(prev - 1, 0));
        }, delay);
    };

    return (
        <LoaderContext.Provider
            value={{
                loading: loadingCount > 0,
                showLoader,
                hideLoader
            }}
        >
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => useContext(LoaderContext);

