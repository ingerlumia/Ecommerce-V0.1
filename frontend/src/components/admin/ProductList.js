import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "../layouts/Loader";
import {  allProducts, deleteProduct } from "../../actions/productsActions";

import { Link } from "react-router-dom";
import { clearDeletedProduct, clearError } from "../../slices/productsSlice";
import SideBar from "./SideBar";

export default function ProductList() {
    const { products = [], loading = true, isProductDeleted, error } = useSelector(state => state.productsState);
    const { user } = useSelector(state => state.authState);

    const dispatch = useDispatch();

    const deleteHandler = (e,id) => {
        e.target.disabled = true;
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        if (error ) {
            toast.error(error, {
                onOpen: () => { dispatch(clearError()) }
            });
            return;
        }
        if ( isProductDeleted) {
            toast.success('Product Deleted!!!', {
                onOpen: () => { dispatch(clearDeletedProduct()) }
            });
            return;
        }
        dispatch(allProducts())
    }, [dispatch, error,isProductDeleted])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <div className="container-fluid my-4">
                    <div className="row g-3">

                        {/* Sidebar */}
                        <div className="col-lg-2">
                            <SideBar user={{role: user?.role}}/>
                        </div>

                        {/* Product Grid */}
                        <div className="col-lg-7">
                            <div className="row g-3">
                                {products.map((p,idx) => {
                                    const outOfStock = Number(p.stock) <= 0;
                                    return (
                                        <div key={idx} className="col-md-6 col-xl-4">
                                            <div className="card h-100 shadow-sm border-0">
                                                <img
                                                    src={p.images[0]?.image?`${p.images[0].image}` : '../../9067498.jpg'}
                                                    className="card-img-top"
                                                    alt={p.name}
                                                    style={{ objectFit: "cover", height: 180 }}
                                                />

                                                <div className="card-body d-flex flex-column">
                                                    <h6 className="card-title">{p.name}</h6>
                                                    <p className="mb-1">
                                                        <strong className="text-decoration-line-through">₹{Number(p.pricing?.mrp).toLocaleString()}</strong>
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong >₹{Number(p.pricing?.basePrice).toLocaleString()}</strong>
                                                    </p>
                                                    {outOfStock ? (
                                                        <span className="badge text-bg-danger mb-2">Out of stock</span>
                                                    ) : (
                                                        <span className="badge text-bg-success mb-2">In stock</span>
                                                    )}

                                                    <div className="mt-auto d-flex justify-content-between">
                                                        <Link to={`/product/updateProduct/${p._id}`} className="btn btn-outline-primary btn-sm">
                                                            <FaEdit /> Edit
                                                        </Link>
                                                        <Link to={`/admin/update/productStatus/${p._id}`} className="btn btn-outline-primary btn-sm">
                                                            <FaEdit /> Edit status
                                                        </Link>
                                                        <Link to={`/admin/product/SEO/${p._id}`} className="btn btn-outline-primary btn-sm">
                                                            <FaEdit /> Edit Seo
                                                        </Link>
                                                        <button type="button" onClick={e => deleteHandler(e,p._id) } className="btn btn-outline-danger btn-sm">
                                                            <FaTrash /> Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {products.length === 0 && (
                                    <div className="col-12">
                                        <div className="alert alert-secondary mb-0">No products found.</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Detail Panel */}
                        <div className="col-lg-3">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Product Details</h5>
                                    <hr />
                                    <img
                                        src="https://via.placeholder.com/250"
                                        alt="Selected Product"
                                        className="img-fluid rounded mb-3"
                                    />
                                    <h6>Product Name</h6>
                                    <p className="mb-1">Price: ₹0</p>
                                    <p className="mb-1">Stock: 0</p>
                                    <span className="badge text-bg-secondary">ID: #000</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </Fragment>
    );
}
