import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCatagory } from "../../actions/featuresAction";
import SideBar from "./SideBar";

export default function ViewCatagory() {
  const { catagory = [] } = useSelector((state) => state.featuresState);
  const { user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatagory());
  }, [dispatch]);

  const styles = `
  .category-section {
    animation: slideUp 0.6s ease-out;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .cat-card-modern {
    background: #ffffff;
    border: 1px solid #f0f0f0;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 35px;
    transition: box-shadow 0.3s ease;
  }

  .cat-card-modern:hover {
    box-shadow: 0 15px 40px rgba(0,0,0,0.06);
  }

  .cat-banner {
    background: #111111; /* Matching the Obsidian Sidebar */
    padding: 15px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .cat-title {
    color: #FF7A00; /* Signature Orange */
    font-weight: 800;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin: 0;
  }

  .cat-body {
    padding: 30px;
    background: #fafafa;
  }

  .attr-label {
    font-size: 0.75rem;
    font-weight: 700;
    color: #666;
    text-transform: uppercase;
    margin-bottom: 8px;
    display: block;
  }

  .attr-select {
    border: 2px solid #eee;
    border-radius: 12px;
    padding: 10px 15px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
    transition: all 0.3s ease;
    cursor: pointer;
    background-color: #fff;
  }

  .attr-select:focus {
    border-color: #FF7A00;
    box-shadow: 0 0 0 4px rgba(255, 122, 0, 0.1);
    outline: none;
  }

  .cat-count-badge {
    background: rgba(255, 122, 0, 0.1);
    color: #FF7A00;
    font-size: 0.7rem;
    padding: 4px 12px;
    border-radius: 50px;
    font-weight: 700;
  }
`;

return (
  <Fragment>
    <style>{styles}</style>
    <SideBar user={{ role: user?.role }} />

    <div className="container mt-5 category-section">
      <div className="d-flex align-items-center mb-5">
        <div style={{ width: '40px', height: '4px', background: '#FF7A00', marginRight: '15px', borderRadius: '10px' }}></div>
        <h2 className="fw-900 mb-0" style={{ letterSpacing: '-1px' }}>Category Management</h2>
      </div>

      {catagory.map((cat) => (
        <div className="cat-card-modern" key={cat._id}>
          <div className="cat-banner">
            <h5 className="cat-title">{cat.name}</h5>
            <span className="cat-count-badge">
              {cat.attributes.length} Attributes
            </span>
          </div>

          <div className="cat-body">
            <div className="row g-4">
              {cat.attributes.map((attr) => (
                <div className="col-md-4 col-sm-6" key={attr._id}>
                  <label className="attr-label">
                    <i className="fas fa-sliders-h me-2" style={{ color: '#FF7A00' }}></i>
                    {attr.label}
                  </label>

                  <select className="form-select attr-select shadow-sm">
                    {attr.values.map((val, index) => (
                      <option key={index} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </Fragment>
);
}
