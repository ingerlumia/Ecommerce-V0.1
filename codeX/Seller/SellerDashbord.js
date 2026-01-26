import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SellerSideBar from "./SellerSideBar";
import { sellerGetProducts, sellerOrdersList } from "../../actions/sellerAction";
import { toast } from "react-toastify";
import { getTopSellingProducts, monthlyProducts, trendingProducts } from "../../actions/featuresAction";



export default function SellerDashbord() {

    const { userOrders = [], products = [] } = useSelector(state => state.sellerState);
    const { user } = useSelector(state => state.authState)
    const dispatch = useDispatch();
    let outOfStock = 0;

    useEffect(() => {
        dispatch(sellerGetProducts());
        dispatch(sellerOrdersList());
      }, [dispatch])

    let dump = 1;

    let outOfStockPercent = (outOfStock / products.length) * 100

    let orderedProductLength = 0;
    let orderedProductPercent = (orderedProductLength / 100) * 100;
    let orderAmount = userOrders.reduce((acc, item) => (acc + item.totalPrice), 0)
    //const itemsPrice = cartItems.reduce((acc, item) => (acc + item.price * item.qty), 0);

    let rejectedproduct = 0;
    let notapprovedproduct = 0;
    let pendingOrdertLength = 0;
    let deliveredOrdertLength = 0;
    let shippedorderLength = 0;
    let outfordelvieryLength = 0;

    const myProducts = products.filter(p => {
        const sellerId = typeof p.seller === "object" ? (p.seller._id || p.seller.id) : p.seller;
        return sellerId === user._id;
    });

    myProducts.forEach(p => {
        if (p.stock === 0) outOfStock += 1;
        if (p.status === 'pending') notapprovedproduct += 1;
        if (p.status === 'rejected') rejectedproduct += 1;
    });
    const productLength = myProducts.length;
    userOrders.map((order, idx) => {
        const sellerId = order.orderItems.map((i) => i.seller.id);
        const isMyProduct = sellerId.includes(user._id);

        if (isMyProduct) {
            orderedProductLength += 1;
            if (order.orderStatus === 'Processing') { pendingOrdertLength = pendingOrdertLength + 1 };
            if (order.orderStatus === 'Delivered') { deliveredOrdertLength = deliveredOrdertLength + 1 };
            if (order.orderStatus === 'shipped') { shippedorderLength = shippedorderLength + 1 };
            if (order.orderStatus === 'outfordelivery') { outfordelvieryLength = outfordelvieryLength + 1 };
        }

    });


    const pendingorderpercent = (pendingOrdertLength / orderedProductLength) * orderedProductLength;
    const deliverdorderpercent = (deliveredOrdertLength / orderedProductLength) * orderedProductLength;
    const shippedorderpercent = (shippedorderLength / orderedProductLength) * orderedProductLength;
    const outfordelvierypercent = (outfordelvieryLength / orderedProductLength) * orderedProductLength;

    return (
        <Fragment>
            <div className="d-flex">
                <SellerSideBar />

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
