import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthError,
  resetPassword as resetPasswordAction,
} from "../../actions/userAction";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const styles = `
  .reset-wrapper {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.5s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  .reset-card {
    background: #ffffff;
    padding: 45px;
    border-radius: 20px;
    border: 1px solid #eeeeee;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 420px;
  }

  .reset-header {
    font-weight: 800;
    color: #1a1a1a;
    letter-spacing: -1px;
    margin-bottom: 10px;
  }

  .field-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #555;
    margin-bottom: 8px;
    display: block;
  }

  .modern-input {
    border: 2px solid #f0f0f0;
    border-radius: 12px;
    padding: 14px 16px;
    font-size: 0.95rem;
    background-color: #f9f9f9;
    transition: all 0.3s ease;
  }

  .modern-input:focus {
    border-color: #FF7A00;
    background-color: #ffffff;
    box-shadow: 0 0 0 4px rgba(255, 122, 0, 0.1);
    outline: none;
  }

  .btn-reset-final {
    background: #FF7A00;
    color: white;
    border: none;
    font-weight: 700;
    padding: 16px;
    border-radius: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    width: 100%;
    margin-top: 15px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .btn-reset-final:hover {
    background: #000;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  .security-icon {
    font-size: 2.5rem;
    color: #FF7A00;
    margin-bottom: 20px;
  }
`;

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.authState,
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmpassword", confirmPassword);

    dispatch(resetPasswordAction(formData, token));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast("Password Changed Sucessfuly!", {
        type: "success",
      });
      navigate("/");
      return;
    }

    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
  }, [isAuthenticated, dispatch, error, navigate]);

  return (
    <div className="reset-wrapper container">
      <style>{styles}</style>
      <div className="reset-card text-center">
        <div className="security-icon">
          <i className="fas fa-key-skeleton"></i>
        </div>
        <h3 className="reset-header">Set New Password</h3>
        <p className="text-muted small mb-4">
          Almost done! Choose a strong password to secure your Cypers account.
        </p>

        <form onSubmit={submitHandler} className="text-start">
          <div className="mb-4">
            <label htmlFor="password" className="field-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control modern-input"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="field-label">
              Confirm New Password
            </label>
            <input
              type="password"
              className="form-control modern-input"
              id="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat your password"
            />
          </div>

          <button type="submit" className="btn-reset-final">
            Complete Reset
          </button>
        </form>
      </div>
    </div>
  );
}
