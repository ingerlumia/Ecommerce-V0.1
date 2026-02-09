import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { changePassword as changePasswordAction, clearAuthError } from "../../actions/userAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const styles = `
  .password-card {
    max-width: 450px;
    margin: 80px auto;
    background: #ffffff;
    padding: 40px;
    border-radius: 20px;
    border: 1px solid #f0f0f0;
    box-shadow: 0 15px 35px rgba(0,0,0,0.05);
    animation: slideUpFade 0.5s ease-out;
  }

  @keyframes slideUpFade {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .form-title {
    font-weight: 800;
    color: #222;
    letter-spacing: -0.5px;
    margin-bottom: 30px;
  }

  .secure-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: #777;
    margin-bottom: 8px;
    display: block;
  }

  .secure-input {
    border: 2px solid #eee;
    border-radius: 12px;
    padding: 12px 16px;
    background: #fdfdfd;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .secure-input:focus {
    border-color: #FF7A00;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(255, 122, 0, 0.1);
    outline: none;
  }

  .btn-secure-update {
    background: #FF7A00;
    color: white;
    border: none;
    font-weight: 700;
    padding: 14px;
    border-radius: 12px;
    width: 100%;
    margin-top: 15px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .btn-secure-update:hover {
    background: #222;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  .security-tip {
    font-size: 0.8rem;
    color: #999;
    margin-top: 20px;
    text-align: center;
  }
`;

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
    },[isUpdated,error, navigate,dispatch]);

return (
    <div className="container">
        <style>{styles}</style>
        <div className="password-card">
            <h3 className="form-title text-center">Security Settings</h3>
            
            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label className="secure-label">Current Password</label>
                    <input
                        type="password"
                        className="form-control secure-input"
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="secure-label">New Password</label>
                    <input
                        type="password"
                        className="form-control secure-input"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="secure-label">Confirm New Password</label>
                    <input
                        type="password"
                        className="form-control secure-input"
                        placeholder="Repeat new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn-secure-update">
                    <i className="fas fa-shield-alt"></i>
                    Update Password
                </button>

                <p className="security-tip">
                    <i className="fas fa-info-circle me-1"></i>
                    Make sure your new password is at least 8 characters long.
                </p>
            </form>
        </div>
    </div>
);
}