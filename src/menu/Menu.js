import React, { useState } from 'react';
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
    const [quantities, setQuantities] = useState(menuItems.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {}));

    const handleQuantityChange = (id, delta) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(0, prev[id] + delta),
        }));
    };

    return (
        <div className="breakfast-menu">


            <div className="menu-grid">
                {menuItems.map(item => (
                    <div key={item.id} className={`menu-card ${item.id > 4 ? 'teaser' : ''}`}>
                        {item.discount && <span className="discount-badge">-{item.discount}</span>}
                        <img src={item.image} alt={item.title} className="menu-image" />
                        <h3 className="menu-title">{item.title || '\u00A0'}</h3>
                        <div className="price">
                            {item.originalPrice && <span className="original-price">৳{item.originalPrice}</span>}
                            <span className="discounted-price">৳{item.discountedPrice}</span>
                        </div>
                        {item.id <= 4 && (
                            <div className="actions">
                                <div className="quantity-selector">
                                    <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                                    <span>{quantities[item.id]}</span>
                                    <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                                </div>
                                <button className="favorite-btn">❤️</button>
                                <button className="cart-btn">🛒</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;