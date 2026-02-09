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
import { Container, Row, Col, Card, Button } from "react-bootstrap";

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
  const { error: orderError, loading } = useSelector(
    (state) => state.orderState,
  );

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

  const styles = `
  .checkout-container {
    background: #f8f9fa;
    min-height: 70vh;
    padding: 50px 0;
  }

  .payment-card {
    max-width: 450px;
    margin: 0 auto;
    border: none;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  }

  .payment-header {
    background: linear-gradient(135deg, #FF7A00 0%, #FF9D45 100%);
    padding: 30px;
    color: white;
  }

  .price-badge {
    font-size: 2.2rem;
    font-weight: 800;
    margin-top: 5px;
  }

  /* Stripe Input Styling Wrapper */
  .stripe-element-container {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 12px 15px;
    transition: all 0.3s ease;
  }

  .stripe-element-container:focus-within {
    border-color: #FF7A00;
    box-shadow: 0 0 0 4px rgba(255, 122, 0, 0.1);
  }

  /* Pay Button */
  .pay-button {
    background: #FF7A00 !important;
    border: none !important;
    padding: 14px;
    font-weight: 700;
    border-radius: 12px;
    font-size: 1.1rem;
    margin-top: 20px;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .pay-button:hover:not(:disabled) {
    background: #E66E00 !important;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 122, 0, 0.3);
  }

  .pay-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .secure-text {
    text-align: center;
    font-size: 0.8rem;
    color: #888;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .form-label {
    font-weight: 600;
    margin-bottom: 8px;
    color: #444;
  }
`;

  return (
    <Fragment>
      <style>{styles}</style>
      <div className="checkout-container">
        <Container>
          <Card className="payment-card">
            <div className="payment-header text-center">
              <h5
                className="text-uppercase mb-1"
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "2px",
                  opacity: 0.9,
                }}
              >
                Amount to Pay
              </h5>
              <div className="price-badge">
                ₹{orderInfo && orderInfo.totalPrice}
              </div>
            </div>

            <Card.Body className="p-4 p-md-5">
              <div className="checkout-form">
                <div className="d-flex align-items-center mb-4">
                  <h6 className="mb-0 fw-bold">Payment Details</h6>
                  <div className="ms-auto">
                    <i className="fab fa-cc-visa text-muted me-2 fs-4"></i>
                    <i className="fab fa-cc-mastercard text-muted fs-4"></i>
                  </div>
                </div>

                <form onSubmit={submitHandler}>
                  <div className="mb-4">
                    <label className="form-label">Card Number</label>
                    <div className="stripe-element-container">
                      <CardNumberElement
                        options={{
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#333",
                              "::placeholder": { color: "#aab7c4" },
                            },
                          },
                        }}
                      />
                    </div>
                  </div>

                  <Row className="g-3 mb-4">
                    <Col xs={6}>
                      <label className="form-label">Expiry Date</label>
                      <div className="stripe-element-container">
                        <CardExpiryElement
                          options={{ style: { base: { fontSize: "16px" } } }}
                        />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <label className="form-label">CVC / CVV</label>
                      <div className="stripe-element-container">
                        <CardCvcElement
                          options={{ style: { base: { fontSize: "16px" } } }}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Button
                    type="submit"
                    id="pay-btn"
                    className="pay-button w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>
                        <i className="fa fa-spinner fa-spin me-2"></i>
                        Processing...
                      </span>
                    ) : (
                      `Securely Pay ₹${orderInfo && orderInfo.totalPrice}`
                    )}
                  </Button>

                  <div className="secure-text">
                    <i className="fa fa-lock text-success"></i>
                    <span>Verified 256-bit SSL Encrypted Payment</span>
                  </div>
                </form>
              </div>
            </Card.Body>
          </Card>

          <div className="text-center mt-4 text-muted small">
            <p>By clicking pay, you agree to our Terms of Service</p>
          </div>
        </Container>
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

