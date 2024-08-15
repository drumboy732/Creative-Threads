import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './product.css';
import { useNavigate, useParams } from 'react-router-dom';

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const [productDetails, setProductDetails] = useState({});
    const [fabricDetails, setFabricDetails] = useState({});
    const [customStyleFormOpen, setCustomStyleFormOpen] = useState(false);
    const [customStyle, setCustomStyle] = useState({});

    // Fetch product details when component mounts
    useEffect(() => {
        const fetchProductDetails = async () => {
            // Perform API request for product details
            const response = await fetch(`/products/${id}`);
            // const response = await fetch(`/products/products?name=${encodeURIComponent(name)}`);
            const data = await response.json();
            setProductDetails(data);
            // Fetch fabric details using the fabric name
            if (data.fabricName) {
                const fabricResponse = await fetch(`/fabrics?name=${data.fabricName}`);
                const fabricData = await fabricResponse.json();
                setFabricDetails(fabricData);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        // Prepare payload for add to cart API request
        const payload = {
            productId: productDetails.id,
            // productName: productDetails.name,
            // price: productDetails.price,
            customStyle,
            // Other information as needed
        };

        // Perform API request to add product to cart
        const response = await fetch('/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (response.ok) {
            navigate('/cart');
        }
        // Handle response if needed
    };

    const handleOpenCustomStyleForm = () => {
        setCustomStyleFormOpen(true);
    };

    const handleCustomStyleChange = (event) => {
        const { name, value } = event.target;
        setCustomStyle((prevCustomStyle) => ({
            ...prevCustomStyle,
            [name]: value,
        }));
    };

    const carouselImages = [
        productDetails.images,
    ];

    const handleSelect = (selectedIndex) => {
        setActiveIndex(selectedIndex);
    };

    const changeImage = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="container1">
            <div className="image">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        {carouselImages.map((image, index) => (
                            <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                                <img src={image} className="d-block w-100" alt={`Product Image ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="carousel-preview">
                    {carouselImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Preview Image ${index + 1}`}
                            className={`preview-image ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => changeImage(index)}
                        />
                    ))}
                </div>
            </div>

            <div className="info">
                <div className="product-name">{productDetails.name}</div>
                <div className="description">{productDetails.description}</div>

                <div className="sub-heading">Fabric Details</div>
                <div className="fabric-details">
                    <p>Fabric Name: {fabricDetails.name}</p>
                    <p>Ply: {fabricDetails.ply}</p>
                    <p>Care: {fabricDetails.care}</p>
                    <p>Weave Pattern: {fabricDetails.weavePattern}</p>
                </div>

                <div className="sub-heading">Default Style</div>
                <div className="default-style">
                    <p>Color: {productDetails.name}</p>
                    <p>Collar: Business Classic</p>
                    <p>Cuff: Single Button</p>
                    {/* <p>Button Color: White</p> */}
                    <p>Pocket: 1 V-Shaped Pocket</p>
                    {/* <p>Placket: Plain</p> */}
                </div>

                <div className="price" style={{ color: 'red' }}>₹{productDetails.price}</div>

                <div className="buttons">
                    {/* <button className="purchase-button" onClick={handleAddToCart}>
                        Add to Cart
                    </button> */}
                    <button className="customize-button" onClick={handleOpenCustomStyleForm}>
                        Customize Style
                    </button>
                </div>

                {customStyleFormOpen && (
                    <div className="custom-style-form">
                        <form>
                            <label>
                                Color:
                                <input
                                    type="text"
                                    name="color"
                                    value={customStyle.color || ''}
                                    onChange={handleCustomStyleChange}
                                />
                            </label>
                            <label>
                                Collar:
                                <input
                                    type="text"
                                    name="collar"
                                    value={customStyle.collar || ''}
                                    onChange={handleCustomStyleChange}
                                />
                            </label>
                            <label>
                                Cuff:
                                <input
                                    type="text"
                                    name="cuff"
                                    value={customStyle.cuff || ''}
                                    onChange={handleCustomStyleChange}
                                />
                            </label>
                            <label>
                                Pocket:
                                <input
                                    type="text"
                                    name="pocket"
                                    value={customStyle.pocket || ''}
                                    onChange={handleCustomStyleChange}
                                />
                            </label>
                            <button type="submit" onClick={handleAddToCart}>
                                Submit & Add to cart
                            </button>
                        </form>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Product;
