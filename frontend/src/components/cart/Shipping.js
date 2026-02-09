import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "countries-list";
import { saveShippingInfo } from "../../slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import CheckOutInfo from "../../pages/CheckOutInfo";
import Loader from "../../components/layouts/Loader";
import { Fragment } from "react";
import { toast } from "react-toastify";

export const ValidateShipping = (shippingInfo, navigate) => {
  if (
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.state ||
    !shippingInfo.country ||
    !shippingInfo.phoneNumber ||
    !shippingInfo.posetelCode
  ) {
    toast.error("Fill the Shipping information.");
    navigate("/shipping");
  }
};

export default function Shipping() {


  const { shippingInfo = {} } = useSelector((state) => state.cartState);
  const { shipping = {}, error } = useSelector((state) => state.websiteState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countrylist = Object.values(countries);

  const [city, setCity] = useState(shippingInfo?.city);
  const [state, setState] = useState(shippingInfo?.state);
  const [address, setAddress] = useState(shippingInfo?.address);
  const [country, setCountry] = useState(shippingInfo?.country);
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo?.phoneNumber);
  const [posetelCode, setPosetelCode] = useState(shippingInfo?.posetelCode);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        phoneNumber,
        posetelCode,
      }),
    );
    navigate("/order/confirm");
  };

  const styles = `
  .shipping-container {
    max-width: 800px;
    margin: 0 auto;
  }

  .shipping-card {
    border: none;
    border-radius: 15px;
    background: #fff;
    overflow: hidden;
  }

  .shipping-header {
    background: #FF7A00;
    color: white;
    padding: 15px 25px;
    font-weight: 700;
  }

  /* Professional Input Styling */
  .form-control:focus, .form-select:focus {
    border-color: #FF7A00;
    box-shadow: 0 0 0 0.25rem rgba(255, 122, 0, 0.15);
  }

  .form-label {
    font-weight: 600;
    color: #555;
    font-size: 0.9rem;
    margin-bottom: 6px;
  }

  /* Orange Submit Button */
  .btn-shipping {
    background-color: #FF7A00;
    border: none;
    padding: 10px 30px;
    font-weight: 700;
    border-radius: 8px;
    transition: all 0.3s ease;
    color: white;
  }

  .btn-shipping:hover {
    background-color: #E66E00;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 122, 0, 0.3);
    color: white;
  }

  textarea.form-control {
    min-height: 80px;
  }
`;

return shippingInfo ? (
  <Fragment>
    <style>{styles}</style>
    <CheckOutInfo step1 />
    
    <div className="container py-4 shipping-container">
      <div className="card shadow-sm shipping-card">
        <div className="shipping-header h5 mb-0">
          <i className="fa fa-map-marker-alt me-2"></i> Shipping Address
        </div>
        
        <div className="card-body p-4">
          <form id="addressForm" onSubmit={submitHandler}>
            
            {/* ADDRESS */}
            <div className="mb-3">
              <label className="form-label">Full Address</label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House No, Building, Street Name..."
                required
              ></textarea>
            </div>

            <div className="row g-3">
              {/* CITY */}
              <div className="col-md-6">
                <label className="form-label">City / Town</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city"
                  required
                />
              </div>

              {/* COUNTRY */}
              <div className="col-md-6">
                <label className="form-label">Country</label>
                <select
                  className="form-select"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  name="country"
                  required
                >
                  <option value="">Select country...</option>
                  {countrylist.map((c, i) => (
                    <option key={i} value={'IN'}>IN</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row g-3 mt-1">
              {/* STATE */}
              <div className="col-md-6">
                <label className="form-label">State</label>
                <select
                  className="form-select"
                  id="states"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  name="states"
                  required
                >
                  <option value="">Select State...</option>
                  <option value="tamilnadu">Tamil Nadu</option>
                  <option>State 2</option>
                  <option>State 3</option>
                </select>
              </div>

              {/* POSTAL */}
              <div className="col-md-6">
                <label className="form-label">Postal / ZIP code</label>
                <input
                  type="text"
                  className="form-control"
                  id="postal"
                  value={posetelCode}
                  onChange={(e) => setPosetelCode(e.target.value)}
                  name="postal"
                  placeholder="e.g. 600001"
                  required
                />
              </div>
            </div>

            <div className="row g-3 mt-1">
              {/* PHONE */}
              <div className="col-md-12">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 00000 00000"
                  required
                />
              </div>
            </div>

            <div className="mt-4 text-center">
              <button type="submit" className="btn btn-shipping w-100 py-3 text-uppercase">
                Continue to Confirm Order <i className="fa fa-arrow-right ms-2 small"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Fragment>
) : (
  <Loader />
);
}

