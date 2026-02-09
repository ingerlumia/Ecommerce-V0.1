import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { orderDetail } from "../../actions/orderAction";
import Loader from "../layouts/Loader";
const styles = `
  .order-details-container {
    max-width: 900px;
    margin: 40px auto;
    padding: 20px;
  }

  .detail-card {
    border: none;
    border-radius: 15px;
    background: #fff;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    overflow: hidden;
    margin-bottom: 30px;
  }

  .detail-header {
    background: #FF7A00;
    color: white;
    padding: 20px;
  }

  .status-section {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }

  .status-box {
    flex: 1;
    padding: 15px;
    border-radius: 10px;
    background: #f8f9fa;
    border: 1px solid #eee;
  }

  .badge-custom {
    padding: 5px 15px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.8rem;
  }

  .item-row {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #f1f1f1;
  }

  .item-row:last-child { border-bottom: none; }

  .item-img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    background: #fdfdfd;
    border-radius: 8px;
    margin-right: 20px;
  }

  .text-orange { color: #FF7A00; }
  .fw-600 { font-weight: 600; }
`;

export default function OrderDetails() {
    const dispatch = useDispatch();
    const { id } = useParams();
    
    // Select state
    const { orderDetails = {}, loading } = useSelector(state => state.orderState);
    
    // FIXED: Initialize orderItems as an ARRAY [], not an object {}
    const { 
        shippingInfo = {}, 
        user = {}, 
        orderStatus = "Processing", 
        orderItems = [], // Fixed here
        totalAmount = 0, 
        paymentInfo = {} 
    } = orderDetails;

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded';

    useEffect(() => {
        dispatch(orderDetail(id));
    }, [dispatch, id]);

    return (
        <Fragment>
            <style>{styles}</style>
            {loading ? <Loader /> : orderDetails._id ? (
                <div className="order-details-container">
                    <div className="detail-card">
                        <div className="detail-header">
                            <h4 className="mb-0">Order # {orderDetails._id}</h4>
                            <small style={{opacity: 0.8}}>Placed on: {new Date(orderDetails.createdAt).toLocaleDateString()}</small>
                        </div>

                        <div className="card-body p-4">
                            {/* STATUS SECTION */}
                            <div className="status-section">
                                <div className="status-box">
                                    <small className="text-muted d-block mb-1 text-uppercase fw-bold" style={{fontSize: '0.7rem'}}>Payment</small>
                                    <span className={`badge-custom ${isPaid ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                                        {isPaid ? 'PAID' : 'NOT PAID'}
                                    </span>
                                </div>
                                <div className="status-box">
                                    <small className="text-muted d-block mb-1 text-uppercase fw-bold" style={{fontSize: '0.7rem'}}>Order Status</small>
                                    <span className={`badge-custom bg-warning text-dark`}>
                                        {orderStatus}
                                    </span>
                                </div>
                            </div>

                            {/* SHIPPING INFO */}
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <h5 className="fw-bold mb-3"><i className="fa fa-user me-2 text-orange"></i>Customer Info</h5>
                                    <p className="mb-1 fw-600">{user.name}</p>
                                    <p className="text-muted small mb-0">{shippingInfo.phoneNumber}</p>
                                </div>
                                <div className="col-md-6">
                                    <h5 className="fw-bold mb-3"><i className="fa fa-map-marker-alt me-2 text-orange"></i>Shipping Address</h5>
                                    <p className="text-muted small mb-0 text-capitalize">
                                        {shippingInfo.address}, {shippingInfo.city},<br />
                                        {shippingInfo.state}, {shippingInfo.country} - {shippingInfo.posetelCode}
                                    </p>
                                </div>
                            </div>

                            <hr />

                            {/* ITEMS LIST */}
                            <h5 className="fw-bold my-4">Order Items</h5>
                            {orderItems && orderItems.map((item, index) => (
                                <div key={index} className="item-row">
                                    <img src={item.image} className="item-img" alt={item.name} />
                                    <div className="flex-grow-1">
                                        <h6 className="mb-0 fw-600">{item.name}</h6>
                                        <small className="text-muted">Quantity: {item.qty}</small>
                                    </div>
                                    <div className="text-end">
                                        <span className="fw-bold text-orange">₹{item.finalPrice || item.price}</span>
                                    </div>
                                </div>
                            ))}

                            {/* FINAL TOTAL */}
                            <div className="mt-4 p-3 bg-light rounded d-flex justify-content-between align-items-center">
                                <h5 className="mb-0 fw-bold">Grand Total</h5>
                                <h4 className="mb-0 fw-bold text-orange">₹{totalAmount || orderDetails.totalPrice}</h4>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <Link to="/order/userorders" className="btn btn-outline-secondary btn-sm">
                            <i className="fa fa-arrow-left me-2"></i>Back to Orders
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="text-center py-5">
                    <h3>Order not found.</h3>
                    <Link to="/">Return Home</Link>
                </div>
            )}
        </Fragment>
    );
}
