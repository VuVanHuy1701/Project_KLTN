import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Css/cart.css';

const OrderInfo = () => {
  return (
    <div className="order-info-container">
      <div className="header">
        <h1 className="title">THÔNG TIN ĐƠN HÀNG</h1>
      </div>

      <div className="p-4 h-[calc(100%-8rem)] overflow-auto">
        <div className="order-item">
          <img
            alt="Image of fish heads on a plate"
            className="item-img"
            src="https://storage.googleapis.com/a1aa/image/9fzfdwCgWeOr0o1igvReZNfZmza2XNBfoCa6vT2LKSkhxVa7E.jpg"
          />
          <div className="item-details">
            <h2 className="item-title">Đầu Cá Hồi Thềm</h2>
            <div className="item-actions">
              <button className="action-button">
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <p className="text-blue-500 mx-2">55,000 x 1</p>
              <button className="action-button">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="item-price">55,000</p>
            <button className="trash-button">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>

        <div className="order-item">
          <img
            alt="Image of a package of noodles"
            className="item-img"
            src="https://storage.googleapis.com/a1aa/image/6BfyI2xZglyoGSmQ7eV77R3VvufITHf64e4gqitQrVpfxVa7E.jpg"
          />
          <div className="item-details">
            <h2 className="item-title">Mì Thềm</h2>
            <div className="item-actions">
              <button className="action-button">
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <p className="text-blue-500 mx-2">85,000 x 1</p>
              <button className="action-button">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="item-price">85,000</p>
            <button className="trash-button">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
      </div>

      <div className="footer">
        <button className="text-lg font-bold">Gửi đơn</button>
      </div>

      <div className="total-container">
        <p className="total-amount">Tổng cộng: 140,000</p>
      </div>
    </div>
  );
};

export default OrderInfo;
