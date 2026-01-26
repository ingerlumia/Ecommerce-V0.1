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
    }, [])

    return <Fragment>
        <CheckOutInfo step1 step2 />
        <div className="container my-4">
            <h3 className="mb-4">Confirm Order</h3>
            <div className="card shadow-sm mb-4">
                <div className="card-header">
                    <h5 className="mb-0">Shipping Information</h5>
                </div>
                <div className="card-body">
                    <p className="mb-1"><strong>Name:</strong> {user.name}</p>
                    <p className="mb-1"><strong>Address:</strong> {shippingInfo.address}</p>
                    <p className="mb-1"><strong>City:</strong>  {shippingInfo.city}</p>
                    <p className="mb-1"><strong>State:</strong> {shippingInfo.state}</p>
                    <p className="mb-1"><strong>Country:</strong>  {shippingInfo.country}</p>
                    <p className="mb-1"><strong>Postal Code:</strong> {shippingInfo.posetelCode}</p>
                    <p className="mb-0"><strong>Phone:</strong> {shippingInfo.phoneNumber}</p>
                </div>
            </div>

        </div>

        <div className="card-body">

            {cartItems.map((item,index) => (
                <Fragment key={index}>
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header">
                            <h5 className="mb-0">Your Products</h5>
                            <div className="d-flex align-items-center border-bottom pb-3 mb-3">
                                <div className="flex-grow-1">
                                    <h6 className="mb-1">{item.name}</h6>
                                    <p className="mb-1 text-muted">{item.description}</p>
                                    <small>Qty: {item.qty}</small>
                                </div>
                                <div className="col-4 col-lg-3">
                                    <img  src={`http://localhost:2005${item.image}`} alt="Laptop" height="90" width="115"/>
                                </div>
                                <div>
                                    <strong>${item.price}</strong>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="card shadow-sm mb-4">
                        <div className="card-header">
                            <h5 className="mb-0">Order Summary</h5>
                        </div>
                        <div className="card-body">
                            <p className="mb-1"><strong>Items Price:</strong> ${itemsPrice}</p>
                            <p className="mb-1"><strong>Shipping Price:</strong> ${shippingPrice}</p>
                            <p className="mb-1"><strong>Tax:</strong> ${taxPrice}</p>
                            <hr />
                            <h6><strong>Total Price:</strong> ${totalPrice}</h6>
                        </div>
                    </div>
                </Fragment>))}

            <div className="text-end">
                <button className="btn btn-success btn-lg" onClick={proceedPayment}>
                    Proceed to Payment
                </button>
            </div>
        </div>

    </Fragment>
}


