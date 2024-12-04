import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import './Css/detail.css';

const IndexDetail = () => {
    const { _id } = useParams();
    const navigate = useNavigate(); // useNavigate for programmatic navigation
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState(null);
    const [items, setItems] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState('');

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    const handleQuantityChange = (change) => {
        setQuantity(Math.max(1, quantity + change));
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/product/${_id}`);
                setProduct(response.data);
                const { image } = response.data;
                if (image) {
                    setItems([image]);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [_id]);

    const addToCart = async () => {
        try {
            const response = await axios.post("http://localhost:5000/carts/cart", {
                productID: _id,
                accID: "664d422b63ee97ae2888b892", // Replace with actual account ID
                quantity: quantity,
                note: note, // Include note in the payload
            });
            console.log("Product added to cart:", response.data);
            setModalMessage("Product added to cart successfully!");
            setModal(true);

            // Navigate to cart after a short delay
            setTimeout(() => {
                setModal(false);
                navigate("/cart"); // Navigate to the cart page
            }, 1000);
        } catch (error) {
            console.error("Error adding product to cart:", error);
            setModalMessage("Failed to add product. Please try again.");
            setModal(true);
        }
    };

    const closeModal = () => {
        setModal(false);
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat("de-DE").format(number);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="app">
            <div className="header">
                <div className="back-button">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div className="title">{product.name || "Product"}</div>
            </div>
            <div className="price">{formatNumber(product.price)} VNĐ</div>
            <div className="content">
                <div className="note-label">Ghi chú</div>
                <textarea 
                    className="note-input"
                    placeholder="Ghi chú cho cửa hàng"
                    value={note}
                    onChange={handleNoteChange}
                    maxLength={1000}
                />
                <div className="char-count">{note.length}/1000</div>
                <div className="main-ingredients">Nguyên Liệu Chính</div>
                <div className="cards">
                    {[1, 2, 3].map((dish) => (
                        <div className="card" key={dish}>
                            <img
                                src="https://storage.googleapis.com/a1aa/image/ner2yGDenZncHENvbHa9EE0m03s9JnIizm0YyjeTC9tahxZnA.jpg"
                                alt="Placeholder image of a dish"
                                className="dish-image"
                            />
                            <div className="details">
                                <div className="name">Dish Name {dish}</div>
                                <div className="description">Description of dish {dish}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer">
                <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(-1)}>-</button>
                    <div className="quantity">{quantity}</div>
                    <button onClick={() => handleQuantityChange(1)}>+</button>
                </div>
                <button className="add-button" onClick={addToCart}>
                    Thêm {formatNumber(product.price * quantity || 0)}
                </button>
            </div>
            {modal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>{modalMessage}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
            <div className="floating-button">
                <FontAwesomeIcon icon={faQuestionCircle} />
            </div>
        </div>
    );
};

export default IndexDetail;
