import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Dropdown, Image, DropdownToggle } from "react-bootstrap"
import "../../App.css"
import { logoutUser } from "../../actions/userAction"

export default function Navbar() {

  const { isAuthenticated, user } = useSelector(state => state.authState)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser);
  }
  const size = {
    height: 45,
    width: 45
  };

  return (
    <nav className="navbar fixed-top shadow-sm border-bottom py-3 px-3 bg-white mb-6"
      style={{ borderBottomColor: "#FF7A00", zIndex: 1030 }}>

      {/* LEFT : USER */}
      <div className="col-4 col-md-3 d-flex justify-content-start align-items-center">
        {isAuthenticated && user ? (
          <Dropdown>
            <DropdownToggle className="bg-transparent border-0 d-flex align-items-center text-dark p-2">
              <Image style={size} roundedCircle src={user.avatar} />
              <span className="ms-2 fw-semibold d-none d-lg-inline">
                {user.name}
              </span>
            </DropdownToggle>

            <Dropdown.Menu className="shadow-lg mt-2 border-0" style={{ minWidth: "200px" }}>
              {user.role === "admin" && (
                <Dropdown.Item onClick={() => navigate('/admin/dashboard')}>
                  <i className="fas fa-tachometer-alt me-2"></i>Admin Dashboard
                </Dropdown.Item>
              )}
              {user.role === "seller" && (
                <Dropdown.Item onClick={() => navigate('/seller/dashboard')}>
                  <i className="fas fa-store me-2"></i>Seller Dashboard
                </Dropdown.Item>
              )}
              {user.role === "manager" && (
                <Dropdown.Item onClick={() => navigate('/manager/dashboard')}>
                  <i className="fas fa-user-cog me-2"></i>Manager Dashboard
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={() => navigate('/profile')}>
                <i className="fas fa-user me-2"></i>Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate('/order/userorders')}>
                <i className="fas fa-shopping-bag me-2"></i>My Orders
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="text-danger fw-semibold" onClick={logoutHandler}>
                <i className="fas fa-sign-out-alt me-2"></i>Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link
            to="/login"
            className="btn btn-outline-warning fw-semibold px-4 py-2"
            style={{ borderColor: "#FF7A00", color: "#FF7A00" }}
          >
            <i className="fas fa-sign-in-alt me-2"></i>Login
          </Link>
        )}
      </div>

      {/* CENTER : LOGO */}
      <div className="col-4 text-center">
        <Link to="/">
          <img
            style={{ ...size, maxHeight: "50px" }}
            alt="Cypers Logo"
            src="/dragon-shape.png"
            className="img-fluid"
          />
        </Link>
      </div>

      {/* RIGHT : SEARCH/WISHLIST/CART - ADD IF NEEDED */}
      <div className="col-4 d-flex justify-content-end align-items-center">
        <Link to="/search" className="btn btn-sm btn-outline-warning me-2">
          <i className="fas fa-search"></i>
        </Link>
      </div>

    </nav>
  );

}
