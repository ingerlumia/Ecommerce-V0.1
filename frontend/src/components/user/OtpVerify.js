import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearAuthError, otpVerify } from "../../actions/userAction";
import Loader from "../layouts/Loader";
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
export default function OtpVerify(){

const styles = `
  .otp-wrapper {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
  }
  .otp-card {
    border: none;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
    background: #ffffff;
    padding: 40px;
    text-align: center;
  }
  .otp-icon {
    font-size: 3rem;
    color: #FF7A00;
    margin-bottom: 20px;
  }
  .otp-input {
    letter-spacing: 8px;
    font-size: 1.5rem;
    text-align: center;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    margin-bottom: 25px;
    transition: all 0.3s ease;
  }
  .otp-input:focus {
    border-color: #FF7A00;
    box-shadow: 0 0 0 0.25rem rgba(255, 122, 0, 0.15);
  }
  .btn-verify {
    background-color: #FF7A00;
    border: none;
    padding: 12px 40px;
    font-weight: 600;
    border-radius: 10px;
    width: 100%;
    transition: background 0.3s ease, transform 0.2s ease;
  }
  .btn-verify:hover {
    background-color: #E66E00;
    transform: translateY(-2px);
  }
  .resend-text {
    margin-top: 20px;
    font-size: 0.9rem;
    color: #6c757d;
  }
`;

    const [ otp, setOtp ] = useState(null);
    const {loading, error, isAuthenticated} = useSelector(state => state.authState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(otpVerify(otp));
    }

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/')
        }
        if(error){
            toast(
                error,{
                    type: 'error',
                    onOpen: ()=>{dispatch(clearAuthError)}
                }
            )
        }      
        return;
    },[error, isAuthenticated, dispatch] );

   return (
  <Fragment>
    <style>{styles}</style>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <div className="otp-wrapper">
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} sm={8} md={6} lg={4}>
                <Card className="otp-card">
                  <div className="otp-icon">
                    <i className="bi bi-shield-lock-fill"></i>
                  </div>
                  <h3 className="mb-2" style={{ fontWeight: '700' }}>Verify OTP</h3>
                  <p className="text-muted mb-4">Please enter the code sent to your device</p>
                  
                  <Form onSubmit={submitHandler}>
                    <Form.Group>
                      <Form.Label className="visually-hidden">Enter the OTP</Form.Label>
                      <Form.Control
                        type="number"
                        name="otp_box"
                        className="otp-input"
                        placeholder="000000"
                        onChange={(e) => setOtp(e.target.value.trim())}
                        required
                      />
                    </Form.Group>

                    <Button 
                      type="submit" 
                      name="verify" 
                      className="btn-verify"
                    >
                      Verify Account
                    </Button>
                  </Form>

                  <div className="resend-text">
                    Didn't receive a code? <a href="#!" style={{ color: '#FF7A00', textDecoration: 'none', fontWeight: '600' }}>Resend</a>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Fragment>
    )}
  </Fragment>
);
}