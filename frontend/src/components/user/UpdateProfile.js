import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, updateProfile } from "../../actions/userAction";
import { toast } from "react-toastify";
import { countries } from "countries-list";
import { clearupdateProfile } from "../../slices/authSlice";

export default function UpdateProfile() {
  const { error, user, isUpdated } = useSelector((state) => state.authState);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [avatar, setavatar] = useState("");
  const [avatarpreview, setavatarpreview] = useState("");
  const countrylist = Object.values(countries);
  const [address, setAddress] = useState({
    label: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    isDefault: true,
  });
  const addressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();

  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setavatarpreview(reader.result);
        // setavatar(e.target.files[0]);
        setavatar(e.target.files[0]);
        console.log("avatar : ", e.target.files[0]);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("addresses", JSON.stringify([address]));

    formdata.append("avatar", avatar);
    dispatch(updateProfile(formdata));
  };

  useEffect(() => {
    if (user) {
      setname(user.name);
      setemail(user.email);
      if (user.avatar) {
        setavatarpreview(user.avatar);
      }
    }
    if (isUpdated) {
      toast("profile Updated.", {
        type: "success",
        onOpen: () => dispatch(clearupdateProfile()),
      });
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
  }, [user, isUpdated, error, dispatch]);

const styles = `
  @keyframes meshGradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .edit-profile-bg {
    /* Animated mesh background instead of solid blue */
    background: linear-gradient(-45deg, #ffffff, #f0f0f0, #fff5eb, #ffffff);
    background-size: 400% 400%;
    animation: meshGradient 15s ease infinite;
    min-height: 100vh;
    padding: 80px 0;
    display: flex;
    align-items: center;
  }

  .glass-container {
    background: rgba(255, 255, 255, 0.7); /* Translucent white */
    backdrop-filter: blur(12px) saturate(180%); /* The Frosted Glass effect */
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
    padding: 50px;
    transition: transform 0.3s ease;
  }

  .profile-header {
    font-weight: 800;
    letter-spacing: -1px;
    color: #222;
    margin-bottom: 40px;
    position: relative;
  }

  .profile-header::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #FF7A00;
    margin-top: 10px;
    border-radius: 10px;
  }

  /* Large Avatar Section */
  .avatar-preview-wrapper {
    position: relative;
    width: 200px; 
    height: 200px;
    margin: 0 auto 30px auto;
  }

  .avatar-large {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 6px solid #fff;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .avatar-large:hover {
    transform: scale(1.05);
  }

  .upload-badge {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: #FF7A00;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    border: 4px solid #fff;
    transition: 0.3s;
  }

  .upload-badge:hover {
    background: #222;
    transform: rotate(15deg);
  }

  /* Form Inputs */
  .glass-input {
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    padding: 14px;
    font-weight: 500;
    transition: 0.3s;
  }

  .glass-input:focus {
    background: #fff;
    border-color: #FF7A00;
    box-shadow: 0 0 0 4px rgba(255, 122, 0, 0.1);
  }

  .save-btn {
    background: #FF7A00;
    color: white;
    border: none;
    padding: 16px;
    border-radius: 14px;
    font-weight: 700;
    width: 100%;
    margin-top: 20px;
    box-shadow: 0 10px 20px rgba(255, 122, 0, 0.2);
    transition: 0.3s;
  }

  .save-btn:hover {
    background: #e66e00;
    transform: translateY(-2px);
    box-shadow: 0 15px 25px rgba(255, 122, 0, 0.3);
  }

  label {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 6px;
    margin-left: 4px;
  }
`;

return (
  <div className="edit-profile-bg">
    <style>{styles}</style>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-8 col-lg-10 glass-container">
          
          <h2 className="profile-header">Edit Profile</h2>

          <form onSubmit={submitHandler}>
            
            {/* LARGE AVATAR PREVIEW */}
            <div className="avatar-preview-wrapper">
              <img 
                src={avatarpreview} 
                className="avatar-large" 
                alt="Avatar Preview" 
              />
              <label htmlFor="avatar" className="upload-badge">
                <i className="fa fa-camera"></i>
              </label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                className="d-none"
                onChange={onChangeAvatar}
              />
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  className="form-control glass-input"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Full Name"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control glass-input"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Email"
                />
              </div>

              <div className="col-12">
                <label>Street Address</label>
                <input
                  className="form-control glass-input"
                  id="label"
                  name="label"
                  onChange={addressChange}
                  placeholder="Address Line"
                  required
                />
              </div>

              <div className="col-md-4">
                <label>City</label>
                <input
                  type="text"
                  className="form-control glass-input"
                  id="city"
                  name="city"
                  onChange={addressChange}
                  placeholder="City"
                  required
                />
              </div>

              <div className="col-md-4">
                <label>State</label>
                <select
                  className="form-select glass-input"
                  id="states"
                  onChange={addressChange}
                  name="states"
                  required
                >
                  <option value="">Select State</option>
                  <option value="tamil nadu">Tamil Nadu</option>
                  <option value="other">Other States</option>
                </select>
              </div>

              <div className="col-md-4">
                <label>Country</label>
                <select
                  className="form-select glass-input"
                  id="country"
                  onChange={addressChange}
                  name="country"
                  required
                >
                  <option value="">Country</option>
                  {countrylist.map((country, i) => (
                    <option key={i} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label>Postal Code</label>
                <input
                  type="text"
                  className="form-control glass-input"
                  id="postalCode"
                  name="postalCode"
                  onChange={addressChange}
                  placeholder="Zip Code"
                  required
                />
              </div>

              <div className="col-md-6">
                <label>Phone</label>
                <input
                  type="tel"
                  className="form-control glass-input"
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={addressChange}
                  placeholder="Phone"
                  required
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-4 mx-auto">
                <button type="submit" className="save-btn">
                  SAVE CHANGES
                </button>
              </div>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  </div>
);
}
