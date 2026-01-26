import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, forgotPassword as forgotPasswordAction } from "../../actions/userAction";
import { toast } from "react-toastify";

export default function ForgotPassword(){

    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { error, message} = useSelector(state => state.authState);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData;
        formData.append('email',email );
        dispatch(forgotPasswordAction(formData));
    };
    console.log('message',message)
    useEffect(()=>{
        if(message){
            toast(message,{type:'success'});
            setEmail('');
            return;
        }

        if(error){
            toast(error,{
                type:"error",
                onOpen:()=>{dispatch(clearAuthError)}
            })
            return;
        }

    },[message, error, dispatch])

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="mb-4 text-center">Forgot Password</h3>
      
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
      </form>
    </div>
    )
}