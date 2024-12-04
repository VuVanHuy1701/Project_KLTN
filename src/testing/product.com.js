import React from 'react';
import './Css/menu.css';

const menuItems = [
    {
        id: 1,
        img: "https://storage.googleapis.com/a1aa/image/YteG24DLxx1oditfLdJT9K3OswUNyIVmJHip0LuhZb91n7qTA.jpg",
        description: "LẨU BÒ MỸ NẤM KIM CHÂM",
        price: "89,000"
    },
    {
        id: 2,
        img: "https://storage.googleapis.com/a1aa/image/g0eipfCQd8p49khu7qlfKYOK5PnZKKMnDp9OIXcIQyRpP3VnA.jpg",
        description: "LẨU CÁ HÚ",
        price: "79,000"
    },
    {
        id: 3,
        img: "https://storage.googleapis.com/a1aa/image/5eoO8sBUllUfUEdC7INwVCIoWpIz7pt1OUi3xPYyt0K5n7qTA.jpg",
        description: "LẨU CÁ ĐIÊU HỒNG",
        price: "85,000"
    },
    {
        id: 4,
        img: "https://storage.googleapis.com/a1aa/image/kLQeDYGD11w9IqzsbW0eW0xo8t3AxnW2U7oRXc9ZDn32n7qTA.jpg",
        description: "LẨU VIÊN THẢ LẨU",
        price: "89,000"
    },
    {
        id: 5,
        img: "https://storage.googleapis.com/a1aa/image/g0eipfCQd8p49khu7qlfKYOK5PnZKKMnDp9OIXcIQyRpP3VnA.jpg",
        description: "LẨU CÁ HÚ",
        price: "79,000"
    },
    {
        id: 6,
        img: "https://storage.googleapis.com/a1aa/image/YteG24DLxx1oditfLdJT9K3OswUNyIVmJHip0LuhZb91n7qTA.jpg",
        description: "LẨU BÒ MỸ NẤM KIM CHÂM",
        price: "89,000"
    },
    {
        id: 7,
        img: "https://storage.googleapis.com/a1aa/image/kWhX3DNrNhLkEJKaIILUi89eDBgGfeHywTELdcoifUHjfcXdC.jpg",
        description: "Placeholder image",
        price: null
    },
    {
        id: 8,
        img: "https://storage.googleapis.com/a1aa/image/kWhX3DNrNhLkEJKaIILUi89eDBgGfeHywTELdcoifUHjfcXdC.jpg",
        description: "Placeholder image",
        price: null
    }
];

const IndexProduct = () => {
    return (
        <div className="menu">
            {menuItems.map(item => (
                // <a href={`/detail/${item.id}`} className="menu-item" key={item.id}> link đến ID sản phẩm
                <a href={`/detail`} className="menu-item" key={item.id}>
                    <img src={item.img} alt={item.description} />
                    <div className="description">{item.description}</div>
                    {item.price && <div className="price">{item.price}</div>}
                </a>
            ))}
        </div>
    );
}; 

export default IndexProduct;
