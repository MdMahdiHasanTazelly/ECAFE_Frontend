import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {

  const location = useLocation();

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo and Title */}
        <div className="logo-section">

          <h1 className="site-title">E-CAFE</h1>

        </div>

        {/* Navigation and Icons */}
        <div className="nav-section">
          <nav className="main-nav">
            <a href="/" className="nav-link">Home</a>
            <a href="/menu" className="nav-link">Shop</a>
            {location.pathname != '/login' && <a href="/login" className="nav-link">Login</a>}

            {location.pathname != '/register' && <a href="/register" className="nav-link">Register</a>}

          </nav>


          {/* If user is not in the login or registration page then this elements will be shown */}

          {['/login', '/register'].includes(location.pathname) === false &&
            <>


              <div className="search-bar">
                <input type="text" placeholder="Search" className="search-input" />
                <button className="search-button" aria-label="Search">
                  <i class="bi bi-search"></i>
                </button>
              </div>


              <div className="action-icons">
                <button aria-label="Notifications">
                  <i class="bi bi-bell"></i>
                </button>
                <button aria-label="Favorites">
                  <i class="bi bi-suit-heart"></i>
                </button>
                <button aria-label="Cart">
                  <i class="bi bi-cart-plus-fill"></i>
                </button>
                <button aria-label="User Profile">
                  <i class="bi bi-person-circle"></i>
                </button>
              </div>

            </>

          }

        </div>
      </div>
    </header>
  );
};

export default Header;