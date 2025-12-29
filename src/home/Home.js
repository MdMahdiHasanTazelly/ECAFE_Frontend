import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="hero-page">


            {/* Hero Content */}
            <section className="hero-section">
                <div className="hero-content">
                    <h2 className="hero-title">
                        Skip The Lines And Save Your Time<br />
                        With Exclusive Student<br />
                        Deals.
                    </h2>
                    <p className="hero-description">
                        Your campus cravings, just a click away fast delivery, trusted vendors,
                        student-friendly prices.
                    </p>
                    <button className="order-btn">Order Now</button>
                </div>

                <div className="hero-image-container">
                    <img
                        src="https://thumbs.dreamstime.com/z/floating-burger-layers-exploded-view-creative-food-concept-arranged-against-white-background-ingredients-include-glossy-401629660.jpg"
                        alt="Delicious floating burger"
                        className="hero-image"
                    />
                </div>
            </section>
        </div>
    );
};

export default Home;