import React, { useEffect, useState } from "react";
import {  FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProduct, updateProduct } from "../../actions/productsActions";
import { getCatagory } from "../../actions/featuresAction";
import { clearError, clearUpdatedProduct } from "../../slices/productsSlice";

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mrp, setMrp] = useState();
  const [basePrice, setBasePrice] = useState();
  const [images, setImages] = useState([]);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [seller, setSeller] = useState("");
  const [sellerID, setsellerID] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const [clearImages, setClearImages] = useState(false);


  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const navigate = useNavigate();

  const { isProductUpdated, loading, error, product } =
    useSelector((state) => state.productsState);

  const { catagory: categoryList = [] } =
    useSelector((state) => state.featuresState);

  const dispatch = useDispatch();
  const { id: productId } = useParams();

  // -------------------- HANDLE CATEGORY CHANGE --------------------
  const handleCatagory = (e) => {
    const selected = e.target.value;
    setCategory(selected);

    const found = categoryList.find((c) => String(c._id) === String(selected));
    setAttributes(found ? found.attributes : []);
    // clear selected attributes when category changes (prevents mismatches)
    setSelectedAttributes({});
  };

  // -------------------- IMAGE UPLOAD --------------------
  const onImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((arr) => [...arr, reader.result]);
          setImages((arr) => [...arr, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const clearImageHandler = () => {
    setImages([]);
    setImagePreview([]);
    setClearImages(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("pricing.mrp", mrp);
    formData.append("pricing.basePrice", basePrice);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("seller", JSON.stringify({ id: sellerID, name: seller }));
    formData.append("attributes", JSON.stringify(selectedAttributes || {}));

    images.forEach((file) => {
    formData.append("images", file);
  });
    formData.append("clearImages", clearImages);
    dispatch(updateProduct(formData, productId));
  };


  useEffect(() => {
    if (isProductUpdated) {
      toast.success("Product Updated Successfully", {
        onOpen: () => dispatch(clearUpdatedProduct()),
      });
      navigate('/product/productlist')
      return;
    }

    if (error) {
      toast.error(error, {
        onOpen: () => dispatch(clearError()),
      });
      return;
    }

    dispatch(getProduct(productId));
    dispatch(getCatagory());
  }, [isProductUpdated, error, dispatch, productId]);

  useEffect(() => {
    if (product && product._id && categoryList.length > 0) {
      setName(product.name || "");
      setDescription(product.description || "");
      setMrp(product.pricing.mrp ?? "");
      setBasePrice(product.pricing.basePrice ?? "");
      setStock(product.stock ?? 0);
      setSeller(product.seller?.name || "");
      setsellerID(product.seller?.id || "");

      const prodCatId =
        typeof product.category === "object"
          ? product.category._id
          : product.category;

      setCategory(prodCatId || "");

      const foundCat = categoryList.find((c) => String(c._id) === String(prodCatId));
      if (foundCat) {
        setAttributes(foundCat.attributes || []);
      } else {
        setAttributes([]);
      }

      setSelectedAttributes(product.attributes && typeof product.attributes === "object"
        ? product.attributes
        : {});

      setImagePreview((product.images || []).map((img) => img.image));
    }
  }, [product, categoryList]);

  return (
    <div className="container my-4">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h4 className="card-title mb-3">Update Product</h4>

          <form encType="multipart/form-data" onSubmit={submitHandler}>
            {/* NAME */}
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* PRICE */}
            <div className="mb-3">
              <label className="form-label">MRP (₹)</label>
              <input
                type="number"
                className="form-control"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">BasePrice (₹)</label>
              <input
                type="number"
                className="form-control"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
              />
            </div>

            {/* CATEGORY */}
            <div className="mb-4">
              <h5 className="text-secondary fw-bold border-bottom pb-2">Category</h5>

              <div className="mb-3">
                <label className="form-label fw-semibold">Select Category</label>

                <select
                  className="form-select"
                  value={category}
                  onChange={handleCatagory}
                >
                  <option value="">Select Category</option>

                  {categoryList.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ATTRIBUTES */}
            <h5 className="text-secondary fw-bold border-bottom pb-2">Attributes</h5>

            {attributes && attributes.length > 0 ? (
              attributes.map((attr) => {
                
                const value = selectedAttributes?.[attr.key] ?? "";

                return (
                  <div className="mb-3" key={attr.key}>
                    <label className="form-label fw-semibold">{attr.label}</label>

                    <select
                      className="form-select"
                      value={value}
                      onChange={(e) =>
                        setSelectedAttributes((prev) => ({
                          ...prev,
                          [attr.key]: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select {attr.label}</option>

                      {Array.isArray(attr.values) &&
                        attr.values.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                    </select>
                  </div>
                );
              })
            ) : (
              <p className="text-muted">No attributes found</p>
            )}

            {/* SELLER */}
            <div className="mb-3">
              <label className="form-label">Seller</label>
              <input
                type="text"
                className="form-control"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
              />
            </div>

            {/* STOCK */}
            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input
                type="number"
                className="form-control"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            {/* IMAGES */}
            <div className="mb-3">
              <label className="form-label">Upload Images</label>
              <input
                type="file"
                className="form-control"
                multiple
                onChange={onImageChange}
              />
            </div>

            {imagePreview.length > 0 && (
              <span onClick={clearImageHandler} style={{ cursor: "pointer" }}>
                <FaTrash />
              </span>
            )}

            {imagePreview.map((img, idx) => (
              <img
                key={idx}
                src={img}
                className="mt-3 me-3"
                width="60"
                height="50"
                alt="preview"
              />
            ))}

            {/* SUBMIT */}
            <div className="text-end">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

