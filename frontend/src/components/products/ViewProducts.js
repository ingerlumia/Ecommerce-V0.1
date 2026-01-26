import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { viewProducts } from "../../actions/productsActions";
import { Container, Row, Col, Card } from "react-bootstrap";
import Loader from "../layouts/Loader";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";

export default function ViewProducts() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const { catagory = [] } = useSelector((state) => state.featuresState);
    const { products = [], loading } = useSelector((state) => state.productsState);

    const category = searchParams.get("category");
    const keyword = searchParams.get("keyword");

    const [attributes, setAttributes] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [price, setPrice] = useState([1, 50000]);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (category) {
            const found = catagory.find((c) => c._id === category);
            setAttributes(found?.attributes || []);
            setSelectedAttributes({});
        } else {
            setAttributes([]);
            setSelectedAttributes({});
        }
    }, [category, catagory]);


    useEffect(() => {
        dispatch(
            viewProducts(
                keyword,
                price,
                category,
                rating,
                selectedAttributes
            )
        );
    }, [dispatch, keyword, price, category, rating, selectedAttributes]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Container fluid className="p-0">
                    <Row className="gx-0">

                        {/* LEFT FILTER PANEL */}
                        <Col xs={12} md={4} lg={3} className="p-4 border-end bg-light">
                            <h6 className="fw-bold mb-3">Filters</h6>

                            {/* CATEGORY */}
                            <div className="mb-4">
                                <h6 className="fw-semibold mb-2">Category</h6>
                                <ul className="list-unstyled">
                                    {catagory.map((cat) => (
                                        <li key={cat._id} className="mb-2">
                                            <Link
                                                to={`/viewproducts?category=${cat._id}`}
                                                className="text-decoration-none text-dark"
                                            >
                                                {cat.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* ATTRIBUTES */}
                            {attributes.length > 0 && (
                                <div className="mb-4">
                                    <h6 className="fw-semibold mb-2">Attributes</h6>

                                    {attributes.map((attr) => (
                                        <div className="mb-3" key={attr.key}>
                                            <label className="form-label fw-semibold">
                                                {attr.label}
                                            </label>

                                            <select
                                                className="form-select"
                                                value={selectedAttributes[attr.key] || ""}
                                                onChange={(e) =>
                                                    setSelectedAttributes((prev) => ({
                                                        ...prev,
                                                        [attr.key]: e.target.value,
                                                    }))
                                                }
                                            >
                                                <option value="">All</option>
                                                {attr.values.map((val, i) => (
                                                    <option key={i} value={val}>
                                                        {val}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* PRICE */}
                            <div className="mb-4">
                                <h6 className="fw-semibold mb-2">Price</h6>
                                <Slider
                                    range
                                    min={1}
                                    max={50000}
                                    defaultValue={price}
                                    onChangeComplete={setPrice}
                                    marks={{ 1: "₹1", 50000: "₹50000" }}
                                    handleRender={(renderProps) => (
                                        <Tooltip overlay={renderProps.props["aria-valuenow"]}>
                                            <div {...renderProps.props} />
                                        </Tooltip>
                                    )}
                                />
                            </div>

                            {/* RATING */}
                            <div className="mb-4">
                                <h6 className="fw-semibold mb-2">Rating</h6>
                                <select
                                    className="form-select"
                                    onChange={(e) => setRating(Number(e.target.value))}
                                >
                                    <option value={0}>All</option>
                                    <option value={5}>5★</option>
                                    <option value={4}>4★ & above</option>
                                    <option value={3}>3★ & above</option>
                                    <option value={2}>2★ & above</option>
                                </select>
                            </div>
                        </Col>

                        {/* RIGHT PRODUCTS */}
                        <Col xs={12} md={8} lg={9} className="p-4">
                            <h5 className="fw-bold mb-3">My Products</h5>

                            <Row className="g-4">
                                {products.map((p, idx) => (
                                    <Col xs={12} sm={6} lg={4} key={idx}>
                                        <Card className="h-100 shadow-sm border-0">
                                            <Card.Img
                                                variant="top"
                                                src={`http://localhost:2005${p.images[0].image}`}
                                                style={{ height: 160, objectFit: "cover" }}
                                            />
                                            <Card.Body>
                                                <Card.Title>{p.name}</Card.Title>
                                                <div className="text-muted mb-2">
                                                    ₹{Number(p.price).toLocaleString()}
                                                </div>
                                                <div
                                                    className={
                                                        p.status === "pending"
                                                            ? "text-danger"
                                                            : "text-muted"
                                                    }
                                                >
                                                    {p.status}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            )}
        </Fragment>
    );
}
