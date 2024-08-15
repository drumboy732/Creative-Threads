import React, { useState, useEffect } from 'react';
import "./cart.css";
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartArray, setCartArray] = useState([])
    const [color, setColor] = useState();
    const [cuff, setCuff] = useState();
    const [collar, setCollar] = useState();
    const [pocket, setPocket] = useState();
    const [total, setTotal] = useState(0);

    // Fetch cart items from the API
    useEffect(() => {
        // Make API call to fetch cart items
        const fetchCart = async () => {
            try {
                const cartResponse = await fetch('/cart');
                const cartData = await cartResponse.json();
                setCartArray(cartData)
                // console.log(cartData[0].customStyle, "jdkhasjdkhakds")
                const productResponse = await fetch(`/products/${cartData[0].productId}`);
                const productData = await productResponse.json();
                console.log("console log", productData)
                setCartItems(productData);
                setColor(cartData[0].customStyle.color)
                setCuff(cartData[0].customStyle.cuff)
                setPocket(cartData[0].customStyle.collar)
                setColor(cartData[0].customStyle.pocket)
                // setTotal()
            } catch (err) {
                console.log(err)
            }
        }
        fetchCart();
        // fetch('/cart')
        //     .then(response => response.json())
        //     .then(data => {
        //         setCartItems(data.cartItems);
        //         setTotal(data.total);
        //     })
        //     .catch(error => console.error('Error fetching cart items:', error));
    }, []);

    // Handle quantity change
    const handleQuantityChange = (index, newQuantity) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity = newQuantity;
        setCartItems(updatedCartItems);

        // Make API call to update cart item quantity
        fetch(`/cart/${updatedCartItems[index].id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: newQuantity }),
        })
            .then(response => response.json())
            .then(data => {
                // Update total price if needed
                setTotal(data.total);
            })
            .catch(error => console.error('Error updating cart item:', error));
    };

    // Handle remove item
    const handleRemoveItem = (index) => {
        const updatedCartItems = [...cartItems];
        const removedItemId = updatedCartItems[index].id;
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);

        // Make API call to remove cart item
        fetch(`/cart/${removedItemId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                // Update total price if needed
                setTotal(data.total);
            })
            .catch(error => console.error('Error removing cart item:', error));
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cartArray.map((item, index) => (
                <div className="cart-item">
                    <img src={item.productInfo.images} alt={item.productInfo.name} />
                    <div className="cart-item-info">
                        <h3>{item.productInfo.name}</h3>

                        <h3 style={{ fontWeight: 400 }} >Color: {item.customStyle.color}</h3>
                        <h3 style={{ fontWeight: 400 }} >Collar: {item.customStyle.collar}</h3>
                        <h3 style={{ fontWeight: 400 }} >Cuff: {item.customStyle.cuff}</h3>
                        <h3 style={{ fontWeight: 400 }} >Pocket: {item.customStyle.pocket}</h3>

                        {/* <div className="quantity-buttons">
                        <button onClick={() => handleQuantityChange(index, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(index, item.quantity + 1)}>+</button>
                    </div> */}
                        {/* <button onClick={() => handleRemoveItem(index)}>Remove</button> */}
                    </div>
                    <div className="cart-item-price">${item.productInfo.price}</div>
                    {/* <div className="cart-item-price">${item.price * item.quantity}</div> */}
                </div>
            ))}
            {/* <div className="cart-total">
                Price: ${cartItems.price}
            </div> */}
            <button className="place-order-button">Place Order</button>
        </div>
    );
};

export default Cart;
