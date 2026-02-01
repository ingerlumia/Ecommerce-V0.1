import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ValidateShipping } from "../cart/Shipping";
import axios from "axios";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { createOrder } from "../../actions/orderAction";
import { clearOrderError } from "../../slices/orderSlice";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { user } = useSelector((state) => state.authState);
  const { shippingInfo, items: cartItems } = useSelector(
    (state) => state.cartState,
  );
  const { error: orderError } = useSelector((state) => state.orderState);

  const paymentData = {
    amount: Math.floor(orderInfo?.totalPrice * 100),
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        state: shippingInfo.state,
        postal_code: shippingInfo.posetelCode,
        country: shippingInfo.country,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNumber,
    },
  };

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  useEffect(() => {
    ValidateShipping(shippingInfo, navigate);
    if (orderError) {
      toast.error(orderError, {
        onOpen: () => {
          dispatch(clearOrderError());
        },
      });
      return;
    }
  }, [dispatch, navigate, orderError, shippingInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay-btn").disabled = true;

    try {
      let url = process.env.REACT_APP_BACKEND_URL;
      const { data } = await axios.post(
        `${url}/api/payment/process`,
        paymentData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const client_secret = data.client_secret;

      const result = stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        toast.error((await result).error.message);
        document.querySelector("#pay-btn").disabled = false;
      } else {
        if ((await result).paymentIntent.status === "succeeded") {
          toast.success("payment sucess");
          order.paymentInfo = {
            id: (await result).paymentIntent.id,
            status: (await result).paymentIntent.status,
          };
          dispatch(orderCompleted());
          dispatch(createOrder(order));
          navigate("/order/sucess");
        } else {
          toast.error("Try Again Payment failed");
        }
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <Fragment>
      <div className="container my-4">
        <div className="card p-4 mb-4 shadow-sm">
          <div className="checkout-summary mb-3">
            <h2 className="mb-2">Stripe Payment</h2>
            <div className="h4">${orderInfo && orderInfo.totalPrice}</div>
          </div>

          <div className="checkout-form">
            <h3 className="mb-3">Pay with card</h3>
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label className="form-label">Card information</label>
                <CardNumberElement
                  className="form-control mb-2"
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  required
                />
                <div className="d-flex gap-2">
                  <CardExpiryElement
                    className="form-control"
                    type="text"
                    placeholder="MM / YY"
                    required
                  />
                  <CardCvcElement
                    className="form-control"
                    type="text"
                    placeholder="CVC"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                id="pay-btn"
                className="btn btn-primary w-100"
              >
                Pay ${orderInfo && orderInfo.totalPrice}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

/*
 <Fragment>
        <div className="container my-4">

            <div className="card p-4 mb-4 shadow-sm">
                <div className="checkout-summary mb-3">
                    <h2 className="mb-2">Stripe Payment</h2>
                    <div className="h4">${orderInfo && orderInfo.totalPrice}</div>
                </div>

                <div className="checkout-form">
                    <h3 className="mb-3">Pay with card</h3>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="you@example.com" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Card information</label>
                            <CardNumberElement className="form-control mb-2" type="text" placeholder="1234 1234 1234 1234" required />
                            <div className="d-flex gap-2">
                                <CardExpiryElement className="form-control" type="text" placeholder="MM / YY" required />
                                <CardCvcElement className="form-control" type="text" placeholder="CVC" required />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Name on card</label>
                            <input type="text" className="form-control" placeholder="John Doe" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Country or region</label>
                            <select className="form-select mb-2">
                                <option>United States</option>
                                <option>India</option>
                                <option>United Kingdom</option>
                                <option>Canada</option>
                            </select>
                            <input type="text" className="form-control" placeholder="ZIP" required />
                        </div>

                        <button type="submit" id="pay-btn" className="btn btn-primary w-100">Pay ${orderInfo && orderInfo.totalPrice}</button>
                    </form>
                </div>
            </div>

        </div>
    </Fragment>
*/

