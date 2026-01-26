import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Loader from "../layouts/Loader";
import Carousel from 'react-bootstrap/Carousel'
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartAction";
import { Button, Modal } from "react-bootstrap";
import ProductReview from "./ProductReview";
import { createReview, getProduct } from "../../actions/productsActions";
import { clearError, clearProduct, clearReviewSubmitted } from "../../slices/productsSlice";

export default function ProductInfo({ cartItems, setCartItems, wish, setWish }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState();

    const { product={}, loading, error, isReviewSubmitted } = useSelector((state) => state.productsState);
    const { user } = useSelector(state => state.authState);
    const [qty, setQty] = useState(1)
    const { id } = useParams();
    const dispatch = useDispatch();
    let isProduct = product._id;

    useEffect(() => {
        if (error) {
            return toast.error(error);
        }
        if(isReviewSubmitted){
            handleClose();
            toast.success('Review Submitted',{
                onOpen: ()=> dispatch(clearReviewSubmitted())
            })
        }
        if (error) {
            toast(error,{
              type: 'error',
              onOpen: ()=> {dispatch(clearError())}
            })
            return
          }
          if(!isProduct || isReviewSubmitted){
            dispatch(getProduct(id))
          }
          return ()=>{
            dispatch(clearProduct())
          }
    }, [id, error, dispatch,isReviewSubmitted])


const reviewHandler = () =>{
    const formdata = new FormData();
    formdata.append('rating',rating)
    formdata.append('comment',comment)
    formdata.append('productId',id)
    dispatch(createReview(formdata))
}

    function wishlist() {
        
        const itemExist = wish.find((item) => item.product._id == product._id);

        if (!itemExist) {
            const newItem = { product, qty };
            setWish((state) => [...state, newItem]);
            toast.info('Added To WishList');
        }
    }

    // Product quetity increase or decrease

    function incQty() {
        if (product.stock == qty) {
            return;
        }
        setQty((state) => state + 1);
    }

    function descQty() {
        if (qty > 1) {
            setQty((state) => state - 1);
        }
    }



    return (
    <Fragment>
        {loading ? (
            <Loader />
        ) : (
            <Fragment>
                <MetaData title={product.name} />

                <div className="container py-4">

                    {/* PRODUCT TITLE + WISHLIST */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="fw-bold">{product.name}</h2>
                        <button className="btn btn-outline-danger" onClick={wishlist}>
                            Wishlist
                        </button>
                    </div>

                    <div className="row">

                        {/* LEFT: IMAGE CAROUSEL */}
                        <div className="col-12 col-md-6 mb-3">
                            <Carousel pause="hover" className="shadow-sm rounded">
                                {product.images &&
                                    product.images.map((image) => (
                                        <Carousel.Item key={image._id} interval={1200}>
                                            <img
                                                className="d-block w-100"
                                                src={image.image}
                                                alt="Product Slide"
                                                style={{ height: "350px", objectFit: "contain" }}
                                            />
                                        </Carousel.Item>
                                    ))}
                            </Carousel>
                        </div>

                        {/* RIGHT: DETAILS */}
                        <div className="col-12 col-md-6">

                            {/* STOCK */}
                            <h5 className={product.stock > 0 ? "text-success" : "text-danger"}>
                                {product.stock > 0 ? "In Stock" : "Out of Stock"}
                            </h5>

                            {/* PRICE */}
                            <div className="mt-2 mb-3">
                                <h4 className="text-primary">Price: ₹{product?.pricing?.basePrice}</h4>
                                <h6 className="text-muted">
                                    MRP: <span className="text-decoration-line-through">₹{product?.pricing?.mrp}</span>
                                </h6>
                            </div>

                            {/* QTY BUTTONS */}
                            <div className="d-flex align-items-center mb-3">
                                <button className="btn btn-primary me-2" onClick={incQty}>
                                    +
                                </button>
                                <button className="btn btn-danger me-2" onClick={descQty}>
                                    -
                                </button>
                                <input
                                    type="number"
                                    readOnly
                                    value={qty}
                                    className="form-control text-center"
                                    style={{ width: "80px" }}
                                />
                            </div>

                            {/* CART BUTTON */}
                            <button
                                className="btn btn-success w-100 mb-3"
                                type="button"
                                onClick={() => dispatch(addCartItem(product._id, qty))}
                                disabled={product.stock === 0}
                            >
                                Add To Cart
                            </button>

                            {/* BUY NOW */}
                            <button
                                className="btn btn-warning w-100 mb-3"
                                disabled={product.stock === 0}
                            >
                                BUY NOW
                            </button>

                            {/* DESCRIPTION */}
                            <div className="mt-3">
                                <h5>Description</h5>
                                <p className="text-muted">{product.description}</p>
                            </div>

                            {/* REVIEW BUTTON */}
                            {user ? (
                                <Button variant="primary" onClick={handleShow} className="mt-3">
                                    Review Product
                                </Button>
                            ) : (
                                <p className="alert alert-danger mt-3">Login to review</p>
                            )}
                        </div>
                    </div>

                    {/* REVIEW MODAL */}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Write a Review</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            {/* STARS */}
                            <div className="d-flex mb-3">
                                {[1, 2, 3, 4, 5].map((star, ixd) => (
                                    <i
                                        key={ixd}
                                        className={`fa fa-star fs-4 me-2 ${
                                            star <= rating ? "text-warning" : "text-secondary"
                                        }`}
                                        onClick={() => setRating(star)}
                                        style={{ cursor: "pointer" }}
                                        onMouseOver={(e) => (e.target.className = "fa fa-star fs-4 me-2 text-info")}
                                        onMouseOut={(e) =>
                                            (e.target.className = `fa fa-star fs-4 me-2 ${
                                                star <= rating ? "text-warning" : "text-secondary"
                                            }`)
                                        }
                                    ></i>
                                ))}
                            </div>

                            {/* COMMENT */}
                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder="Write your review..."
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" disabled={loading} onClick={reviewHandler}>
                                Submit Review
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* REVIEWS */}
                    {product.reviews && product.reviews.length > 0 && (
                        <ProductReview reviews={product.reviews} />
                    )}
                </div>
            </Fragment>
        )}
    </Fragment>
);

}