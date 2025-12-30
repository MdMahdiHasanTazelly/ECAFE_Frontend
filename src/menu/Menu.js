import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Menu.css';

const menuItems = [
    {
        id: 1,
        title: 'Fried paratha and egg',
        originalPrice: 70,
        discountedPrice: 60,
        discount: '14%',
        image: 'https://i.ytimg.com/vi/ebbEvlvBVrY/hq720.jpg',
    },
    {
        id: 2,
        title: 'Khichuri and fried eggs',
        originalPrice: 80,
        discountedPrice: 70,
        discount: '13%',
        image: 'https://yumnia.com/storage/recipes/khichuri-with-fried-egg-Za5wS.webp',
    },
    {
        id: 3,
        title: 'Bread, butter and jam',
        originalPrice: null,
        discountedPrice: 40,
        discount: null,
        image: 'https://www.lazzaris.com/wp-content/uploads/sites/2/2022/09/fette-pane-burro-marmellata-1.jpg',
    },
    {
        id: 4,
        title: 'Semai (sweet)',
        originalPrice: null,
        discountedPrice: 50,
        discount: null,
        image: 'https://i.ytimg.com/vi/8dCnAelS8ag/maxresdefault.jpg',
    },
    // Additional teaser items (partially visible)
    {
        id: 5,
        title: '',
        originalPrice: null,
        discountedPrice: null,
        discount: '8%',
        image: 'https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg',
    },
    {
        id: 6,
        title: '',
        originalPrice: null,
        discountedPrice: null,
        discount: null,
        image: 'https://www.foodandwine.com/thmb/tM060YA0Fd0UALCmPQ-5gGWyBqA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Classic-Club-Sandwich-FT-RECIPE0523-99327c9c87214026b9419b949ee13a9c.jpg',
    },
];

const Menu = () => {

    const [foods, setFoods] = useState([]);
    const [quantity, setQuantity] = useState({});
    const [cartItem, setCartItem] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAllFood`)
            .then((res) => {
                setFoods(res.data);
                // console.log(res.data);

                const initQuantity = {};
                res.data.forEach(item => {
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
            [id]: Math.max(0, (prev[id]) + delta) // Prevent negative
        }));
    };

    const handleAddToCart = (id) => {
        const token = localStorage.getItem("token");
        console.log(token);
        // console.log(`add to cart`, id)
        setCartItem(item => [...item, id]);

        console.log(cartItem)
    }



    return (
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
                            <button className="favorite-btn">
                                <i style={{ color: "#28a745" }} class="bi bi-suit-heart"></i>
                            </button>
                            {/* add to cart */}
                            <button className="cart-btn"
                                onClick={() => handleAddToCart(item._id)}
                            >
                                <i style={{ color: "#28a745" }} class="bi bi-cart-plus"></i>
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;