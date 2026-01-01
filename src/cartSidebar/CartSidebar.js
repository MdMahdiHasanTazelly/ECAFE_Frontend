// src/components/CartSidebar.jsx
import React, { useEffect, useState } from 'react';
import './CartSidebar.css';
import axios from 'axios';

const CartSidebar = ({ isOpen, onClose, cartItems, userId, onRemoveItem, onUpdateQuantity }) => {

    const [orders, setOrders] = useState([]);

    const token = localStorage.getItem("token");


    useEffect(() => {

        // const token = localStorage.getItem("token");

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/get-orders`, { token })
            .then((res) => {
                //console.log(res.data);
                setOrders(res.data);
            })
            .catch((error) => {
                console.log(error);
            })

        //const orders = 

    }, []);


    const quantityUpdatehandler = (itemId, quantity) => {
        console.log(quantity, "--------", itemId);
    }



    // const handleRemove = async (orderId) => {
    //     const token = localStorage.getItem('token');
    //     try {
    //         await axios.post(`${process.env.REACT_APP_BACKEND_URL}/remove-from-cart`, { token, orderId });
    //         onRemoveItem(orderId);
    //     } catch (err) {
    //         console.error("Failed to remove item:", err);
    //     }
    // };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div className="cart-sidebar-overlay" onClick={onClose}></div>

            {/* Sidebar */}
            <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="cart-sidebar-header">
                    <h2>Your Cart</h2>
                    <button className="close-btn" onClick={onClose} aria-label="Close cart">
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <div className="cart-items-list">
                    {orders.length === 0 ? (
                        <p className="empty-cart">Your cart is empty</p>
                    ) : (
                        orders.map((item) => (
                            <div key={item._id} className="cart-item">
                                <img src={item.foodId.image} alt={item.foodId.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4>{item.foodId.title}</h4>
                                    <p className="price">৳{item.foodId.discountedPrice || item.foodId.originalPrice}</p>
                                    <div className="quantity-controls">
                                        {/* <button onClick={() => onUpdateQuantity(item._id, -1)} disabled={item.quantity <= 1}>-</button> */}
                                        <button onClick={() => quantityUpdatehandler(item._id, -1)} disabled={item.quantity <= 1}>-</button>
                                        <span>{item.quantity}</span>
                                        {/* <button onClick={() => onUpdateQuantity(item._id, 1)}>+</button> */}
                                        <button onClick={() => quantityUpdatehandler(item._id, 1)}>+</button>
                                    </div>
                                </div>
                                <button
                                    className="remove-item-btn"
                                    // onClick={() => handleRemove(item._id)}
                                    aria-label="Remove item"
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {orders.length > 0 && (
                    <div className="cart-summary">
                        <div className="total">
                            <strong>Total:</strong>
                            <strong>
                                ৳{orders.reduce((sum, order) => sum + (order.foodId.discountedPrice * order.quantity), 0)}
                            </strong>
                            {/* <strong>৳{totalPrice}</strong> */}
                        </div>
                        <button className="checkout-btn">Proceed to Checkout</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartSidebar;