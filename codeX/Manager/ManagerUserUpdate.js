import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { managerGetUser, managerUserUpdate } from "../../actions/managerAction";
import { clearError, managerclearUserUpdated } from "../../slices/managerSlice";
import ManagerSideBar from "./ManagerSideBar";


export default function ManagerUserUpdate() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    
    

    const {user = {}, isUserUpdated, loading = true, error } = useSelector(state => state.managerState);
    const {user:userauth} = useSelector(state => state.authState)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id:userId} = useParams();
    const [managerEmail, setManagerEmail] = useState(userauth.email);
    
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',name)
        formData.append('email',email)
        formData.append('role',role)
        formData.append('managerEmail',managerEmail)
        
        dispatch(managerUserUpdate(userId, formData));
        
    }
    
    useEffect(() => {
       
        if(isUserUpdated){
            toast.success('User Updated Sucessfuly',{
                onOpen: ()=> dispatch(managerclearUserUpdated())
            })
            navigate('/manager/userlist/')
            return;
        }
        if(error){
            toast.error(error,{
                onOpen: ()=> dispatch(clearError())
            })
            return;
        }
        dispatch(managerGetUser(userId))
       
    }, [isUserUpdated,,error,dispatch])

    useEffect(()=>{
        if(user._id){
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
    },[user])

    return (
        <div className="container-fluid">
          <div className="row vh-100">
            {/* Sidebar */}
            <aside className="col-12 col-md-3 col-lg-2 bg-light border-end p-3">
              <ManagerSideBar />
            </aside>
    
            {/* Main Content */}
            <main className="col-12 col-md-9 col-lg-10 d-flex align-items-center justify-content-center">
              <div className="card shadow-sm border-0 w-75">
                <div className="card-body">
                  <h4 className="card-title mb-3">User Details</h4>
    
                  <form onSubmit={submitHandler}>
                    {/* Name */}
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
    
                    {/* Email */}
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Manager Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={managerEmail}
                        onChange={(e) => setManagerEmail(e.target.value)}
                      />
                    </div>
    
                    {/* Role */}
                    <div className="mb-3">
                      <label className="form-label">Role</label>
                      <select
                        className="form-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="">-- Select Role --</option>
                        <option value="seller">Seller</option>
                        <option value="user">User</option>
                      </select>
                    </div>
    
                    <div className="text-end">
                      <button type="submit" className="btn btn-primary">
                        Save User
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </div>
      );
}
