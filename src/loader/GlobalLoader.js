import { useLoader } from "../context/LoaderContext.js";
import "./loader.css";

const GlobalLoader = () => {
    const { loading } = useLoader();

    if (!loading) return null;

    return (
        <div className="loader-overlay">
            <div className="spinner"></div>
        </div>
    );
};

export default GlobalLoader;
