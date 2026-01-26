import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userorders } from "../../actions/orderAction";

export default function UserOrders() {

const {userOrders} = useSelector(state => state.orderState);
const dispatch = useDispatch();

useEffect(()=>{
    dispatch(userorders)
},[]);

  return userOrders ? (
    <Fragment>
      <div className="container container-fluid">
        <h2 className="mt-5">Your Orders: <b>{userOrders.length}</b></h2>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {userOrders.map( orders => (
              <Fragment>
                <hr />

                {orders.orderItems.map((item, index)=>(
                <div key={index} className="cart-item">
                  <div className="row">
                  <p>order ID: {orders._id}</p>
                    <div className="col-4 col-lg-3">
                      <img
                        src={`http://localhost:2005${item.image}`}
                        alt={item.name}
                        height="90"
                        width="115"
                      />
                    </div>

                    <div className="col-5 col-lg-4">
                      <Link to={"/product/" + item.product}>{orders.orderStatus}</Link>
                      
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p className="fw-bold">Price: ${item.price}</p>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p>Qty: {item.qty}</p>
                    </div>
                    <Link to={"/order/view/" + orders._id}>view</Link>
                  </div>
                </div>
                ))}
              </Fragment>
            ))}
          </div>

          
        </div>
      </div>
    </Fragment>
  ) : (
    <h2>You don’t have any orders yet.</h2>
  );
}
