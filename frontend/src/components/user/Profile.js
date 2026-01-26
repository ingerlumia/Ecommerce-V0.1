import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function Profile(){
    const {user} = useSelector(state => state.authState)
    return(
        <div className="card text-center" style={{ width: '30rem', }}>
        <img src={user.avatar} className="card-img-top rounded-circle mx-auto mt-3" alt="Avatar" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
        <Link to={'/UpdateProfile'}><Button variant="primary">Edit Profile</Button></Link>
        <div className="card-body">
          <h2 className="card-title">{user.name}</h2>
          <p className="card-text"><strong>Email:</strong> {user.email}</p>
          <p className="card-text"><strong>Contact:</strong> {user.contact}</p>
          <p className="card-text"><strong>Created At:</strong> {String(user.createdAt).substring(0,10)}</p>
          <Button variant="primary"><Link style={{color:'white',textDecoration:'none'}} to={'/order/userorders'}>My Orders</Link></Button>
          
        <Link to={'/changepassword'}><Button variant="danger">Change Password</Button></Link>
          
        </div>
      </div>
    )
}