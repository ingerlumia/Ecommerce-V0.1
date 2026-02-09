import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fgetProduct, monthlyProducts } from "../../actions/featuresAction";
import { toast } from "react-toastify";
import { clearError } from "../../slices/productsSlice";

export default function MonthlyTopProducts() {
  const styles = `
    .product-card-horizontal {
      border: 1px solid #f0f0f0;
      border-radius: 12px;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      overflow: hidden;
      background: #fff;
    }
  
    .product-card-horizontal:hover {
      box-shadow: 0 8px 20px rgba(0,0,0,0.08);
      transform: translateY(-2px);
      border-color: rgba(255, 122, 0, 0.2);
    }
  
    .product-image-container {
      overflow: hidden;
      height: 100px;
      background: #f9f9f9;
    }
  
    .product-image-horizontal {
      object-fit: contain; /* Better for varied product aspect ratios */
      width: 100%;
      height: 100%;
      padding: 5px;
      transition: transform 0.5s ease;
    }
  
    .product-card-horizontal:hover .product-image-horizontal {
      transform: scale(1.05);
    }
  
    .btn-buy-now {
      background-color: #FF7A00;
      border: none;
      font-weight: 600;
      font-size: 0.75rem;
      padding: 6px 0;
      color: white;
      transition: all 0.2s ease;
      border-radius: 6px;
    }
  
    .btn-buy-now:hover {
      background-color: #E66E00;
      color: white;
      box-shadow: 0 4px 8px rgba(255, 122, 0, 0.3);
    }
  
    .price-text {
      color: #FF7A00;
      font-weight: 700;
      font-size: 1rem;
    }
  
    .product-title-link {
      color: #333;
      font-weight: 600;
      font-size: 0.9rem;
      line-height: 1.2;
      transition: color 0.2s;
    }
  
    .product-title-link:hover {
      color: #FF7A00;
    }
  `;
  const { productsofmonth = [] } = useSelector((state) => state.featuresState);
  const { item = {}, error } = useSelector((state) => state.productsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(monthlyProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!productsofmonth || productsofmonth.length === 0) return;

    productsofmonth.forEach((prod) => {
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
    <Col xs={12} className="mb-3">
      <style>{styles}</style>
      <Card className="product-card-horizontal">
        <Row className="g-0 align-items-center">
          {/* Left Image Section */}
          <Col xs={4} sm={5} className="product-image-container">
            <Card.Img
              src={
                item.images?.[0]?.image
                  ? `${item.images[0].image}`
                  : "http://localhost:2005/uploads/notfound.jpg"
              }
              alt={item.name}
              className="product-image-horizontal"
            />
          </Col>

          {/* Right Info Section */}
          <Col xs={8} sm={7}>
            <Card.Body className="p-3">
              <div className="d-flex flex-column h-100">
                <Link
                  to={`/product/${item._id}`}
                  className="text-decoration-none mb-1"
                >
                  <div className="product-title-link text-truncate-2">
                    {item.name}
                  </div>
                </Link>

                <div className="price-text mb-2">
                  ₹
                  {item.pricing
                    ? Number(item.pricing.basePrice).toLocaleString("en-IN")
                    : "0"}
                </div>

                <Button
                  as={Link}
                  to={`/product/${item._id}`}
                  className="btn-buy-now w-100 mt-auto"
                >
                  BUY NOW
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}
