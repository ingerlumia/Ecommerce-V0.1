import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, resetPassword as resetPasswordAction} from "../../actions/userAction";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const {loading, isAuthenticated, error} = useSelector(state => state.authState);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('password',password );
        formData.append('confirmpassword',confirmPassword );

        dispatch(resetPasswordAction(formData,token))
    }

    useEffect(()=>{
        if(isAuthenticated){
            toast('Password Changed Sucessfuly!',{
                type: 'success'
            });
            navigate('/');
            return;
        }

        if(error){
            toast(error,{
                type: 'error',
                onOpen: ()=> {dispatch(clearAuthError)}
            })
            return;
        }

    },[ isAuthenticated, dispatch, error, navigate])

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="mb-4 text-center">Reset Password</h3>
      
      

      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Reset Password</button>
      </form>
    </div>
    )
}