import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import { fgetProduct, trendingProducts } from "../../actions/featuresAction";
import { toast } from "react-toastify";
import { clearError } from "../../slices/productsSlice";

export default function TrendingProducts() {
const styles = `
  /* 1. The Viewport: Keeps products locked inside the sidebar */
  .trending-vertical-viewport {
    height: 550px; 
    overflow: hidden;
    position: relative;
    border-radius: 12px;
    background: #fff;
    padding: 10px;
    border: 1px solid #f1f1f1;
  }

  /* 2. The Track: Moves the whole list upward */
  .trending-scroll-track {
    display: flex;
    flex-direction: column;
    animation: scrollVertical 20s linear infinite;
  }

  /* 3. The Vertical Animation Logic */
  @keyframes scrollVertical {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); } /* Halfway because the list is doubled */
  }

  /* Pause on hover so users can easily click */
  .trending-vertical-viewport:hover .trending-scroll-track {
    animation-play-state: paused;
  }

  /* 4. Card Styling */
  .trending-card-animated {
    border: 1px solid #eee;
    border-radius: 10px;
    background: #fff;
    margin-bottom: 12px; /* Gap between cards in the vertical list */
    transition: all 0.3s ease;
    width: 100%; /* Full width of the sidebar */
  }

  .trending-card-animated:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    border-color: #FF7A00;
  }

  .trending-price {
    color: #FF7A00;
    font-weight: 700;
    font-size: 0.9rem;
  }

  /* 5. Button & Icon Shaking */
  .btn-trending-buy {
    background-color: #FF7A00;
    border: none;
    font-size: 0.7rem;
    font-weight: 600;
    padding: 5px 15px;
    border-radius: 5px;
    color: white;
    transition: background 0.2s;
  }

  .btn-trending-buy:hover {
    background-color: #E66E00;
  }

  /* Cart Wiggle Effect */
  @keyframes iconWiggle {
    0%, 100% { transform: rotate(0); }
    25% { transform: rotate(-15deg); }
    75% { transform: rotate(15deg); }
  }

  .btn-trending-buy:hover i {
    display: inline-block;
    animation: iconWiggle 0.3s infinite;
  }
`;
  const { trending = [] } = useSelector((state) => state.featuresState);
  const { item = {}, error } = useSelector((state) => state.productsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(trendingProducts());
  }, [dispatch]);

useEffect(() => {
    if (!trending.length) return;

    trending.forEach(prod => {
        dispatch(fgetProduct(prod._id));
        console.log("trend PRODUCT ID:", prod._id);
    });
}, [dispatch, trending]);

useEffect(() => {
    if (!error) return;

    toast.error(error);
    dispatch(clearError());
}, [dispatch, error]);

  return (
  <Fragment>
    <style>{styles}</style>
    {/* This wrapper would usually wrap the MAP function in your parent component */}
    <div className="animate-trending">
      <Card className="trending-card-animated shadow-sm p-2">
        <Row className="g-0 align-items-center">
          {/* Left Image Section */}
          <Col xs={4}>
            <div style={{ height: '70px', overflow: 'hidden', borderRadius: '6px' }}>
              <Card.Img
                src={item.images?.[0]?.image ? `${item.images[0].image}` : 'http://localhost:2005/uploads/notfound.jpg'}
                alt={item.name}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                  padding: "5px"
                }}
              />
            </div>
          </Col>

          {/* Right Info Section */}
          <Col xs={8}>
            <Card.Body className="p-2 d-flex flex-column justify-content-center">
              <Link to={`/product/${item._id}`} className="text-decoration-none text-dark">
                <Card.Title
                  className="mb-1 text-truncate"
                  style={{ fontSize: "0.85rem", fontWeight: "600" }}
                >
                  {item.name}
                </Card.Title>
              </Link>

              <div className="d-flex justify-content-between align-items-center mt-1">
                <span className="trending-price">
                   ₹{item.pricing ? Number(item.pricing.basePrice).toLocaleString("en-IN") : "0"}
                </span>
                
                <Button
                  as={Link}
                  to={`/product/${item._id}`}
                  size="sm"
                  className="btn-trending-buy"
                >
                  Buy
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  </Fragment>
);
}
