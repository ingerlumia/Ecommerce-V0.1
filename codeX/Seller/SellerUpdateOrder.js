import React, { Fragment, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../layouts/Loader";
import { sellerOrderDetail, sellerUpdateOrder, sellerUpdateProduct } from "../../actions/sellerAction";
import { sellerclearError, sellerclearIsOrderUpdated } from "../../slices/sellerSlice";

export default function SellerUpdateOrder() {
    
    const { userOrders = [], isOrderUpdate, orderDetails={}, loading = true, error } = useSelector(state => state.sellerState);
    console.log('orderDetails',orderDetails);
    const { user={}, orderItems={},shippingInfo={},totalprice=0,paymentInfo={}} = orderDetails;
    const isPaid = paymentInfo.status === 'succeeded'? true:false;
    const [orderStatus, setOrderStatus] = useState('Processing');
    const {id: orderId} = useParams();

    console.log('orderDetails',orderDetails);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault();
        const orderData= {};
        orderData.orderStatus = orderStatus
        dispatch(sellerUpdateOrder(orderId,orderData));
    }
    
    useEffect(() => {
       
        if(isOrderUpdate){
            toast.success('Order Updated Sucessfuly',{
                onOpen: ()=> dispatch(sellerclearIsOrderUpdated())
            })
            navigate('/')
            return;
        }
        if(error){
            toast.error(error,{
                onOpen: ()=> dispatch(sellerclearError())
            })
            return;
        }
        dispatch(sellerOrderDetail(orderId))
       
    }, [isOrderUpdate,navigate,error,dispatch])

    useEffect(()=>{
        if(orderDetails._id){
            setOrderStatus(orderDetails.orderStatus);
        }
    },[orderDetails])

    return orderDetails ? ( 
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <h1>Order ID : {orderDetails._id}</h1>
                    <h6>{user.name}</h6>
                    <h6>{shippingInfo.phoneNumber}</h6>
                    <h6>{shippingInfo.address}</h6>
                    <h6>Amount: {totalprice}</h6>
                    <h6>Payment Status: {paymentInfo.status}</h6>
                    <h6>Order Status: {orderStatus}</h6>
                    <h1>Order Item</h1>

                    {orderItems && Object.values(orderItems).map(item => (
                        <div key={item._id}>
                            <h6>Product : {item.name}</h6>
                            <img src={item.image} height="90" width="115"></img>
                            <h6>price : {item.price}</h6>
                            <h6>QTY : {item.qty}</h6>
                        </div>
                    ))}
                    <select onChange={e => setOrderStatus(e.target.value)} value={orderStatus}>
                        <option value={"Processing"}>Processing</option>
                        <option value={"shipped"}>Shipped</option>
                        <option value={"outfordelivery"}>OutForDelivery</option>
                        <option value={"Delivered"}>Delivered</option>
                    </select>
                    <button disabled={loading} onClick={submitHandler}>
                        submit
                    </button>
                </Fragment>
            }
        </Fragment>
    ) : (
        <h2>You don’t have any orders yet.</h2>
    );
}

