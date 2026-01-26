import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { changePassword as changePasswordAction, clearAuthError } from "../../actions/userAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isUpdated } = useSelector(state => state.authState);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    
    const submitHandler = (e) => {
        e.preventDefault();
        const formdata = new FormData;
        formdata.append('oldpassword', currentPassword);
        formdata.append('password', newPassword);
        formdata.append('confirmpassword', confirmPassword);
        dispatch(changePasswordAction(formdata));
    }
    useEffect(()=>{
        if (isUpdated) {
            toast('Password Changed.', {
              type: 'success'
            })
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            navigate('/Profile')
            return;
          }

          if (error) {
            toast(error,{
              type: 'error',
              onOpen: ()=> {dispatch(clearAuthError)}
            })
            return
          }
    },[isUpdated,error, dispatch]);


    return (
        <form className="container mt-4" onSubmit={submitHandler}>
            <h3 className="mb-3">Change Password</h3>

            <div className="mb-3">
                <label className="form-label">Current Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">New Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Confirm New Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary">Update Password</button>
        </form>
    )
}