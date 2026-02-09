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
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

export default function Register() {

  const styles = `
  .register-container { background-color: #f8f9fa; min-height: 100vh; padding: 40px 0; }
  .register-card { border: none; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
  .btn-primary-custom { 
    background-color: #FF7A00; 
    border: none; 
    padding: 12px; 
    font-weight: 600; 
    transition: all 0.3s ease;
  }
  .btn-primary-custom:hover { 
    background-color: #E66E00; 
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 122, 0, 0.3);
  }
  .form-control:focus, .form-select:focus {
    border-color: #FF7A00;
    box-shadow: 0 0 0 0.25rem rgba(255, 122, 0, 0.25);
  }
  .avatar-preview { border: 3px solid #FF7A00; border-radius: 50%; object-fit: cover; margin-bottom: 10px; }
  label { font-weight: 500; color: #444; margin-top: 10px; }
`;

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
    <style>{styles}</style>
    <MetaData title={"Register"} />
    {loading ? (
      <Loader />
    ) : (
      <div className="register-container">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="register-card p-4 p-md-5">
                <h2 className="text-center mb-4" style={{ color: "#333", fontWeight: "bold" }}>
                  Create Account
                </h2>

                <Form onSubmit={submitHandler}>
                  {/* Name Field */}
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      id="name"
                      onChange={onChange}
                      placeholder="Your full name"
                      required
                    />
                  </Form.Group>

                  {/* Email and Password Row */}
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="email">Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          id="email"
                          onChange={onChange}
                          placeholder="you@example.com"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          id="password"
                          onChange={onChange}
                          placeholder="Min. 6 characters"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Avatar Section */}
                  <div className="d-flex align-items-center gap-3 mb-4 mt-2">
                    <img 
                      src={avatarPreview} 
                      alt="avatar_image" 
                      className="avatar-preview" 
                      style={{ width: "60px", height: "60px" }} 
                    />
                    <div className="flex-grow-1">
                      <Form.Label htmlFor="avatar" className="m-0">Profile Picture</Form.Label>
                      <Form.Control 
                        type="file" 
                        name="avatar" 
                        id="avatar" 
                        onChange={onChange} 
                        size="sm"
                      />
                    </div>
                  </div>

                  {/* Contact Number */}
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="contact">Contact Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="contact"
                      id="contact"
                      onChange={onChange}
                      placeholder="+123 456 7890"
                      required
                    />
                  </Form.Group>

                  {/* Address */}
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="address">Address</Form.Label>
                    <Form.Control
                      id="address"
                      name="address"
                      onChange={onChange}
                      placeholder="Street address, building, suite..."
                      required
                    />
                  </Form.Group>

                  {/* City and Country */}
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        id="city"
                        name="city"
                        onChange={onChange}
                        placeholder="City"
                        required
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label>Country</Form.Label>
                      <Form.Select
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
                      </Form.Select>
                    </Col>
                  </Row>

                  {/* State and Postal */}
                  <Row className="g-3 mt-1 mb-4">
                    <Col md={6}>
                      <Form.Label>State</Form.Label>
                      <Form.Select
                        id="states"
                        onChange={onChange}
                        name="states"
                        required
                      >
                        <option value="">Select State...</option>
                        <option>Tamil Nadu</option>
                        <option>States2</option>
                        <option>States3</option>
                      </Form.Select>
                    </Col>
                    <Col md={6}>
                      <Form.Label>Postal / ZIP code</Form.Label>
                      <Form.Control
                        type="text"
                        id="postal"
                        onChange={onChange}
                        name="postal"
                        placeholder="e.g. 560001"
                        required
                      />
                    </Col>
                  </Row>

                  <Button
                    type="submit"
                    className="w-100 btn-primary-custom"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Register'}
                  </Button>
                  
                  <div className="text-center mt-3">
                    <small>Already have an account? <Link to="/login" style={{color: '#FF7A00', fontWeight: 'bold'}}>Login</Link></small>
                  </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )}
  </Fragment>
);
}
