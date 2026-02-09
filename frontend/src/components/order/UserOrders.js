import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userorders } from "../../actions/orderAction";

export default function UserOrders() {

const {userOrders} = useSelector(state => state.orderState);
const dispatch = useDispatch();

useEffect(()=>{
    dispatch(userorders)
},[dispatch]);

const styles = `
  .orders-container { padding-bottom: 40px; }

  .order-card {
    border: none;
    border-radius: 12px;
    background: #fff;
    transition: transform 0.2s ease;
    overflow: hidden;
    margin-bottom: 25px;
  }

  .order-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.08) !important;
  }

  /* Header Branding */
  .order-card-header {
    background: #f8f9fa;
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .order-id {
    font-size: 0.8rem;
    color: #666;
    font-weight: 600;
  }

  .status-pill {
    padding: 4px 12px;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .status-processing { background: #fff4e5; color: #FF7A00; }
  .status-succeeded { background: #e6fcf5; color: #0ca678; }

  .product-img {
    height: 90px;
    width: 90px;
    object-fit: contain;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
  }

  .btn-view-details {
    color: #FF7A00;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.9rem;
    padding: 8px 20px;
    border: 1px solid #FF7A00;
    border-radius: 6px;
    transition: 0.3s;
  }

  .btn-view-details:hover {
    background: #FF7A00;
    color: #fff;
  }

  .total-price {
    font-size: 1.1rem;
    font-weight: 800;
    color: #333;
  }

  .text-orange { color: #FF7A00; }
`;

return userOrders && userOrders.length > 0 ? (
  <Fragment>
    <style>{styles}</style>
    <div className="container orders-container">
      <h2 className="mt-5 mb-4 fw-bold">
        Purchase <span className="text-orange">History</span>
      </h2>

      <div className="row">
        <div className="col-12 col-lg-9">
          {userOrders.map((order) => (
            <div key={order._id} className="card shadow-sm order-card">
              {/* Header with ID and Status */}
              <div className="order-card-header">
                <div>
                  <span className="order-id">ID: #{order._id.toUpperCase()}</span>
                  <div className="small text-muted">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <span className={`status-pill status-${order.orderStatus}`}>
                  {order.orderStatus}
                </span>
              </div>

              {/* Order Items */}
              <div className="card-body">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="row align-items-center mb-3">
                    <div className="col-3 col-md-2">
                      <img src={item.image} alt={item.name} className="product-img" />
                    </div>
                    <div className="col-9 col-md-4">
                      <Link to={`/product/${item.product}`} className="text-decoration-none text-dark h6 fw-bold mb-1 d-block">
                        {item.name}
                      </Link>
                      <p className="text-muted small mb-0">Qty: {item.qty}</p>
                    </div>
                    <div className="col-6 col-md-3 mt-3 mt-md-0">
                      <span className="text-muted small d-block">Item Price</span>
                      <span className="fw-bold">₹{item.finalPrice.toLocaleString()}</span>
                    </div>
                    {/* View Button - Only for the first item to group the order */}
                    {index === 0 && (
                      <div className="col-6 col-md-3 text-end mt-3 mt-md-0">
                        <Link to={`/order/view/${order._id}`} className="btn-view-details">
                          View Order
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer with Total */}
              <div className="card-footer bg-white border-top-0 px-4 pb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Order Total (incl. tax & shipping):</span>
                  <span className="total-price text-orange">₹{order.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Fragment>
) : (
  <div className="text-center py-5">
    <h2 className="text-muted">No orders found.</h2>
    <Link to="/" className="btn btn-warning mt-3">Go Shopping</Link>
  </div>
);
}
