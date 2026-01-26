import { Link } from "react-router-dom";
import { FaBox, FaShoppingCart, FaUsers, FaWarehouse, FaStar, FaBell } from "react-icons/fa"; 


export default function ManagerSideBar({ pendlen }) {
    return <div className="sidebar bg-dark">
        <div className="sidebar-div">
            <ul className="nav flex-column">

            <li className="nav-item">
                <a
                    className="nav-link text-white d-flex align-items-center"
                    data-bs-toggle="collapse"
                    href="#ordersMenu"
                    role="button"
                    aria-expanded="false"
                    aria-controls="ordersMenu"
                >
                    <FaShoppingCart className="icon" />
                    <span className="link-text">Orders</span>
                </a>
                <div className="collapse" id="ordersMenu">
                    <ul className="nav flex-column ms-4">
                        <li><Link to="/manager/orderProductlist" className="nav-link text-white">Order List</Link></li>
                    </ul>
                </div>
            </li>


            <li className="nav-item">
                <a
                    className="nav-link text-white d-flex align-items-center"
                    data-bs-toggle="collapse"
                    href="#productsMenu"
                    role="button"
                    aria-expanded="false"
                    aria-controls="productsMenu"
                >
                    <span className="position-relative">
                        {pendlen > 0 && <span className="notification-dot" />}
                    </span>
                    <FaBox className="icon" />
                    <span className="link-text">Products </span>
                </a>
                <div className="collapse" id="productsMenu">
                    <ul className="nav flex-column ms-4">
                        <li><Link to="/manager/managerproductlist" className="nav-link text-white">Product List</Link></li>
                        <li><Link to="/manager/productapprove" className="nav-link text-white">Product Approve {pendlen > 0 ? <FaBell /> : <FaStar />}</Link></li>
                    </ul>
                </div>
            </li>

            <li className="nav-item">
                <Link to="/manager/userlist/" className="nav-link text-white d-flex align-items-center">
                    <FaUsers className="icon" />
                    <span className="link-text">Users</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/manager/stocklinfo/" className="nav-link text-white d-flex align-items-center">
                    <FaWarehouse className="icon" />
                    <span className="link-text">Stock Info</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/manager/reviews" className="nav-link text-white d-flex align-items-center">
                    <FaStar className="icon" />
                    <span className="link-text">Reviews</span>
                </Link>
            </li>
        </ul>
        </div>
    </div>
}