import { Fragment } from "react";
import { Link } from "react-router-dom";


export default function CheckOutInfo({ step1, step2, step3 }) {
    return <Fragment>
        <div className="container my-4">
            <div className="row text-center">

                {/* Step 1 */}
                <div className="col">
                    <div className={`p-2 rounded ${step1 ? "bg-primary text-white" : "bg-light"}`} >
                       <Link to={'/shipping'}>Shipping Info</Link>
                    </div>
                </div>

                <div className="col-auto d-flex align-items-center">
                    <div className="border-top w-100" style={{ minWidth: "50px" }}></div>
                </div>

                {/* Step 2 */}
                <div className="col">
                    <div className={`p-2 rounded ${step2 ? "bg-primary text-white" : "bg-light"}`} >
                        {step2?<Link to={'/order/confirm'}>Confirm Order</Link>:<a className="disabled-cursor " to={'#'}>Confirm Order</a>}
                    </div>
                </div>

                <div className="col-auto d-flex align-items-center">
                    <div className="border-top w-100" style={{ minWidth: "50px" }}></div>
                </div>

                {/* Step 3 */}

                <div className="col">
                    <div className={`p-2 rounded ${step3 ? "bg-primary text-white" : "bg-light"}`}>
                    {step3?<Link to={'/order/confirm'}>Payment Method</Link>:<a className="disabled-cursor " to={'#'}>Payment Method</a>}                        
                    </div>
                </div>

            </div>
        </div>
    </Fragment>
}

