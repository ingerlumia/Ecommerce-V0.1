import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const styles = `
  .profile-bg {
    background: linear-gradient(-45deg, #ffffff, #f0f0f0, #fff5eb, #ffffff);
    background-size: 400% 400%;
    animation: meshGradient 15s ease infinite;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .profile-glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(15px) saturate(180%);
    -webkit-backdrop-filter: blur(15px) saturate(180%);
    border-radius: 28px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    padding: 40px;
    transition: transform 0.3s ease;
  }

  .profile-avatar-large {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 5px solid #fff;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    margin-bottom: 20px;
  }

  .profile-name {
    font-weight: 800;
    color: #222;
    margin-bottom: 5px;
  }

  .profile-info-row {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 12px;
    padding: 12px 20px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .info-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 700;
    color: #888;
  }

  .info-value {
    font-weight: 600;
    color: #333;
  }

  .btn-group-custom {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 30px;
  }

  .btn-orange-outline {
    border: 2px solid #FF7A00;
    color: #FF7A00;
    font-weight: 700;
    padding: 10px;
    border-radius: 12px;
    transition: 0.3s;
    text-decoration: none;
    text-align: center;
  }

  .btn-orange-outline:hover {
    background: #FF7A00;
    color: white;
  }

  .btn-orange-solid {
    background: #FF7A00;
    color: white;
    font-weight: 700;
    padding: 12px;
    border-radius: 12px;
    text-decoration: none;
    text-align: center;
    border: none;
  }

  .btn-danger-soft {
    background: rgba(220, 53, 69, 0.1);
    color: #dc3545;
    font-weight: 700;
    padding: 10px;
    border-radius: 12px;
    text-decoration: none;
    text-align: center;
    border: none;
  }
`;

export default function Profile() {
    const { user } = useSelector(state => state.authState);

    return (
        <div className="profile-bg">
            <style>{styles}</style>
            <div className="profile-glass-card text-center">
                {/* Avatar Display */}
                <img 
                    src={user.avatar} 
                    className="profile-avatar-large mx-auto" 
                    alt="User Avatar" 
                />
                
                <h2 className="profile-name">{user.name}</h2>
                <p className="text-muted small mb-4">Member Since: {String(user.createdAt).substring(0, 10)}</p>

                {/* Info Rows */}
                <div className="profile-info-row">
                    <span className="info-label">Email</span>
                    <span className="info-value">{user.email}</span>
                </div>
                
                <div className="profile-info-row">
                    <span className="info-label">Contact</span>
                    <span className="info-value">{user.contact || 'Not Provided'}</span>
                </div>

                {/* Navigation Actions */}
                <div className="btn-group-custom">
                    <Link to={'/UpdateProfile'} className="btn-orange-solid shadow-sm">
                        Edit Profile Details
                    </Link>
                    
                    <Link to={'/order/userorders'} className="btn-orange-outline">
                        View My Orders
                    </Link>
                    
                    <Link to={'/changepassword'} className="btn-danger-soft">
                        Change Security Password
                    </Link>
                </div>
            </div>
        </div>
    );
}