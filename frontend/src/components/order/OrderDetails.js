import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { orderDetail } from "../../actions/orderAction";
import Loader from "../layouts/Loader";

export default function OrderDetails() {

    const { orderDetails, loading } = useSelector(state => state.orderState);
    const { shippingInfo = {}, user = {}, orderStatus = {}, orderItems = {}, totalPrice = 0, paymentInfo = {} } = orderDetails;
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false;
    const { id } = useParams();
    const dispatch = useDispatch();

    console.log(orderDetails);

    useEffect(() => {
        dispatch(orderDetail(id))
    }, [dispatch, id]);

    return orderDetails ? (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <h1>Order ID : {orderDetails._id}</h1>
                    <h6>{user.name}</h6>
                    <h6>{shippingInfo.phoneNumber}</h6>
                    <h6>{shippingInfo.address}</h6>
                    <h6>Amount: {totalPrice}</h6>
                    <h6>Payment Status: {paymentInfo.status}</h6>
                    <h6>Order Status: {orderStatus}</h6>
                    <h1>Order Item</h1>

                    {orderItems && orderItems.map((item, index) => (
                        <div key={index}>
                            <h6>Product : {item.name}</h6>
                            <img src={item.image} height="90" width="115"></img>
                            <h6>price : {item.price}</h6>
                            <h6>QTY : {item.qty}</h6>
                        </div>
                    ))}
                </Fragment>
            }
        </Fragment>
    ) : (
        <h2>You don’t have any orders yet.</h2>
    );
}
