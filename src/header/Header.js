// Header.jsx (updated)
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import CartSidebar from '../cartSidebar/CartSidebar.js';
import UserProfilePopup from '../userProfile/UserProfilepopUp.js';
import './Header.css';


const Header = ({ cartItems, userId }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);


    const logoutHandler = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/logout`, { token })
            .then((res) => {
                localStorage.removeItem("token");
                window.location.reload();
            })
            .catch((error) => {
                console.log(error)
            });
    };

    return (
        <>
            <header className="site-header">

                <div className="header-container">
                    <div className="logo-section">
                        <h1 className="site-title">E-CAFE</h1>
                    </div>

                    <div className="nav-section">
                        <nav className="main-nav">
                            <a href="/" className="nav-link">Home</a>
                            <a href="/menu" className="nav-link">Shop</a>

                            {/* {localStorage.getItem("token") && (
                                <button style={{ all: "unset" }} onClick={logoutHandler}>
                                    <a href="/menu" className="nav-link">Logout</a>
                                </button>
                            )} */}

                            {(location.pathname !== '/login' && !localStorage.getItem("token")) && (
                                <a href="/login" className="nav-link">Login</a>
                            )}

                            {(location.pathname !== '/register' && !localStorage.getItem("token")) && (
                                <a href="/register" className="nav-link">Register</a>
                            )}
                        </nav>

                        {['/login', '/register'].includes(location.pathname) === false && (
                            <>
                                {(location.pathname !== '/') &&

                                    <div className="search-bar">
                                        <input type="text" placeholder="Search" className="search-input" />
                                        <button className="search-button" aria-label="Search">
                                            <i className="bi bi-search"></i>
                                        </button>
                                    </div>

                                }


                                {
                                    localStorage.getItem("token") &&
                                    <div className="action-icons">
                                        <button aria-label="Notifications"><i className="bi bi-bell"></i></button>
                                        <button aria-label="Favorites"><i className="bi bi-heart-fill"></i></button>

                                        <button
                                            aria-label="Cart"
                                            onClick={() => setIsCartOpen(true)}
                                        >
                                            <i className="bi bi-cart-plus-fill"></i>
                                            {
                                                (cartItems && cartItems.length != 0) &&

                                                cartItems.filter(item => item.ownerId.toString() === userId.toString()).length > 0 && (
                                                    <span className="cart-badge">
                                                        {cartItems.filter(item => item.ownerId.toString() === userId.toString()).length}
                                                    </span>
                                                )


                                            }
                                        </button>

                                        {/* <button aria-label="User Profile">
                                            <i className="bi bi-person-circle"></i>
                                        </button> */}




                                        {/* USER PROFILE */}
                                        <div style={{ position: "relative" }}>
                                            <button
                                                aria-label="User Profile"
                                                onClick={() => setIsProfileOpen(prev => !prev)}
                                            >
                                                <i className="bi bi-person-circle"></i>
                                            </button>

                                            {isProfileOpen && (
                                                <UserProfilePopup
                                                    userId={userId}
                                                    onClose={() => setIsProfileOpen(false)}
                                                    onLogout={logoutHandler}
                                                />
                                            )}
                                        </div>





                                    </div>
                                }



                            </>
                        )}
                    </div>
                </div>
            </header>

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                userId={userId}
                onRemoveItem={(orderId) => {
                    // You can update cartItems in parent if needed
                    window.location.reload(); // simple way for now
                }}
                onUpdateQuantity={(orderId, delta) => {
                    // Optional: implement quantity update API
                    window.location.reload();
                }}
            />
        </>
    );
};

export default Header;