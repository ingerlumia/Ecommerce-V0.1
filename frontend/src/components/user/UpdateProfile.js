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

  const size = {
    width: "50px",
  };

  return (
    <div className="container mt-4">
      <h3>Edit Profile</h3>
      <form onSubmit={submitHandler} className="mt-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Label</label>
          <input
            className="form-control"
            id="label"
            name="label"
            onChange={addressChange}
            placeholder="Street address, building, suite..."
            required
          />
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              onChange={addressChange}
              placeholder="City"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Country</label>
            <select
              className="form-select"
              id="country"
              onChange={addressChange}
              name="country"
              required
            >
              <option value="">Select country...</option>
              {countrylist.map((country, i) => (
                <option key={i} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <label className="form-label">States</label>
          <select
            className="form-select"
            id="states"
            onChange={addressChange}
            name="states"
            required
          >
            <option value="">Select State...</option>
            <option>tamil Nadu</option>
            <option>States2</option>
            <option>states3 </option>
          </select>
        </div>

        <div className="row g-3 mt-1">
          <div className="col-md-6">
            <label className="form-label">Postal / ZIP code</label>
            <input
              type="text"
              className="form-control"
              id="postalCode"
              name="postalCode"
              onChange={addressChange}
              placeholder="e.g. 560001"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              onChange={addressChange}
              placeholder="+91 98765 43210"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="avatar">Avatar</label>
          <img src={avatarpreview} style={size} />

          <input
            type="file"
            name="avatar"
            id="avatar"
            onChange={onChangeAvatar}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}
