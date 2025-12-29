import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Footer from "./footer/Footer.js";
import Header from "./header/Header.js";
import Home from "./home/Home.js";
import Login from "./login/Login.js";
import Menu from "./menu/Menu.js";
import Register from "./register/Register.js";


function App() {
  const location = useLocation();

  return (
    <div className="App">

      <Header />

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
  );
}

export default App;
