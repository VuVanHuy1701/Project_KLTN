import React from "react";
import './Css/receipt.css'; 

const IndexReceipt = () => {
  return (
    <div className="receipt-container">
      <div className="receipt-card">
        <div className="text-center">
          <h1 className="store-name">CÀ PHÊ HOÀNG PHÚC</h1>
          <p className="store-info">Đường Số 24 KDC An Khánh, P. An Khánh</p>
          <p className="store-info">Q. Ninh Kiều - TP. Cần Thơ</p>
          <p className="store-info">ĐT: 0974.300.007 - 0909.191.195</p>
        </div>
        <div className="text-center font-bold mt-4">
          <p>HÓA ĐƠN BÁN HÀNG</p>
          <p>Bàn 05</p>
        </div>
        <div className="flex justify-between mt-4">
          <p>Ngày: 18/02/2019</p>
          <p>Số: 021900003</p>
        </div>
        <div className="flex justify-between">
          <p>Thu ngân: Administrator</p>
          <p>In lúc: 01:41</p>
        </div>
        <div className="flex justify-between">
          <p>Giờ vào: 01:41</p>
          <p>Giờ ra: 01:41</p>
        </div>
        <div className="mt-4">
          <p>Ghi chú:</p>
        </div>
        <table className="table">
          <thead>
            <tr className="table-header">
              <th className="table-cell">Mặt hàng</th>
              <th className="table-cell">SL</th>
              <th className="table-cell">Giá</th>
              <th className="table-cell">T tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-cell">Cà phê đá</td>
              <td className="table-cell">1</td>
              <td className="table-cell">10,000</td>
              <td className="table-cell">10,000</td>
            </tr>
            <tr className="table-row">
              <td className="table-cell">Bún thịt Xào</td>
              <td className="table-cell">1</td>
              <td className="table-cell">15,000</td>
              <td className="table-cell">15,000</td>
            </tr>
            <tr className="table-row">
              <td className="table-cell">Cà phê sữa đá</td>
              <td className="table-cell">1</td>
              <td className="table-cell">12,000</td>
              <td className="table-cell">12,000</td>
            </tr>
            <tr className="table-row">
              <td className="table-cell">Cơm tấm</td>
              <td className="table-cell">1</td>
              <td className="table-cell">17,000</td>
              <td className="table-cell">17,000</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between font-bold mt-4">
          <p>Tổng:</p>
          <p>54,000</p>
        </div>
        <div className="text-center mt-4">
          <p>Cảm ơn Quý khách. Hẹn gặp lại!</p>
        </div>
      </div>
    </div>
  );
};

export default IndexReceipt;