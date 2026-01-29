import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from "./footer/Footer.js";
import Header from "./header/Header.js";
import Home from "./home/Home.js";
import Login from "./login/Login.js";
import Menu from "./menu/Menu.js";
import Register from "./register/Register.js";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotificationProvider } from "./context/NotificationContext";


function App() {
  const location = useLocation();

  return (
    <NotificationProvider>
      <div className="App">

        {/* <Header /> */}

        {["/", '/login', '/register'].includes(location.pathname) && <Header />}

        <main className="main-content">

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>

        </main>

        {!['/login', '/register'].includes(location.pathname) && <Footer />}



      </div>


      <ToastContainer position="top-center" autoClose={1000} />

    </NotificationProvider>
  );
}

export default App;
