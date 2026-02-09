import { Fragment } from "react";
import { Link } from "react-router-dom";


export default function CheckOutInfo({ step1, step2, step3 }) {
const styles = `
  .checkout-step-container {
    position: relative;
    z-index: 1;
  }

  /* Professional Step Styling */
  .step-pill {
    font-weight: 700;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    border: 1px solid #eee;
    text-decoration: none !important;
  }

  /* Active/Completed Step (Orange) */
  .step-active {
    background-color: #FF7A00 !important;
    color: white !important;
    border-color: #FF7A00 !important;
    box-shadow: 0 4px 12px rgba(255, 122, 0, 0.3);
  }

  .step-active a {
    color: white !important;
    text-decoration: none;
  }

  /* Inactive Step */
  .step-inactive {
    background-color: #f8f9fa !important;
    color: #aaa !important;
  }

  .step-inactive a, .disabled-cursor {
    color: #aaa !important;
    text-decoration: none;
    cursor: not-allowed;
  }

  /* Connecting Line Logic */
  .step-line {
    height: 3px;
    background: #eee;
    flex-grow: 1;
    margin: 0 10px;
    position: relative;
  }

  .line-active {
    background: #FF7A00;
  }

  /* Icon Animation for current step */
  @keyframes pulseStep {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .checkout-step-active {
    animation: pulseStep 2s infinite ease-in-out;
  }
`;

return (
    <Fragment>
        <style>{styles}</style>
        <div className="container my-5 checkout-step-container">
            <div className="d-flex align-items-center justify-content-between text-center">

                {/* Step 1: Shipping */}
                <div className={`flex-fill rounded-pill p-2 step-pill ${step1 ? "step-active checkout-step-active" : "step-inactive"}`}>
                    <Link to={'/shipping'}>
                        <i className="fa fa-truck me-2"></i>Shipping
                    </Link>
                </div>

                <div className={`step-line ${step2 ? "line-active" : ""}`}></div>

                {/* Step 2: Confirm */}
                <div className={`flex-fill rounded-pill p-2 step-pill ${step2 ? "step-active checkout-step-active" : "step-inactive"}`}>
                    {step2 ? (
                        <Link to={'/order/confirm'}>
                            <i className="fa fa-check-circle me-2"></i>Confirm
                        </Link>
                    ) : (
                        <span className="disabled-cursor"><i className="fa fa-check-circle me-2"></i>Confirm</span>
                    )}
                </div>

                <div className={`step-line ${step3 ? "line-active" : ""}`}></div>

                {/* Step 3: Payment */}
                <div className={`flex-fill rounded-pill p-2 step-pill ${step3 ? "step-active checkout-step-active" : "step-inactive"}`}>
                    {step3 ? (
                        <Link to={'/payment'}>
                            <i className="fa fa-credit-card me-2"></i>Payment
                        </Link>
                    ) : (
                        <span className="disabled-cursor"><i className="fa fa-credit-card me-2"></i>Payment</span>
                    )}
                </div>

            </div>
        </div>
    </Fragment>
);
}

