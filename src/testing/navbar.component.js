import React from 'react';
import './navbar.css';

const IndexNavbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><a href="#">Thực Đơn</a></li>
        <li><a href="#">Trang Chủ</a></li>
        <li><a href="#">Liên Hệ</a></li>
        <li><a href="#">Danh Sách Danh Sách Thực Đơn</a></li>
        <li><a href="#">Giỏ Hàng</a></li>
      </ul>
      <div className="search-bar">
        <input type="text" placeholder="Thanh Tìm Kiếm" />
      </div>
    </nav>
  );
};

export default IndexNavbar;
