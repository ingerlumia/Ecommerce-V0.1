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

    return (
        <nav className="navbar navbar-expand-lg py-2 shadow-sm bg-white border-bottom fixed-top">
            <div className="container-fluid px-3">

                {/* LEFT SECTION */}
                <div className="d-flex align-items-center gap-2">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img style={size} src="/dragon-shape.png" alt="logo" />
                    </Link>

                    {/* USER DROPDOWN */}
                    {isAuthenticated && user ? (
                        <Dropdown align="start">
                            <DropdownToggle
                                className="d-flex align-items-center border-0 bg-transparent text-dark"
                            >
                                <Image roundedCircle style={size} src={user.avatar} />
                                <span className="ms-2 fw-medium d-none d-md-inline">
                                    {user.name}
                                </span>
                            </DropdownToggle>

                            <Dropdown.Menu className="shadow-sm">

                                {user.role === "admin" && (
                                    <Dropdown.Item onClick={() => navigate('/dashboard')}>
                                        Dashboard
                                    </Dropdown.Item>
                                )}

                                {user.role === "seller" && (
                                    <Dropdown.Item onClick={() => navigate('/dashboard')}>
                                        Dashboard
                                    </Dropdown.Item>
                                )}

                                {user.role === "manager" && (
                                    <Dropdown.Item onClick={() => navigate('/dashboard')}>
                                        Dashboard
                                    </Dropdown.Item>
                                )}

                                <Dropdown.Item onClick={() => navigate('/profile')}>
                                    Profile
                                </Dropdown.Item>

                                <Dropdown.Item onClick={() => navigate('/order/userorders')}>
                                    My Orders
                                </Dropdown.Item>

                                <Dropdown.Divider />

                                <Dropdown.Item className="text-danger" onClick={logoutHandler}>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Link className="nav-link fw-medium text-dark" to="/Login">
                            Login
                        </Link>
                    )}
                </div>

                {/* CENTER SEARCH BAR */}
                <div className="mx-auto d-none d-md-block" style={{ width: "42%" }}>
                    <Search />
                </div>

                {/* RIGHT SIDE CART + WISHLIST */}
                <div className="d-flex align-items-center gap-3">

                    <Link className="nav-link fw-medium text-dark position-relative" to="/cart">
                        Cart
                        <span className="badge bg-warning text-dark ms-1">
                            {cartitems.length}
                        </span>
                    </Link>

                    <Link className="nav-link fw-medium text-dark position-relative" to="/wishlist">
                        Wishlist
                        <span className="badge bg-warning text-dark ms-1">
                            {wish.length}
                        </span>
                    </Link>

                </div>
            </div>
        </nav>
    );
}
