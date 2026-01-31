import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError, clearUpdatedProduct } from "../../slices/productsSlice";
import { getUser } from "../../actions/userAction";
import { getProduct, updateProductStatus } from "../../actions/productsActions";

export default function ManagerUpdateProduct() {
  const [status, setStatus] = useState("");

  const {
    isProductUpdated,
    loading,
    error,
    product = {},
  } = useSelector((state) => state.productsState);
  const { user = {} } = useSelector((state) => state.userState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: productId } = useParams();
  let sellerid = product?.seller?.id;
  let sellerEmail = user?.email;
  let sellerName = product?.seller?.name;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProductStatus(productId, status, sellerEmail, sellerName));
  };
  useEffect(() => {
    if (sellerid) {
      dispatch(getUser(sellerid));
    }
  }, [sellerid, dispatch]);
  useEffect(() => {
    if (isProductUpdated) {
      toast.success("Product Updated Sucessfuly", {
        onOpen: () => dispatch(clearUpdatedProduct()),
      });
      navigate("/product/productlist");
      return;
    }
    if (error) {
      toast.error(error, {
        onOpen: () => dispatch(clearError()),
      });
      return;
    }
    dispatch(getProduct(productId));
  }, [isProductUpdated, productId, error, navigate, dispatch]);

  return (
    <div className="container my-4 d-flex justify-content-center">
      <div className="card shadow-sm border rounded w-75">
        <div className="card-body">
          <h4 className="card-title mb-4 text-center">Update Product</h4>

          <form onSubmit={submitHandler}>
            {/* Product details box */}
            <div className="border rounded p-4 bg-light justify-content-between">
              {/* Key-Value Rows */}
              <div className="mb-2 d-flex ">
                <span className="fw-bold">Product Name:</span>
                <span>{product?.name}</span>
              </div>

              <div className="mb-2 d-flex ">
                <span className="fw-bold">Description:</span>
                <span>{product?.description}</span>
              </div>

              <div className="mb-2 d-flex ">
                <h4 className="text-primary">
                  Price: ₹{product?.pricing?.basePrice}
                </h4>
                <h6 className="text-muted">
                  MRP:
                  <span className="text-decoration-line-through">
                    ₹{product?.pricing?.mrp}
                  </span>
                </h6>
              </div>

              <div className="mb-2 d-flex">
                <span className="fw-bold">Category:</span>
                <span>{product?.category}</span>
              </div>

              <div className="mb-2 d-flex ">
                <span className="fw-bold">Seller:</span>
                <span>{product?.seller?.name}</span>
              </div>
              <div className="mb-2 d-flex ">
                <span className="fw-bold">Seller Email:</span>
                <span>{sellerEmail}</span>
              </div>

              <div className="mb-2 d-flex">
                <span className="fw-bold">Stock:</span>
                <span>{product?.stock}</span>
              </div>

              <div className="mb-3">
                <span className="fw-bold">Images:</span>
                <div className="d-flex gap-2 flex-wrap mt-2 ">
                  {product?.images?.map((img, idx) => (
                    <img
                      key={idx}
                      src={`${img.image}`}
                      alt="Product"
                      height="60"
                      width="70"
                      className="border rounded"
                    />
                  ))}
                </div>
              </div>

              {/* Editable field: Product Status */}
              <div className="mb-3 d-flex  align-items-center">
                <span className="fw-bold">Product Status:</span>
                <div className="d-flex align-items-center gap-3">
                  <select
                    className="form-select w-auto"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {" "}
                    <option value="">-- Select Status --</option>
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <small className="text-muted">
                    Current: {product?.status}
                  </small>
                </div>
              </div>
            </div>

            <div className="text-end mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
