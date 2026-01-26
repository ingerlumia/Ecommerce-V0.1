import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { fgetProduct, getTopSellingProducts } from '../../actions/featuresAction';
import '../../App.css'
import { toast } from 'react-toastify';
import { clearError } from '../../slices/productsSlice';

export default function TopSellingProducts() {
  const { topSelling = [] } = useSelector((state) => state.featuresState);
  const { item = {}, error } = useSelector((state) => state.productsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopSellingProducts());
  }, [dispatch]);

useEffect(() => {
  if (!topSelling || topSelling.length === 0) return;

  topSelling.forEach(prod => {
    dispatch(fgetProduct(prod._id));
    console.log("top sel PRODUCT ID:", prod._id);
  });
}, [dispatch, topSelling]);

useEffect(() => {
  if (!error) return;

  toast.error(error);
  dispatch(clearError());
}, [dispatch, error]);


  return (
    <Fragment>
      <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
      <Card className="shadow-sm top-selling-card">
        <Row className="g-0 align-items-center">

          {/* Left Image Section */}
          <Col xs={5}>
            <Card.Img
              src={item.images?.[0]?.image ? `http://localhost:2005${item.images[0].image}` : 'http://localhost:2005/uploads/notfound.jpg'}
              alt={item.name}
              style={{
                objectFit: "cover",
                height: "120px",
                width: "100%",
                borderRadius: "8px 0 0 8px"
              }}
            />
          </Col>

          {/* Right Info Section */}
          <Col xs={7}>
            <Card.Body className="p-2 d-flex flex-column justify-content-between h-100">

              {/* Product Name */}
              <Card.Title
                className="mb-1 text-truncate"
                style={{ fontSize: "0.9rem", fontWeight: "600" }}
              >
                <Link
                  to={`/product/${item._id}`}
                  className="text-decoration-none text-dark"
                >
                  {item.name}
                </Link>
              </Card.Title>

              {/* Price */}
              <span className="fw-bold text-success mb-1" style={{ fontSize: "0.95rem" }}>
                ₹{item.price}
              </span>

              {/* Cart Button */}
              <Button
                as={Link}
                to={`/product/${item._id}`}
                size="sm"                
                className="btn-custom"
                style={{ fontSize: "0.8rem" }}
              >
                <i className="bi bi-cart"></i> Buy
              </Button>
            </Card.Body>
          </Col>

        </Row>
      </Card>
    </Col>
  
    
    </Fragment>
  );

}
