import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../actions/productsActions";
import { toast } from "react-toastify";
import { getCatagory } from "../../actions/featuresAction";
import { clearCreatedProduct, clearError } from "../../slices/productsSlice";
import SideBar from "./SideBar";

export default function NewProduct() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [mrp, setMrp] = useState();
    const [basePrice, setbasePrice] = useState();
    const [images, setImages] = useState([]);
    const [stock, setStock] = useState(0);
    const [category, setCategory] = useState("");
    const [attributes, setAttributes] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState({});

    const [imagePreview, setImagePreview] = useState([]);

    const { isProductCreated, loading, error } = useSelector(state => state.productsState);
    const { catagory = [] } = useSelector((state) => state.featuresState);
    const { user } = useSelector(state => state.authState);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onImageChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState == 2) {
                    setImagePreview(oldArray => [...oldArray, reader.result]);
                    setImages(oldArray => [...oldArray, file]);
                };
            };

            reader.readAsDataURL(file);
        });
    };

    const handleCatagory = (e) => {
        const selected = e.target.value;
        setCategory(selected);
        const found = catagory.find((c) => c._id === selected);
        if (found) {
            setAttributes(found.attributes);
        }
        else {
            setAttributes([])
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name)
        formData.append('pricing[mrp]', mrp)
        formData.append('pricing[basePrice]', basePrice)
        formData.append('description', description)
        formData.append('category', category)
        formData.append("attributes", JSON.stringify(selectedAttributes));
        formData.append('stock', stock);
        formData.append('managerEmail',user.manager);
        images.forEach(image => {
            formData.append('images', image.name)
        });
        dispatch(createNewProduct(formData));

    }

    useEffect(() => {

        if (isProductCreated) {
            toast.success('New Product Created Sucessfuly', {
                onOpen: () => dispatch(clearCreatedProduct())
            })
            navigate('/')
            return;
        }
        if (error) {
            toast.error(error, {
                onOpen: () => dispatch(clearError())
            })
            return;
        }
        dispatch(getCatagory());
    }, [isProductCreated, navigate, error, dispatch])

    return (
        <Fragment>
        <SideBar user={{role: user?.role}}/>
        <div className="container py-4">
            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-header bg-primary text-white py-3 rounded-top-4">
                    <h4 className="mb-0">Add New Product</h4>
                </div>

                <div className="card-body p-4">

                    <form encType="multipart/form-data" onSubmit={submitHandler}>
                        <div className="mb-4">
                            <h5 className="text-secondary fw-bold border-bottom pb-2">Product Info</h5>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Product Name</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Enter product name"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Description</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Enter product description"
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">MRP (₹)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter price"
                                    onChange={e => setMrp(e.target.value)}
                                    value={mrp}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">basePrice (₹)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter price"
                                    onChange={e => setbasePrice(e.target.value)}
                                    value={basePrice}
                                />
                            </div>
                        </div>

                        {/* CATEGORY */}
                        <div className="mb-4">
                            <h5 className="text-secondary fw-bold border-bottom pb-2">Category</h5>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Select Category</label>
                                <select
                                    className="form-select"
                                    onChange={handleCatagory}>
                                    <option value="">-- Select Category --</option>

                                    {catagory?.map(cat => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {attributes.length > 0 && (

                            <div className="mb-4">
                                <h5 className="text-secondary fw-bold border-bottom pb-2">Attributes</h5>

                                {attributes.map((attr) => (


                                    <div className="mb-3" key={attr.key}>
                                        <label className="form-label fw-semibold">{attr.label}</label>

                                        <select
                                            className="form-select"
                                            onChange={(e) =>
                                                setSelectedAttributes({
                                                    ...selectedAttributes,
                                                    [attr.key]: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">Select {attr.label}</option>

                                            {attr.values.map((val, i) => (
                                                <option value={val} key={i}>{val}</option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* SELLER & STOCK */}
                        <div className="mb-4">
                            <h5 className="text-secondary fw-bold border-bottom pb-2">Inventory</h5>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Stock Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter stock"
                                    onChange={e => setStock(e.target.value)}
                                    value={stock}
                                />
                            </div>
                        </div>

                        {/* IMAGES */}
                        <div className="mb-4">
                            <h5 className="text-secondary fw-bold border-bottom pb-2">Product Images</h5>

                            <input
                                type="file"
                                className="form-control"
                                multiple
                                onChange={onImageChange}
                            />

                            <div className="d-flex flex-wrap gap-3 mt-3">
                                {imagePreview.map((img, idx) => (
                                    <img
                                        src={img}
                                        key={idx}
                                        height="70"
                                        width="80"
                                        className="rounded border"
                                        alt="preview"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* SUBMIT */}
                        <div className="text-end">
                            <button
                                type="submit"
                                className="btn btn-success px-4 py-2 fw-semibold"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Product"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        </Fragment>
    );

}


