import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ReactDOM from 'react-dom/client';

//import component
import ProductIndex from './component/views/products.view';
import LoginIndex from './component/views/login.view';
import SignUpIndex from './component/views/signup.view';

import DetailIndex from './component/views/detailproduct.view';
import HomeIndex from './component/views/home.view';
import ContactIndex from './component/views/contact.view';

import CartIndex from './component/views/cart.view';
import ReceiptIndex from './component/views/receipt.view';

import AdminPage from './component/Admin/admin.component';
import InsertPage from './component/Admin/addProduct.component';

// style
import 'bootstrap/dist/css/bootstrap.min.css';
import "./component/assets/css/bootstrap.min.css";
import "./component/assets/css/now-ui-kit.css";
import "./component/assets/demo/demo.css";
import "./component/assets/demo/nucleo-icons-page-styles.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter > 
    <Routes>
      <Route path="/" element={<ProductIndex />} />
      <Route path="/product" element={<ProductIndex />} />
      <Route path="/login" element={<LoginIndex />} />
      <Route path="/signup" element={<SignUpIndex />} />

      <Route path="/detail/:_id" element={<DetailIndex />} />
      <Route path="/home" element={<HomeIndex />} />
      <Route path="/contact" element={<ContactIndex />} />

      <Route path="/cart" element={<CartIndex />} />

      <Route path="/receipt" element={<ReceiptIndex />} />

      <Route path="/admin" element={<AdminPage />} />
      <Route path="/insert" element={<InsertPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
