import { Link } from "react-router-dom";
import { FaBox, FaShoppingCart, FaUsers, FaWarehouse, FaStar } from "react-icons/fa"; // icons


export default function SellerSideBar() {
    return <div className="sidebar bg-dark">
        <ul className="nav flex-column">
            {/* Orders Dropdown */}
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
                        <li><Link to="/seller/orderProductlist" className="nav-link text-white">Order List</Link></li>
                    </ul>
                </div>
            </li>

            {/* Products Dropdown */}
            <li className="nav-item">
                <a
                    className="nav-link text-white d-flex align-items-center"
                    data-bs-toggle="collapse"
                    href="#productsMenu"
                    role="button"
                    aria-expanded="false"
                    aria-controls="productsMenu"
                >
                    <FaBox className="icon" />
                    <span className="link-text">Products</span>
                </a>
                <div className="collapse" id="productsMenu">
                    <ul className="nav flex-column ms-4">
                        <li><Link to="/seller/sellerproductlist" className="nav-link text-white">Product List</Link></li>
                        <li><Link to="/add/product" className="nav-link text-white">Add Product</Link></li>
                    </ul>
                </div>
            </li>

            {/* Stock */}
            <li className="nav-item">
                <Link to="/seller/stockUpdate/" className="nav-link text-white d-flex align-items-center">
                    <FaWarehouse className="icon" />
                    <span className="link-text">Stock</span>
                </Link>
            </li>

            {/* Reviews */}
            <li className="nav-item">
                <Link to="/seller/reviews" className="nav-link text-white d-flex align-items-center">
                    <FaStar className="icon" />
                    <span className="link-text">Reviews</span>
                </Link>
            </li>
        </ul>
    </div>
}