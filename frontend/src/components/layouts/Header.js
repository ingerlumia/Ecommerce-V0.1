import { Link, useNavigate } from "react-router-dom"
import Search from "./Search"
import { useDispatch, useSelector } from "react-redux"
import { Dropdown, Image, DropdownToggle } from "react-bootstrap"
import { logoutUser } from "../../actions/userAction"
import '../../style.css'

const size = {
    width: '40px',
    height: '40px'
}

export default function Header({ cartItems, wish }) {

    const { isAuthenticated, user } = useSelector(state => state.authState)
    const { items: cartitems } = useSelector(state => state.cartState)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const logoutHandler = ()=>{
        dispatch(logoutUser);
    }

 const styles = `
  .modern-nav {
    background: #ffffff !important;
    border-bottom: 2px solid #f0f0f0 !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Logo Animation */
  .brand-logo {
    transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .brand-logo:hover {
    transform: rotate(10deg) scale(1.1);
  }

  /* Interactive Links */
  .nav-link-modern {
    color: #222 !important;
    font-weight: 700 !important;
    letter-spacing: 0.3px;
    padding: 8px 15px !important;
    position: relative;
    transition: color 0.3s ease;
  }

  .nav-link-modern::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 15px;
    background-color: #FF7A00;
    transition: width 0.3s ease;
  }

  .nav-link-modern:hover::after {
    width: calc(100% - 30px);
  }

  .nav-link-modern:hover {
    color: #FF7A00 !important;
  }

  /* Cart/Wishlist Badges */
  .badge-modern {
    background-color: #FF7A00 !important;
    color: #fff !important;
    font-size: 10px;
    border-radius: 50px;
    padding: 4px 8px;
    transform: translateY(-2px);
  }

  /* User Dropdown */
  .dropdown-menu-modern {
    border: none !important;
    box-shadow: 0 10px 40px rgba(0,0,0,0.12) !important;
    border-radius: 12px !important;
    padding: 10px !important;
    margin-top: 15px !important;
    animation: menuSlideUp 0.3s ease-out;
  }

  @keyframes menuSlideUp {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .dropdown-item-modern {
    border-radius: 8px;
    padding: 10px 15px;
    font-weight: 600;
    transition: 0.2s;
  }

  .dropdown-item-modern:hover {
    background: #fff8f1 !important;
    color: #FF7A00 !important;
    padding-left: 20px; /* Subtle slide effect on hover */
  }

  /* Search Container Animation */
  .search-container-modern {
    transition: all 0.3s ease;
  }
  .search-container-modern:focus-within {
    transform: scale(1.01);
  }
`;

return (
    <nav className="navbar navbar-expand-lg py-3 modern-nav fixed-top">
        <style>{styles}</style>
        <div className="container-fluid px-4">

            {/* LEFT SECTION */}
            <div className="d-flex align-items-center gap-3">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img className="brand-logo" style={size} src="/dragon-shape.png" alt="logo" />
                </Link>

                {isAuthenticated && user ? (
                    <Dropdown align="start">
                        <DropdownToggle
                            className="d-flex align-items-center border-0 bg-transparent text-dark p-0"
                            style={{ boxShadow: 'none' }}
                        >
                            <Image roundedCircle style={{ ...size, border: '2px solid #FF7A00' }} src={user.avatar} />
                            <span className="ms-2 fw-bold d-none d-md-inline" style={{ fontSize: '0.95rem' }}>
                                {user.name}
                            </span>
                        </DropdownToggle>

                        <Dropdown.Menu className="dropdown-menu-modern">
                            {user.role === "admin" && (
                                <Dropdown.Item className="dropdown-item-modern" onClick={() => navigate('/dashboard')}>
                                    <i className="fa fa-chart-line me-2"></i>Admin Dashboard
                                </Dropdown.Item>
                            )}
                            {user.role === "seller" && (
                                <Dropdown.Item className="dropdown-item-modern" onClick={() => navigate('/dashboard')}>
                                    <i className="fa fa-store me-2"></i>Seller Center
                                </Dropdown.Item>
                            )}
                            {user.role === "manager" && (
                                <Dropdown.Item className="dropdown-item-modern" onClick={() => navigate('/dashboard')}>
                                    <i className="fa fa-user-shield me-2"></i>Management
                                </Dropdown.Item>
                            )}

                            <Dropdown.Item className="dropdown-item-modern" onClick={() => navigate('/profile')}>
                                <i className="fa fa-user-circle me-2"></i>Account Settings
                            </Dropdown.Item>

                            <Dropdown.Item className="dropdown-item-modern" onClick={() => navigate('/order/userorders')}>
                                <i className="fa fa-box-open me-2"></i>My Orders
                            </Dropdown.Item>

                            <Dropdown.Divider />

                            <Dropdown.Item className="dropdown-item-modern text-danger" onClick={logoutHandler}>
                                <i className="fa fa-sign-out-alt me-2"></i>Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <Link className="nav-link-modern" to="/Login">
                        Login
                    </Link>
                )}
            </div>

            {/* CENTER SEARCH BAR */}
            <div className="mx-auto d-none d-md-block search-container-modern" style={{ width: "42%" }}>
                <Search />
            </div>

            {/* RIGHT SIDE CART + WISHLIST */}
            <div className="d-flex align-items-center gap-2">

                <Link className="nav-link-modern position-relative d-flex align-items-center" to="/cart">
                    <i className="fa fa-shopping-bag me-2"></i>
                    <span className="d-none d-lg-inline">Cart</span>
                    <span className="badge-modern ms-2">
                        {cartitems.length}
                    </span>
                </Link>

                <Link className="nav-link-modern position-relative d-flex align-items-center" to="/wishlist">
                    <i className="fa fa-heart me-2"></i>
                    <span className="d-none d-lg-inline">Wishlist</span>
                    <span className="badge-modern ms-2">
                        {wish.length}
                    </span>
                </Link>

            </div>
        </div>
    </nav>
);
}
