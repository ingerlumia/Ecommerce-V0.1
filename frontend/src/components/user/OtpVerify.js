import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearAuthError, otpVerify } from "../../actions/userAction";
import Loader from "../layouts/Loader";

export default function OtpVerify(){

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
    },[error, isAuthenticated] );

    return (
    <Fragment>
    {loading?<Loader/>: <Fragment>
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Enter the OTP</label>
                    <input type="number" name="otp_box" onChange={e => setOtp(e.target.value.trim())} />
                
                    <button name="verify">Verify</button>
                </div>
            </form>
        </div>
        </Fragment>
    }
    </Fragment>
    )
}