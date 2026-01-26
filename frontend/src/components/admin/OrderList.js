import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "../layouts/Loader";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import { deleteOrder,  ordersList} from "../../actions/orderAction";
import { clearOrderDeleted } from "../../slices/orderSlice";
import { clearError } from "../../slices/productsSlice";

export default function OrderList() {
    const { adminOrders = [], isOrderDelete, loading = true, error } = useSelector(state => state.orderState);
    const { user } = useSelector(state => state.authState);
    const dispatch = useDispatch();

    const deleteHandler = (e,id) => {
        e.target.disabled = true;
        dispatch(deleteOrder(id))
    }

    useEffect(() => {
        if (error) {
            toast.error(error, {
                onOpen: () => { dispatch(clearError()) }
            });
            return;
        }
        if( isOrderDelete) {
            toast.success('Order Deleted!!!', {
                onOpen: () => { dispatch(clearOrderDeleted()) }
            });
            return;
        }
        dispatch(ordersList())
    }, [dispatch, error,isOrderDelete])

    return (
        <Fragment>
        
            {loading ? <Loader /> : (
                <div className="container-fluid my-4">
                    <div className="row g-3">
    
                        {/* Sidebar */}
                        <div className="col-lg-2">
                            <SideBar user={{role: user?.role}}/>
                        </div>
    
                        {/* Orders Table */}
                        <div className="col-lg-10">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title mb-3">Orders List</h5>
                                    <div className="table-responsive">
                                        <table className="table table-striped align-middle">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>No. of Items</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {adminOrders.map((order, idx) => (
                                                    <tr key={idx}>
                                                        <td>{order.orderItems[0]?.product}</td>
                                                        <td>{order.orderItems?.length || 0}</td>
                                                        <td>
                                                            <span className={`badge ${order.orderStatus === "Delivered" ? "bg-success" : "bg-warning"}`}>
                                                                {order.orderStatus}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <Link
                                                                to={`/order/order/${order._id}`}
                                                                className="btn btn-outline-primary btn-sm me-2 mr-1"
                                                                style={{borderRadius:'10%'}}
                                                            >
                                                                <FaEdit /> Edit
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => deleteHandler(e, order._id)}
                                                                className="btn btn-outline-danger btn-sm"
                                                                style={{borderRadius:'10%'}}
                                                            >
                                                                <FaTrash /> Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                    </div>
                </div>
            )}
        </Fragment>
    );
    
}
