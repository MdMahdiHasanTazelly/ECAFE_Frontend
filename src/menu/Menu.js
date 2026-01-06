import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Menu.css';
import Header from '../header/Header.js';


const Menu = () => {

    const [foods, setFoods] = useState([]);
    const [quantity, setQuantity] = useState({});

    //to show filled heart if favourite else empty heart
    const [favourites, setFavourites] = useState([]);

    const [cartItems, setCartItems] = useState([]);

    const [userId, setUserId] = useState("");

    const token = localStorage.getItem('token');

    useEffect(() => {
        //const token = localStorage.getItem('token');

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/getAllFood`, { token })
            .then((res) => {
                //console.log(res);
                //when user logged in, if executes
                if (res.data.foods && res.data.favourites && res.data.orders && res.data.userId) {
                    setFoods(res.data.foods);
                    setFavourites(res.data.favourites);
                    setCartItems(res.data.orders);
                    setUserId(res.data.userId);
                } else { //when user is not logged in
                    setFoods(res.data);
                }

                const initQuantity = {};
                res.data.foods.forEach(item => {
                    initQuantity[item._id] = 0;
                });
                setQuantity(initQuantity);
            })
            .catch((error) => {
                console.log(error);

            })

    }, []);


    const handleQuantityChange = (id, delta) => {

        setQuantity(prev => ({
            ...prev,
            [id]: Math.max(0, (prev[id]) + delta) // prevent negative
        }));
    };



    const handleAddToCart = (foodId) => {

        const itemQuantity = quantity[foodId];

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/add-to-cart`, { token, foodId, itemQuantity })
            .then((res => {
                window.location.reload();
                //console.log(res);
            }))
            .catch((error) => {
                console.log(error);
            })

    }


    const handleAddToFavourite = (foodId) => {

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/add-to-favourite`, { token, foodId })
            .then((res => {
                setFavourites(res.data.favourites);
                window.location.reload();
                //console.log(res);
            }))
            .catch((error) => {
                console.log(error);
            })
    }


    const handleRemoveFromFavourite = (foodId) => {

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/remove-from-favourite`, { token, foodId })
            .then((res) => {
                setFavourites(res.data.favourites);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
        //console.log(foodId);
    }



    return (
        <>
            <Header cartItems={cartItems} userId={userId} />
            <div className="breakfast-menu">

                <div className="menu-grid">
                    {foods.map(item => (
                        <div key={item._id} className='menu-card '>
                            {/* {item.discount && <span className="discount-badge">-{item.discount}</span>} */}
                            <img src={item.image} alt={item.title} className="menu-image" />
                            <h3 className="menu-title">{item.title || '\u00A0'}</h3>
                            <div className="price">
                                {item.originalPrice && <span className="original-price">৳{item.originalPrice}</span>}
                                <span className="discounted-price">৳{item.discountedPrice}</span>
                            </div>

                            <div className="actions">
                                <div className="quantity-selector">
                                    <button onClick={() => handleQuantityChange(item._id, -1)}>-</button>
                                    <span>{quantity[item._id] || 0}</span>
                                    <button onClick={() => handleQuantityChange(item._id, 1)}>+</button>
                                </div>
                                {/* favourite */}
                                <button className="favorite-btn"                                >
                                    {(favourites.includes(item._id)) ?
                                        <i class="bi bi-heart-fill" style={{ color: "#28a745" }}
                                            onClick={() => handleRemoveFromFavourite(item._id)}
                                        ></i> :

                                        <i style={{ color: "#28a745" }} class="bi bi-suit-heart"
                                            onClick={() => handleAddToFavourite(item._id)}
                                        ></i>
                                    }

                                </button>
                                {/* add to cart */}
                                <button className="cart-btn"
                                    onClick={() => handleAddToCart(item._id)}
                                >

                                    {/* shows if the item is added to cart or not */}
                                    {(() => {
                                        const isInCart = cartItems.some(order =>
                                            order.ownerId.toString() === userId.toString() &&
                                            order.foodId.toString() === item._id.toString()
                                        );

                                        return isInCart ?
                                            <i class="bi bi-cart-plus-fill" style={{ color: "#28a745" }}></i> :
                                            <i className="bi bi-cart-plus" style={{ color: "#28a745" }}></i>;
                                    })()}


                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};

export default Menu;