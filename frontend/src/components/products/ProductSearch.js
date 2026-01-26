import { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import ProductCard from "./productCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productsActions";
import Loader from "../../components/layouts/Loader";
import { toast } from "react-toastify";
import MetaData from "../../components/layouts/MetaData";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";

// CSS Imports
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap_white.css";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const { keyword } = useParams();

  const [currentPage, setcurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 50000]);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState(null);

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Mobile Phones",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const setCurrentPageNo = (pageNo) => setcurrentPage(pageNo);

  useEffect(() => {
    if (error) toast.error(error);
    dispatch(getProducts(keyword, price, category, rating, currentPage));
  }, [error, dispatch, keyword, price, category, rating, currentPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Search Product" />
          <Container className="mt-4">
            <h2 className="fw-bold mb-4 text-center text-primary">Search Products</h2>
            <Row>
              {/* FILTERS */}
              <Col xs={12} lg={3} className="mb-4">
                <Card
                  className="p-3 shadow-sm h-100"
                  style={{ backgroundColor: "#f8f9fa", borderRadius: "15px" }}
                >
                  <Card.Body>
                    <Card.Title className="fw-bold mb-3 text-dark">Filters</Card.Title>

                    {/* PRICE RANGE */}
                    <Card.Subtitle className="fw-bold mb-2 text-secondary">Price Range</Card.Subtitle>
                    <Slider
                      range
                      marks={{ 1: "₹1", 50000: "₹50000" }}
                      min={1}
                      max={50000}
                      defaultValue={price}
                      onChangeComplete={setPrice}
                      handleRender={(renderProps) => (
                        <Tooltip overlay={`${renderProps.props["aria-valuenow"]}`}>
                          <div {...renderProps.props}></div>
                        </Tooltip>
                      )}
                    />

                    <hr />

                    {/* CATEGORY FILTER */}
                    <Card.Subtitle className="fw-bold mb-2 text-secondary">Categories</Card.Subtitle>
                    <div className="d-flex flex-column gap-2 mb-3">
                      {categories.map((cat) => (
                        <Badge
                          key={cat}
                          bg={category === cat ? "primary" : "info"}
                          style={{
                            cursor: "pointer",
                            width: "100%",
                            padding: "10px 0",
                            fontSize: "0.95rem",
                          }}
                          onClick={() => setCategory(cat)}
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>

                    {/* RATING FILTER */}
                    <Card.Subtitle className="fw-bold mb-2 text-secondary">Minimum Rating</Card.Subtitle>
                    <div className="d-flex gap-2 flex-wrap">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <Badge
                          key={star}
                          bg={rating >= star ? "warning" : "secondary"}
                          style={{
                            cursor: "pointer",
                            width: "45px",
                            height: "35px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.9rem",
                          }}
                          onClick={() => setRating(star)}
                        >
                          {star} ★
                        </Badge>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* PRODUCTS */}
              <Col xs={12} lg={9}>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                  {products &&
                    products.map((product) => (
                      <Col key={product._id}>
                        <ProductCard
                          product={product}
                          style={{
                            minHeight: "350px",
                            borderRadius: "15px",
                            overflow: "hidden",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          }}
                        />
                      </Col>
                    ))}
                </Row>

                {/* PAGINATION */}
                {productsCount > resPerPage && (
                  <div className="d-flex justify-content-center mt-4">
                    <Pagination
                      activePage={currentPage}
                      onChange={setCurrentPageNo}
                      totalItemsCount={productsCount}
                      itemsCountPerPage={resPerPage}
                      nextPageText="Next"
                      prevPageText="Previous"
                      firstPageText="First"
                      lastPageText="Last"
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
}
