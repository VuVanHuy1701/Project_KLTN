import React, { useState } from 'react';
import './navbar.css';
import { Link } from "react-router-dom";
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(''); // State to track active menu item
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = (e) => {
    // Prevent closing the main menu when toggling dropdown
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  // Function to set the active item
  const handleItemClick = (item) => {
    setActiveItem(item);
    setMenuOpen(false); // Optionally close the menu after selecting
  };

  return (
    <nav className="navbar">
      <div className="logo">Logo</div>
      
      {/* Hamburger icon for mobile */}
      <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navbar links */}
      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li className={activeItem === 'thucdon' ? 'active' : ''} onClick={() => handleItemClick('thucdon')}>
          <a href="/product">Thực Đơn</a>
        </li>
        <li className={activeItem === 'trangchu' ? 'active' : ''} onClick={() => handleItemClick('trangchu')}>
          <a href="/home">Trang Chủ</a>
        </li>
        <li className={activeItem === 'lienhe' ? 'active' : ''} onClick={() => handleItemClick('lienhe')}>
          <a href="contact">Liên Hệ</a>
        </li>
        <li className={`dropdown ${dropdownOpen ? 'open' : ''}`} onClick={toggleDropdown}>
          <a href="#" className={activeItem === 'tatca' ? 'active' : ''}>
            Tất cả <span>&#9662;</span>
          </a>
          {dropdownOpen && (
            <div className="dropdown-content">
              <ul>
                <li className={activeItem === 'tatca' ? 'active' : ''} onClick={() => handleItemClick('tatca')}>
                  <img src="path-to-image-1.jpg" alt="Tất cả" />
                  <span>Tất cả</span>
                </li>
                <li className={activeItem === 'taiban' ? 'active' : ''} onClick={() => handleItemClick('taiban')}>
                  <img src="path-to-image-2.jpg" alt="Tại Bàn" />
                  <span>Tại Bàn</span>
                </li>
                <li className={activeItem === 'mangve' ? 'active' : ''} onClick={() => handleItemClick('mangve')}>
                  <img src="path-to-image-3.jpg" alt="Mang Về" />
                  <span>Mang Về</span>
                </li>
                <li className={activeItem === 'monthem' ? 'active' : ''} onClick={() => handleItemClick('monthem')}>
                  <img src="path-to-image-4.jpg" alt="Món Thêm" />
                  <span>Món Thêm</span>
                </li>
                <li className={activeItem === 'monanchoi' ? 'active' : ''} onClick={() => handleItemClick('monanchoi')}>
                  <img src="path-to-image-5.jpg" alt="Món Ăn Chơi" />
                  <span>Món Ăn Chơi</span>
                </li>
                <li className={activeItem === 'nuoc' ? 'active' : ''} onClick={() => handleItemClick('nuoc')}>
                  <img src="path-to-image-6.jpg" alt="Nước" />
                  <span>Nước</span>
                </li>
              </ul>
            </div>
          )}
        </li>
      </ul>
      {/* Search bar */}
      <div className="search-bar">
        <input type="text" placeholder="Thanh Tìm Kiếm" />
      </div>
      <ul className="navbar-links">
        <li className={activeItem === 'giohang' ? 'active' : ''} onClick={() => handleItemClick('giohang')}>
          <a href="/cart">Giỏ Hàng</a>
        </li>
        <li className={activeItem === 'giohang' ? 'active' : ''} onClick={() => handleItemClick('giohang')}>
          <a href="/login">Đơn Hàng</a>
        </li>
        <li className={activeItem === 'dangnhap' ? 'active' : ''} onClick={() => handleItemClick('dangnhap')}>
          <a href="/login">Đăng Nhập</a>
          {/*<NavLink to="/login" tag={Link}>
            Đăng Nhập
          </NavLink>*/}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
