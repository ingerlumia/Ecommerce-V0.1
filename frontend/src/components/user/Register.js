import React, { Fragment, useState } from "react";
import { register } from "../../actions/userAction";

import { useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { countries } from "countries-list";
import { clearAuthError } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layouts/Loader";

export default function Register() {
  const { loading, error, isAuthenticated, isRegistered } = useSelector(
    (state) => state.authState,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countrylist = Object.values(countries);
  //const [email, setemail] = useState("");
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    addresses: [
      {
        label: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
      },
    ],
  });
  const [avatar, setavatar] = useState("");
  const [avatarPreview, setavatarPreview] = useState("/logo512.png");

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatarPreview(reader.result);
          setavatar(e.target.files[0]);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setuserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", userData.name);
    formdata.append("email", userData.email);
    formdata.append("contact", userData.contact);
    formdata.append("password", userData.password);
    formdata.append("addresses", JSON.stringify(userData.addresses));
    formdata.append("avatar", avatar);
    dispatch(register(formdata));
  };

  useEffect(() => {
    if (isRegistered) {
      navigate("/OtpVerify");
    }

    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
    }
    return;
  }, [error, isAuthenticated, isRegistered, dispatch, navigate]);

  const size = {
    width: "50px",
  };

  return (
    <Fragment>
      <MetaData title={"Register"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <form onSubmit={submitHandler}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Register
            </h2>

            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={onChange}
              placeholder="Your full name"
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={onChange}
              placeholder="you@example.com"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={onChange}
              placeholder="Minimum 6 characters"
              required
            />

            <label htmlFor="avatar">Avatar</label>
            <img src={avatarPreview} alt="avatar_image" style={size} />

            <input type="file" name="avatar" id="avatar" onChange={onChange} />

            <label htmlFor="contact">Contact Number</label>
            <input
              type="tel"
              name="contact"
              id="contact"
              onChange={onChange}
              placeholder="+123 456 7890"
              required
            />
            <div className="mb-3">
              <label className="form-label">Label</label>
              <input
                className="form-control"
                id="address"
                name="address"
                onChange={onChange}
                placeholder="Street address, building, suite..."
                required
              />
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  onChange={onChange}
                  placeholder="City"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Country</label>
                <select
                  className="form-select"
                  id="country"
                  onChange={onChange}
                  name="country"
                  required
                >
                  <option value="">Select country...</option>
                  {countrylist.map((country, i) => (
                    <option key={i} value={country.name}>
                      {country.name}
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
                onChange={onChange}
                name="states"
                required
              >
                <option value="">Select State...</option>
                <option>tamil Nadu</option>
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
                  onChange={onChange}
                  name="postal"
                  placeholder="e.g. 560001"
                  required
                />
              </div>
              
            </div>

            <button
              type="submit"
              disabled={loading}
              aria-label="Submit Registration Form"
            >
              Register
            </button>
            <Link to={"/regiser"}> </Link>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
}
