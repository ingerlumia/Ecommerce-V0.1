import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../layouts/Loader";
import { Link } from "react-router-dom";
import { sellerclearError } from "../../slices/sellerSlice";
import { FaEdit } from "react-icons/fa";
import { managerGetUser, managerGetUsers, managerOrderList } from "../../actions/managerAction";
import ManagerSideBar from "./ManagerSideBar";
import { Container, Row, Col, Card, Button, Table, FormControl, ListGroup, Badge, FormCheck, Form } from "react-bootstrap";
import UsersComponent from "./UsersComponent";

export default function ManagerOrderList() {
    const {  user = {}, userOrders = [], loading = true, error } = useSelector(state => state.managerState);

    const dispatch = useDispatch();
    const [userrole,setUserrole] = useState('seller');
    const UserSelect = (id) => {
        dispatch(managerGetUser(id))
    }
    useEffect(() => {
        if (error) {
            toast.error(error, {
                onOpen: () => { dispatch(sellerclearError()) }
            });
            return;
        }

        dispatch(managerOrderList());
        dispatch(managerGetUsers());
    }, [dispatch, error])

    return (
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <div className="container-fluid my-4">
              <div className="row g-3">
                {/* Sidebar */}
                <div className="col-lg-2">
                  <ManagerSideBar />
                </div>
      
                {/* Orders / Product View */}
                <div className="col-lg-8">
                  <div className="card shadow-sm border-0">
                    <div className="card-body">
                      <h5 className="card-title mb-3">Seller Orders</h5>
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
                            {userOrders.map((order, idx) => {
                              const sellerId = order.orderItems.map((i) => i.seller.id);
                              const isMyProduct = sellerId.includes(user._id);
      
                              if (!isMyProduct) return null;
      
                              return (
                                <tr key={idx}>
                                  <td>
                                    <Link
                                      to={`/product/${order.orderItems[0]?.image}`}
                                    >
                                      {order.orderItems[0]?.product}
                                    </Link>
                                  </td>
                                  
                                  <td>{order.orderItems?.length || 0}</td>
                                  <td>
                                    <span
                                      className={`badge ${
                                        order.orderStatus === "Delivered"
                                          ? "bg-success"
                                          : "bg-warning"
                                      }`}
                                    >
                                      {order.orderStatus}
                                    </span>
                                  </td>
                                  <td>
                                    <Link
                                      to={`/seller/order/${order._id}`}
                                      className="btn btn-outline-primary btn-sm me-2"
                                      style={{ borderRadius: "10%" }}
                                    >
                                      <FaEdit /> Edit
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
      
                {/* User List */}
                <div className="col-lg-2 bg-light border-start p-3">
                  <UsersComponent/>
                </div>
              </div>
            </div>
          )}
        </Fragment>
      );
      

}
