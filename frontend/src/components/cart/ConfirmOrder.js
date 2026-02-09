import { Fragment, useEffect } from "react";
import { ValidateShipping } from "./Shipping";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckOutInfo from "../../pages/CheckOutInfo";


export default function ConfirmOrder() {

    const { shippingInfo, items: cartItems } = useSelector(state => state.cartState);
    const { user } = useSelector(state => state.authState);
    const navigate = useNavigate();

    const itemsPrice = cartItems.reduce((acc, item) => (acc + item.price * item.qty), 0);
    const shippingPrice = itemsPrice > 5000 ? 0 : 355;
    let taxPrice = Number(0.02 * itemsPrice)
    const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
    taxPrice = Number(0.02 * itemsPrice).toFixed(2);

    const proceedPayment = ()=>{
        const data = {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo',JSON.stringify(data));
        navigate('/order/payment')
    }

    useEffect(() => {
        ValidateShipping(shippingInfo, navigate);
    }, [shippingInfo,navigate])

   const styles = `
  .confirm-container {
    max-width: 1100px;
    margin: 0 auto;
  }

  .section-title {
    font-weight: 700;
    font-size: 1.25rem;
    border-left: 5px solid #FF7A00;
    padding-left: 15px;
    margin-bottom: 20px;
    color: #333;
  }

  .info-card {
    border: none;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  }

  .product-img {
    height: 80px;
    width: 80px;
    object-fit: contain;
    background: #f9f9f9;
    padding: 5px;
    border-radius: 8px;
  }

  .summary-card {
    border: none;
    border-top: 5px solid #FF7A00;
    border-radius: 12px;
    position: sticky;
    top: 20px;
  }

  .text-orange { color: #FF7A00; }

  .btn-payment {
    background: #FF7A00;
    border: none;
    color: white;
    font-weight: 700;
    padding: 12px;
    transition: all 0.3s;
    width: 100%;
    border-radius: 8px;
  }

  .btn-payment:hover {
    background: #E66E00;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 122, 0, 0.3);
  }

  .item-divider {
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 15px;
    margin-bottom: 15px;
  }

  .item-divider:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

return (
  <Fragment>
    <style>{styles}</style>
    <CheckOutInfo step1 step2 />

    <div className="container py-4 confirm-container">
      <div className="row g-4">
        
        {/* LEFT SIDE: SHIPPING & PRODUCTS */}
        <div className="col-12 col-lg-8">
          
          {/* SHIPPING INFORMATION */}
          <h4 className="section-title">Shipping Details</h4>
          <div className="card info-card p-4 mb-4">
            <div className="row">
              <div className="col-md-6">
                <p className="mb-2"><strong>Name:</strong> {user.name}</p>
                <p className="mb-2"><strong>Phone:</strong> {shippingInfo.phoneNumber}</p>
              </div>
              <div className="col-md-6">
                <p className="mb-2 text-capitalize">
                  <strong>Address:</strong><br />
                  {shippingInfo.address}, {shippingInfo.city}, <br />
                  {shippingInfo.state}, {shippingInfo.country} - {shippingInfo.posetelCode}
                </p>
              </div>
            </div>
          </div>

          {/* PRODUCTS LIST */}
          <h4 className="section-title">Review Items</h4>
          <div className="card info-card p-4 mb-4">
            {cartItems.map((item, index) => (
              <div key={index} className="d-flex align-items-center item-divider">
                <img src={`${item.image}`} alt={item.name} className="product-img me-3" />
                <div className="flex-grow-1">
                  <h6 className="mb-0 fw-bold">{item.name}</h6>
                  <p className="text-muted small mb-0 text-truncate" style={{maxWidth: '300px'}}>
                    {item.description}
                  </p>
                </div>
                <div className="text-end">
                  <div className="fw-bold">₹{item.price.basePrice} x {item.qty}</div>
                  <div className="text-orange fw-bold">₹{(item.price * item.qty).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: ORDER SUMMARY */}
        <div className="col-12 col-lg-4">
          <h4 className="section-title">Order Summary</h4>
          <div className="card shadow-sm p-4 summary-card">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal:</span>
              <span>₹{itemsPrice}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Shipping:</span>
              <span className="text-success fw-bold">₹{shippingPrice}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Tax (GST):</span>
              <span>₹{taxPrice}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4">
              <span className="h5 fw-bold">Total:</span>
              <span className="h5 fw-bold text-orange">₹{totalPrice}</span>
            </div>
            
            <button className="btn btn-payment text-uppercase" onClick={proceedPayment}>
              Proceed to Payment <i className="fa fa-chevron-right ms-2"></i>
            </button>
            
            <div className="mt-3 text-center small text-muted">
              <i className="fa fa-shield-alt me-1 text-success"></i> Secure Checkout
            </div>
          </div>
        </div>

      </div>
    </div>
  </Fragment>
);
}


