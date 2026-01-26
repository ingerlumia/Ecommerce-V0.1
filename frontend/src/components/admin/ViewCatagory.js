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

  return (
    <Fragment>
      <SideBar user={{ role: user?.role }} />

      <div className="container mt-5">
        <h2 className="text-center fw-bold mb-5">Category Attributes</h2>

        {catagory.map((cat) => (
          <div
            className="card shadow-sm border-0 mb-4"
            style={{ borderRadius: "15px" }}
            key={cat._id}
          >
            <div
              className="card-header"
              style={{
                background: "#6C63FF",
                color: "white",
                borderRadius: "15px 15px 0 0",
              }}
            >
              <h5 className="mb-0 text-white fw-semibold">{cat.name}</h5>
            </div>

            <div className="card-body" style={{ background: "#F7F7FF" }}>
              <div className="row">
                {cat.attributes.map((attr) => (
                  <div className="col-md-4 col-sm-6 mb-3" key={attr._id}>
                    <label className="form-label fw-semibold">
                      {attr.label}
                    </label>

                    <select
                      className="form-select shadow-sm"
                      style={{
                        borderRadius: "10px",
                        borderColor: "#6C63FF",
                        padding: "8px 12px",
                      }}
                    >
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
