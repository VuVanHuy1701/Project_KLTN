// ManageBills.js
import React from 'react';
import './Dh.css'; // Tách CSS

const ManageBills = () => {
    return (
        <div className="manage-bills">
            <h1>Manage Bills</h1>
            <table>
                <thead>
                    <tr>
                        <th>Bill ID</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>66f2c6f11492072fb9d9641b</td>
                        <td>Al_lice</td>
                        <td>
                            Áo Thun x 2<br />
                            Quần Jean x 7<br />
                            Áo Khoác x 3
                        </td>
                        <td>490000</td>
                        <td><span className="status pending">PENDING</span></td>
                        <td>
                            <button className="btn btn-delivery">Set On Delivery</button>
                            <button className="btn btn-delete"><i className="fas fa-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>66f2c77dc5a9ad5f4690bcea</td>
                        <td>charlotte</td>
                        <td>
                            Váy Dạ Hội x 2<br />
                            Áo Len x 2<br />
                            Áo Khoác Da x 7
                        </td>
                        <td>322000</td>
                        <td><span className="status done">DONE</span></td>
                        <td>
                            <button className="btn btn-delete"><i className="fas fa-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>66f2d21384a971b9d69431a0</td>
                        <td>Al_lice</td>
                        <td>
                            Áo Thun x 2<br />
                            Quần Jean x 7<br />
                            Áo Khoác x 3
                        </td>
                        <td>490000</td>
                        <td><span className="status done">DONE</span></td>
                        <td>
                            <button className="btn btn-delete"><i className="fas fa-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>66f2e06d79e047ef002c8d4</td>
                        <td>Al_lice</td>
                        <td>Áo Thun x 2</td>
                        <td>40000</td>
                        <td><span className="status done">DONE</span></td>
                        <td>
                            <button className="btn btn-delete"><i className="fas fa-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>66f2fe4bd79e047ef002c935</td>
                        <td>Al_lice</td>
                        <td>
                            Áo Khoác Da x 8<br />
                            Giày Thể Thao x 5<br />
                            Nón Len x 2
                        </td>
                        <td>660000</td>
                        <td><span className="status pending">PENDING</span></td>
                        <td>
                            <button className="btn btn-delivery">Set On Delivery</button>
                            <button className="btn btn-delete"><i className="fas fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ManageBills;
