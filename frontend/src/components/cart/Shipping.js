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

  return shippingInfo ? (
    <Fragment>
      <CheckOutInfo step1 />
      <div className="container">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="mb-4">Contact / Address</h4>
            <form id="addressForm" onSubmit={submitHandler}>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address, building, suite..."
                  required
                ></textarea>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    required
                  />
                </div>
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
                    {countrylist.map((country, i) => (
                      
                      <option value={'IN'}>
                        IN
                      </option>
                    ))}
                  </select>
                </div>
                
              </div>
              <div className="col-md-6">
                <label className="form-label">States</label>
                <select
                  className="form-select"
                  id="states"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  name="states"
                  required
                >
                  <option value="">Select State...</option>
                  <option value="tamilnadu">tamil Nadu</option>
                  <option>States2</option>
                  <option>states3 </option>
                </select>
              </div>

              <div className="row g-3 mt-1">
                <div className="col-md-6">
                  <label className="form-label">Postal / ZIP code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="postal"
                    value={posetelCode}
                    onChange={(e) => setPosetelCode(e.target.value)}
                    name="postal"
                    placeholder="e.g. 560001"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              <div className="mt-4 text-end">
                <button type="submit" className="btn btn-primary">
                  {" "}
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  ) : (
    <Loader></Loader>
  );
}

