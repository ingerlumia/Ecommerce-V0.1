import { Fragment, useEffect } from 'react';
import MetaData from '../layouts/MetaData';
import { useState } from 'react';
import { clearAuthError, login } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../layouts/Loader';


export default function Login() {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const { loading, error, isAuthenticated } = useSelector(state => state.authState);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const redirect = location.search?'/'+location.search.split('=')[1]:'/';

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }
    
    useEffect(()=>{
        if(isAuthenticated){
            navigate(redirect)
        }

        if(error){
            toast(
                error,{
                    type: 'error',
                    onOpen: ()=> {dispatch(clearAuthError)}
                }
            )
        }
        return;
    },[ error, isAuthenticated,dispatch,navigate ]);

   const styles = `
  .auth-wrapper {
    background: #f4f7f6;
    min-vh: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .auth-card {
    border: none;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 10px 25px rgba(0,0,0,0.06);
    padding: 40px;
    width: 100%;
    max-width: 400px;
  }
  .auth-title {
    font-weight: 800;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
  }
  .auth-form-control {
    background: #f9f9f9;
    border: 1px solid #eee;
    padding: 12px;
    border-radius: 8px;
    transition: 0.3s;
  }
  .auth-form-control:focus {
    background: #fff;
    border-color: #FF7A00;
    box-shadow: 0 0 0 0.2rem rgba(255, 122, 0, 0.1);
    outline: none;
  }
  .btn-auth {
    background: #FF7A00;
    border: none;
    color: white;
    font-weight: 700;
    padding: 12px;
    border-radius: 8px;
    width: 100%;
    margin-top: 10px;
    transition: 0.3s;
  }
  .btn-auth:hover {
    background: #e66e00;
    transform: translateY(-1px);
  }
  .auth-links {
    font-size: 0.85rem;
    font-weight: 600;
    color: #FF7A00;
    text-decoration: none;
  }
  .auth-links:hover {
    text-decoration: underline;
  }
`;

return (
    <Fragment>
        <style>{styles}</style>
        <MetaData title="Login" />
        {loading ? (
            <Loader />
        ) : (
            <div className="auth-wrapper min-vh-100">
                <div className="auth-card">
                    <h4 className="auth-title">Login</h4>
                    <form onSubmit={submitHandler}>
                        <div className="mb-3">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="auth-form-control form-control"
                                placeholder="Username or Email"
                                value={email}
                                onChange={e => setemail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="auth-form-control form-control"
                                placeholder="Password"
                                value={password}
                                onChange={e => setpassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-auth mb-3">
                            LOGIN
                        </button>
                        <div className="d-flex justify-content-between">
                            <Link to="/forgotpassword" size="small" className="auth-links">Forgot Password?</Link>
                            <Link to="/register" size="small" className="auth-links">Sign Up</Link>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </Fragment>
);




}

