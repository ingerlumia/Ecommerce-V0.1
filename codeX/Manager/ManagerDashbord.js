import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ManagerSideBar from "./ManagerSideBar";
import { managerGetProductsFil, managerGetUsers, managerOrderList } from "../../actions/managerAction";


export default function ManagerDashbord() {

    const { users = [], userOrders = [], products = [] } = useSelector(state => state.managerState);
    const dispatch = useDispatch();
    let outOfStock = 0;

    useEffect(() => {
        dispatch(managerGetProductsFil());
        dispatch(managerOrderList());
        dispatch(managerGetUsers());
       
    }, [dispatch])

    if (products.length > 0) {
        products.forEach(product => {
            if (product.stock === 0) {
                outOfStock = outOfStock + 1;
            }
        })
    }

    let outOfStockPercent = (outOfStock / products.length) * 100
    const orderedProductLength = userOrders.length;
    const orderedProductPercent = (orderedProductLength / 100) * 100;
    const orderAmount = userOrders.reduce((acc, item) => (acc + item.totalPrice), 0)
    //const itemsPrice = cartItems.reduce((acc, item) => (acc + item.price * item.qty), 0);
    let productLength = products.length;
    let rejectedproduct = 0;
    let notapprovedproduct = 0;
    let pendingOrdertLength = 0;
    let deliveredOrdertLength = 0;
    let shippedorderLength = 0;
    let outfordelvieryLength = 0;
    let sellerlen = 0;
    let userlen = 0;
    
    products.map((p,idx)=>{if(p.status === 'pending' || p.status === 'rejected' ){productLength = productLength - 1 }});
    products.map((p,idx)=>{if(p.status === 'pending' ){notapprovedproduct = notapprovedproduct + 1 }});
    products.map((p,idx)=>{if(p.status === 'rejected' ){rejectedproduct = rejectedproduct + 1 }});
    userOrders.map((order,idx)=>{if(order.orderStatus === 'Processing' ){pendingOrdertLength=pendingOrdertLength+1}});
    userOrders.map((order,idx)=>{if(order.orderStatus === 'Delivered' ){deliveredOrdertLength=deliveredOrdertLength+1}});
    userOrders.map((order,idx)=>{if(order.orderStatus === 'shipped' ){shippedorderLength=shippedorderLength+1}});
    userOrders.map((order,idx)=>{if(order.orderStatus === 'outfordelivery' ){outfordelvieryLength=outfordelvieryLength+1}});
    users.map((user,idx)=>{if(user.role === 'user'){userlen+=1}});
    users.map((user,idx)=>{if(user.role === 'seller'){sellerlen+=1}});

    const pendingorderpercent= (pendingOrdertLength / orderedProductLength) * orderedProductLength;
    const deliverdorderpercent= (deliveredOrdertLength / orderedProductLength) * orderedProductLength;
    const shippedorderpercent= (shippedorderLength / orderedProductLength) * orderedProductLength;
    const outfordelvierypercent= (outfordelvieryLength / orderedProductLength) * orderedProductLength;
  
    return (
        <Fragment>
            <div className="d-flex">
            <ManagerSideBar pendlen={notapprovedproduct} />
                
                <div className="content flex-grow-1 p-4">
                    <h2>Dashboard</h2>
                    <div className="row g-3">
                       
                    <div className="col-md-3">
                            <div className="card text-center shadow">
                                <div className="card-body">
                                    <h5 className="card-title">Orders This Month</h5>
                                    <h3>{orderedProductLength}</h3>
                                    <p className="text-primary">{orderedProductPercent}%</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card text-center shadow">
                                <div className="card-body">
                                    <h5 className="card-title">Order Amount</h5>
                                    <h3>{orderAmount}</h3>
                                    <p className="text-info">+10% this month</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card text-center shadow">
                                <div className="card-body">
                                    <h5 className="card-title">Delivered Orders</h5>
                                    <h3>{deliveredOrdertLength}</h3>
                                    <p className="text-success">{deliverdorderpercent}%</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card text-center shadow">
                                <div className="card-body">
                                    <h5 className="card-title">Processing Orders</h5>
                                    <h3>{pendingOrdertLength}</h3>
                                    <p className="text-warning">{pendingorderpercent}%</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card text-center shadow">
                                <div className="card-body">
                                    <h5 className="card-title">Shipped Orders</h5>
                                    <h3>{shippedorderLength}</h3>
                                    <p className="text-warning">{shippedorderpercent}%</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card text-center shadow">
                                <div className="card-body">
                                    <h5 className="card-title">OutForDeliverey Orders</h5>
                                    <h3>{outfordelvieryLength}</h3>
                                    <p className="text-warning">{outfordelvierypercent}%</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card text-center shadow">
                                <div className="card-body">
                                    <h5 className="card-title">Products</h5>
                                    <h6><span>{productLength} </span>Product's</h6>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card text-center shadow">
                                <div className="card-body">
                                    <h5 className="card-title">Rejected Products</h5>
                                    <h6><span>{rejectedproduct} </span>Product's</h6>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card text-center shadow">
                                <div className="card-body">
                                    <h5 className="card-title">Not Approved Products</h5>
                                    <h6><span>{notapprovedproduct} </span>Product's</h6>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card text-center shadow">
                                <div className="card-body">
                                    <h5 className="card-title">Users</h5>
                                    <h3>{userlen}</h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card text-center shadow">
                                <div className="card-body">
                                    <h5 className="card-title">Sellers</h5>
                                    <h3>{sellerlen}</h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card text-center shadow">
                                <div className="card-body">
                                    <h5 className="card-title">Out Of Stock</h5>
                                    <h3>{outOfStock}</h3>
                                    <p className="text-warning">{outOfStockPercent}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
