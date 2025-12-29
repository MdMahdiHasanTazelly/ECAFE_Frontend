import React from 'react';
import './Footer.css';


const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-top">
                <div className="logo-section">
                    <h2 className="site-title">E-CAFE</h2>
                </div>

                <div>
                    <div className="social-icons">
                        <a href="#" aria-label="Instagram">
                            <i class="bi bi-instagram"></i>
                        </a>
                        <a href="#" aria-label="X (Twitter)">
                            <i class="bi bi-twitter-x"></i>
                        </a>
                        <a href="#" aria-label="Email">
                            <i class="bi bi-envelope-fill"></i>
                        </a >

                        <a href="#" aria-label="Facebook">
                            <i class="bi bi-facebook"></i>
                        </a>

                    </div>


                    <div className="footer-bottom">
                        <p>© 2026 E-CAFE. All rights reserved.</p>
                    </div>

                </div>

                <nav className="footer-nav">
                    <a href="#">Shop</a>
                    <a href="#">Contact</a>
                </nav>
            </div>



        </footer>
    );
};

export default Footer;