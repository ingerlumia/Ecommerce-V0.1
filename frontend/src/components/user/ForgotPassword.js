import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, forgotPassword as forgotPasswordAction } from "../../actions/userAction";
import { toast } from "react-toastify";

const styles = `
  @keyframes formEntrance {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .forgot-password-container {
    animation: formEntrance 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    background: #ffffff;
    padding: 40px;
    border-radius: 16px;
    border: 1px solid #f0f0f0;
    box-shadow: 0 20px 40px rgba(0,0,0,0.05);
    margin-top: 100px;
  }

  .forgot-title {
    font-weight: 900;
    letter-spacing: -1px;
    color: #1a1a1a;
    font-size: 1.75rem;
  }

  .minimal-label {
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #666;
    margin-bottom: 10px;
  }

  .minimal-input {
    border: 2px solid #eee;
    border-radius: 10px;
    padding: 14px;
    transition: all 0.3s ease;
    background: #fafafa;
  }

  .minimal-input:focus {
    border-color: #FF7A00;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(255, 122, 0, 0.1);
    outline: none;
  }

  .btn-bold-orange {
    background: #FF7A00;
    color: white;
    border: none;
    font-weight: 800;
    padding: 15px;
    border-radius: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    margin-top: 10px;
  }

  .btn-bold-orange:hover {
    background: #000; /* Contrast shift to black on hover for a pro look */
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  .back-to-login {
    display: block;
    text-align: center;
    margin-top: 20px;
    color: #888;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: 0.2s;
  }

  .back-to-login:hover {
    color: #FF7A00;
  }
`;

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
  <div className="container d-flex justify-content-center">
    <style>{styles}</style>
    <div className="forgot-password-container" style={{ maxWidth: '420px', width: '100%' }}>
      <h3 className="forgot-title mb-2 text-center">Forgot Password</h3>
      <p className="text-center text-muted mb-4 small">
        Enter your email and we'll send you a secure link to reset your password.
      </p>
      
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="email" className="minimal-label">Email Address</label>
          <input
            type="email"
            className="form-control minimal-input"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
          />
        </div>
        
        <button type="submit" className="btn-bold-orange w-100">
          Send Reset Link
        </button>

        <a href="/login" className="back-to-login">
          <i className="fas fa-arrow-left me-2"></i>Back to Login
        </a>
      </form>
    </div>
  </div>
);
}