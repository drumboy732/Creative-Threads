import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './fabric.css';

const Fabric = () => {
    const [fabrics, setFabrics] = useState([]);

    useEffect(() => {
        // Fetch the list of fabrics from the API
        const fetchFabrics = async () => {
            try {
                const response = await fetch('/products/fabrics');
                const data = await response.json();
                console.log("text", data);
                setFabrics(data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchFabrics();
        // fetch('/products/fabrics')
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data, "sgsagsjaj")
        //         setFabrics(data);
        //         // setFabrics(data.fabrics);
        //     })
        //     .catch(error => console.error('Error fetching fabrics:', error));
    }, []);

    return (
        <div className="fabric-home-page">
            <h1>Select a Fabric</h1>
            <div className="fabric-cards-container">
                {fabrics.map((fabric, index) => (
                    <div key={index} className="fabric-card">
                        <img src={fabric.images} alt={fabric.name} className="fabric-image" />
                        <div className="fabric-info">
                            <h3>{fabric.name}</h3>
                           
                            {/* <Link to={`/products/${encodeURIComponent(fabric.productName)}`} className="fabric-link">
                                View Product
                            </Link> */}
                            <div className="price" style={{ color: 'red' }}>₹{fabric.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Fabric;
