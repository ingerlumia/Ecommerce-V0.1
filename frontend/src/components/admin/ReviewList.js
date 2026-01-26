import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../layouts/Loader";
import SideBar from "./SideBar";
import { Container, Row, Col, Card, Button, FormControl,  Badge, } from "react-bootstrap";
import { FaTrash, FaStar } from "react-icons/fa";
import { allProducts, deleteReviews, getReviews } from "../../actions/productsActions";
import { clearError, clearIsReviewDeleted } from "../../slices/productsSlice";


export default function ReviewList() {

  const { reviews = [], products = [], isReviewDeleted, loading = true, error } = useSelector(state => state.productsState);
  const { user } = useSelector(state => state.authState);
  const dispatch = useDispatch();
  const [productId, setProductId] = useState("");
  const [keyword, setkeyword] = useState("");
  const [debouncekeyword, setdebouncekeyword] = useState("");

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteReviews(id, productId))
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setdebouncekeyword(keyword.trim());
    }, 1500)
    return () => { clearTimeout(handler) }

  }, [keyword]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        onOpen: () => { dispatch(clearError()) }
      });
      return;
    }
    if (isReviewDeleted) {
      toast.success('Reviews Deleted!!!', {
        onOpen: () => { dispatch(clearIsReviewDeleted()) }
      });

      dispatch(getReviews(productId))
      return;
    }
    if (debouncekeyword.length >= 2) {
      dispatch(allProducts(debouncekeyword));
    }
    if (debouncekeyword.length === 0) {
      dispatch(allProducts());
    }
  }, [dispatch, error, isReviewDeleted, productId, debouncekeyword])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container fluid>
          <Row className="vh-100 flex-nowrap">
            {/* Sidebar - Left */}
            <Col xs={12} md={2} className="bg-light border-end p-3">
              <SideBar user={{role: user?.role}}/>
            </Col>

            {/* Main Content - Review Details in Center */}
            <Col
              xs={12}
              md={7}
              className="p-3 d-flex justify-content-center align-items-start"
            >
              <Row className="w-100 justify-content-center">
                <Col xs={12} md={10} lg={8}>
                  <Card className="shadow-sm border-0">
                    <Card.Body>
                      <Card.Title className="d-flex align-items-center">
                        <FaStar className="me-2 text-warning" /> Review Details
                      </Card.Title>
                      {reviews.length > 0 ? (
                        reviews.map((r, idx) => (
                          <div key={idx} className="mb-3 p-2 border-bottom">
                            <Card.Text>
                              <strong>Rating:</strong> {r.rating} / 5
                            </Card.Text>
                            <Card.Text>
                              <strong>Comment:</strong> {r.comment}
                            </Card.Text>

                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={(e) => deleteHandler(e, r._id)}
                            >
                              <FaTrash className="me-1" /> Delete
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted">No reviews found.</p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>

            {/* Product List + Search - Right */}
            <Col xs={12} md={3} className="bg-light border-start p-3">
                      <FormControl
                  size="sm"
                  placeholder="Enter Product ID..."
                  className="mb-3"
                  value={keyword}
                  onChange={e => setkeyword(e.target.value)}
                />
              <h6 className="fw-bold mb-2">Products</h6>
              <div
                style={{
                  maxHeight: "70vh",
                  overflowY: "auto",
                }}
              >
                {products.map((p, idx) => {
                  const outOfStock = Number(p.stock) <= 0;
                  return (
                    <Card
                      key={idx}
                      className="mb-3 shadow-sm border-0 cursor-pointer"
                      onClick={() => {
                        setProductId(p._id);
                        dispatch(getReviews(p._id));
                      }}
                    >
                      <Row className="g-0 align-items-center">
                        <Col xs={4}>
                          <img
                            src={`${p.images[0].image}`}
                            alt={p.name}
                            className="img-fluid rounded-start"
                            style={{ height: 70, objectFit: "cover" }}

                          />
                        </Col>
                        <Col xs={8}>
                          <Card.Body className="p-2">
                            <h6 className="card-title mb-1">{p.name}</h6>
                            <small className="text-muted">
                              ₹{Number(p.pricing?.basePrice).toLocaleString()}
                            </small>
                            <br />
                            <Badge
                              bg={outOfStock ? "danger" : "success"}
                              className="mt-1"
                            >
                              {outOfStock ? "Out of Stock" : "In Stock"}
                            </Badge>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </Fragment>
  );





}
