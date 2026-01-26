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

    return (
        <Fragment>
            <MetaData title="Login" />
            {loading ? (
                <Loader />
            ) : (
                <div className="d-flex justify-content-center align-items-center min-vh-100">
                    <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
                        <h4 className="text-center mb-4">Login</h4>
                        <form onSubmit={submitHandler}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="form-control"
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
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setpassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 mb-2">
                                LOGIN
                            </button>
                            <div className="d-flex justify-content-between">
                                <Link to="/forgotpassword" className="small">Forgot Password?</Link>
                                <Link to="/register" className="small">Sign Up</Link>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Fragment>
    );




}

