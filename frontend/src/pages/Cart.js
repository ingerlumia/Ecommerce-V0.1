import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { decresaeCartItem, incresaeCartItem, removeCartItem } from "../slices/cartSlice";

export default function Cart({ cartItems, setCartItems }) {

    const { items } = useSelector(state => state.cartState);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [complete, setComplete] = useState(false);

/*
    function incQty(item) {
        if (item.product.stock == item.qty) {
            return;
        }
        const updatedItem = cartItems.map((i) => {
            if (i.product._id == item.product._id) {
                i.qty++;
            }
            return i;
        })
        setCartItems(updatedItem)
    }

    function descQty(item){
        if(item.qty > 1){
            const updatedItem = cartItems.map((i) => {
                if (i.product._id == item.product._id) {
                    i.qty--;
                }
                return i;
            })
            setCartItems(updatedItem)
        }
    }

    function removeItem(item){
        const updatedItem = cartItems.filter((i) => {
            if (i.product._id !== item.product._id) {
                return true;
            }
        })
        setCartItems(updatedItem)
    }
*/
    function placeOrderHandler(){
        
        fetch(process.env.REACT_APP_API_URL+'order/new',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(cartItems)
        })
        .then(() => {
            setCartItems([]);
            setComplete(true);
            toast.success('Order Placed!!!')
        })
    }

    const checkout = () => {
        navigate('/Login?redirect=shipping')
    }


    
    return items.length > 0 ? (
  <Fragment>
    <div className="container py-4">

      <h2 className="fw-bold mb-4 text-primary">
        Your Cart: <b>{items.length} items</b>
      </h2>

      <div className="row g-4">

        {/* CART ITEMS */}
        <div className="col-12 col-lg-8">
          {items.map((item, index) => (
            <Fragment key={item._id || index}>
              <div className="card shadow-sm mb-3 p-3 rounded-3">
                <div className="row align-items-center">

                  {/* PRODUCT IMAGE */}
                  <div className="col-4 col-lg-3 text-center">
                    <img
                      src={`http://localhost:2005${item.image}`}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ height: "110px", objectFit: "cover" }}
                    />
                  </div>

                  {/* NAME + DESCRIPTION */}
                  <div className="col-8 col-lg-4">
                    <Link
                      to={`/product/${item.product}`}
                      className="fw-bold text-decoration-none text-dark"
                    >
                      {item.name}
                    </Link>
                    <p className="text-muted small">{item.description}</p>
                  </div>

                  {/* PRICE */}
                  <div className="col-6 col-lg-2 text-center mt-3 mt-lg-0">
                    <h5 className="text-success fw-bold">₹{item.price}</h5>
                  </div>

                  {/* QTY CHANGER */}
                  <div className="col-6 col-lg-2 text-center mt-3 mt-lg-0">
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => dispatch(decresaeCartItem(item.product))}
                      >
                        -
                      </button>

                      <input
                        type="number"
                        className="form-control text-center"
                        value={item.qty}
                        readOnly
                        style={{ width: "60px" }}
                      />

                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => dispatch(incresaeCartItem(item.product))}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* DELETE BUTTON */}
                  <div className="col-12 col-lg-1 text-center mt-3 mt-lg-0">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => dispatch(removeCartItem(item.product))}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm p-4 rounded-3">

            <h4 className="fw-bold">Order Summary</h4>
            <hr />

            <p className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <strong>{items.reduce((acc, item) => acc + item.qty, 0)} units</strong>
            </p>

            <p className="d-flex justify-content-between">
              <span>Total Amount:</span>
              <strong>₹{items.reduce((acc, item) => acc + item.price * item.qty, 0)}</strong>
            </p>

            <hr />

            <button
              onClick={checkout}
              className="btn btn-primary w-100 py-2 fw-bold"
            >
              Place Order
            </button>

          </div>
        </div>

      </div>
    </div>
  </Fragment>
) : !complete ? (
  <h2 className="text-center mt-4">Your Cart Is Empty</h2>
) : (
  <Fragment>
    <h2 className="text-success text-center mt-4">Order Completed!</h2>
    <h6 className="text-center text-muted">Your order has been placed successfully.</h6>
  </Fragment>
);

}