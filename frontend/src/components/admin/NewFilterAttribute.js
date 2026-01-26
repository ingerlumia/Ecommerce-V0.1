import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { newCatagory } from "../../actions/featuresAction";
import { clearisCatagoryCreated } from "../../slices/featuresSlice";
import { clearError } from "../../slices/productsSlice";
import SideBar from "./SideBar";
import { Fragment } from "react";

export default function NewFilterAttribute() {
  const [categoryName, setCategoryName] = useState("");
  const [attributes, setAttributes] = useState([]);

  // Temp fields
  const [attrLabel, setAttrLabel] = useState("");
  const [attrKey, setAttrKey] = useState("");
  const [attrValues, setAttrValues] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCatagoryCreated, error } = useSelector((state) => state.featuresState);
  const { user } = useSelector(state => state.authState);

  const addAttribute = () => {
    if (!attrLabel || !attrKey || !attrValues) return;

    const newAttr = {
      key: attrKey,
      label: attrLabel,
      type: "select",
      values: attrValues.split(",").map((v) => v.trim()),
    };

    setAttributes([...attributes, newAttr]);

    setAttrLabel("");
    setAttrKey("");
    setAttrValues("");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const payload = {
      name: categoryName,
      attributes,
    };

    dispatch(newCatagory(payload));
  };


      useEffect(() => {

        if (isCatagoryCreated) {
            toast.success('New Catagory Created..!', {
                onOpen: () => dispatch(clearisCatagoryCreated())
            })
            navigate('/admin/view/category')
            return;
        }
        if (error) {
            toast.error(error, {
                onOpen: () => dispatch(clearError())
            })
            return;
        }

    }, [isCatagoryCreated, navigate, error, dispatch])

  return (
    <Fragment>
    <SideBar user={{role: user?.role}}/>
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <div className="card shadow border-0" style={{ borderRadius: "18px", background: "#F8F9FF" }}>
        <div className="card-header text-white" style={{ background: "#6C63FF", borderRadius: "18px 18px 0 0" }}>
          <h4 className="mb-0 fw-bold">Create New Category</h4>
        </div>

        <div className="card-body p-4">

          {/* Category Name */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Category Name</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Enter category name (e.g: Mobile Phone)"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              style={{ borderRadius: "10px", borderColor: "#6C63FF" }}
            />
          </div>

          <hr />
          <h5 className="fw-bold mb-3">Add Attribute</h5>

          <div className="mb-3">
            <input
              className="form-control mb-2"
              placeholder="Attribute Label (e.g: RAM)"
              value={attrLabel}
              onChange={(e) => setAttrLabel(e.target.value)}
            />

            <input
              className="form-control mb-2"
              placeholder="Attribute Key (e.g: ram)"
              value={attrKey}
              onChange={(e) => setAttrKey(e.target.value)}
            />

            <input
              className="form-control mb-2"
              placeholder="Values (comma separated) e.g: 4GB, 6GB, 8GB"
              value={attrValues}
              onChange={(e) => setAttrValues(e.target.value)}
            />

            <button
              className="btn w-100 text-white"
              style={{ background: "#6C63FF", borderRadius: "10px", padding: "10px", fontWeight: "600" }}
              onClick={addAttribute}
            >
              + Add Attribute
            </button>
          </div>

          <hr />

          <h5 className="fw-bold mb-3">Added Attributes</h5>

          <div className="p-3 border rounded" style={{ background: "#fff" }}>
            {attributes.length === 0 ? (
              <p className="text-muted m-0">No attributes added yet.</p>
            ) : (
              attributes.map((attr, index) => (
                <div key={index} className="mb-2">
                  <strong>{attr.label}:</strong> {attr.values.join(", ")}
                </div>
              ))
            )}
          </div>

          <button
            className="btn btn-success w-100 mt-4"
            onClick={submitHandler}
            style={{ borderRadius: "10px", padding: "10px", fontWeight: "600" }}
          >
            Create Category
          </button>
        </div>
      </div>
    </div>
    </Fragment>
  );
}
