import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from "react-bootstrap";
import '../../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fgetProduct, monthlyProducts } from '../../actions/featuresAction';
import { toast } from 'react-toastify';
import { clearError } from '../../slices/productsSlice';

export default function MonthlyTopProducts() {
  const { productsofmonth = [] } = useSelector((state) => state.featuresState);
  const { item = {}, error } = useSelector((state) => state.productsState);
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(monthlyProducts());
  }, [dispatch]);

useEffect(() => {
  if (!productsofmonth || productsofmonth.length === 0) return;

  productsofmonth.forEach(prod => {
    dispatch(fgetProduct(prod._id));
    console.log("month PRODUCT ID:", prod._id);
  });
}, [dispatch, productsofmonth]);

useEffect(() => {
  if (!error) return;

  toast.error(error);
  dispatch(clearError());
}, [dispatch, error]);


  return (
    <Col xs={12}>
      <div className="d-flex flex-column gap-3">
        <Card className="shadow-sm p-2">
          <Row className="g-0 align-items-center">
            {/* Left Image */}
            <Col xs={5}>
              <Card.Img
                src={item.images?.[0]?.image ? `http://localhost:2005${item.images[0].image}` : 'http://localhost:2005/uploads/notfound.jpg'}
                alt={item.name}
                style={{ objectFit: 'cover', width: '100%', height: '80px', borderRadius: '6px 0 0 6px' }}
              />
            </Col>
            {/* Right Info */}
            <Col xs={7}>
              <Card.Body className="p-2 d-flex flex-column justify-content-between h-100">
                <Card.Title
                  className="mb-1 text-truncate"
                  style={{ fontSize: '0.9rem', fontWeight: '600' }}
                >
                  <Link to={`/product/${item._id}`} className="text-decoration-none text-dark">
                    {item.name}
                  </Link>
                </Card.Title>
                <span className="fw-bold text-success mb-1" style={{ fontSize: '0.85rem' }}>
                  ₹{item.price}
                </span>
                <Button
                  as={Link}
                  to={`/product/${item._id}`}
                  size="sm"
                  className="btn-custom"
                  style={{ fontSize: '0.75rem' }}
                >
                  Buy
                </Button>

              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </Col>
  );


}
