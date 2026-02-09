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
const styles = `
  /* 1. Snowfall/Shimmer effect moving inside the button */
  @keyframes snowfall-shimmer {
    0% { transform: translateX(-150%) skewX(-25deg); }
    100% { transform: translateX(150%) skewX(-25deg); }
  }

  /* 2. Energetic shaking for the cart icon */
  @keyframes cart-shake-icon {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-15deg); }
    75% { transform: rotate(15deg); }
  }

  /* 3. Subtle tilt-shake for the entire card */
  @keyframes card-wobble {
    0%, 100% { transform: translateY(-5px) rotate(0deg); }
    25% { transform: translateY(-5px) rotate(0.8deg); }
    75% { transform: translateY(-5px) rotate(-0.8deg); }
  }

  .top-selling-wrapper {
    position: relative;
    transition: all 0.3s ease;
  }

  .top-selling-card {
    border: 1px solid #f1f1f1;
    border-radius: 12px;
    background: #ffffff;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  /* Hover State: Lift and Wobble */
  .top-selling-card:hover {
    border-color: #FF7A00;
    box-shadow: 0 12px 25px rgba(255, 122, 0, 0.15) !important;
    animation: card-wobble 0.4s ease-in-out infinite;
  }

  /* Best Seller Badge */
  .badge-hot {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #FF7A00;
    color: white;
    font-size: 0.65rem;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 4px;
    z-index: 2;
    text-transform: uppercase;
  }

  .ts-image-container {
    background: #fdfdfd;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
  }

  .ts-image {
    object-fit: contain;
    transition: transform 0.5s ease;
    padding: 10px;
  }

  .top-selling-card:hover .ts-image {
    transform: scale(1.1);
  }

  /* Shimmering Button Styling */
  .ts-buy-btn {
    background-color: #FF7A00;
    border: none;
    font-weight: 700;
    border-radius: 8px;
    padding: 8px 0;
    position: relative;
    overflow: hidden; /* Clips the snowfall effect */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
    color: white;
  }

  /* The Snowfall Layer */
  .ts-buy-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: snowfall-shimmer 2s infinite linear;
  }

  .ts-buy-btn:hover {
    background-color: #E66E00;
  }

  /* Cart Icon Animation */
  .ts-buy-btn i {
    z-index: 1;
    font-size: 1rem;
    display: inline-block;
  }

  .ts-buy-btn:hover i {
    animation: cart-shake-icon 0.3s infinite ease-in-out;
  }

  .ts-buy-btn span {
    z-index: 1;
    margin-left: 5px;
  }

  .ts-price {
    color: #FF7A00;
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 8px;
  }

  .ts-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: #2d3436;
    height: 2.4em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
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
    <style>{styles}</style>
    <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
      <div className="top-selling-wrapper">
        <div className="badge-hot">Best Seller</div>
        
        <Card className="shadow-sm top-selling-card">
          <Row className="g-0 align-items-center">
            <Col xs={5} className="ts-image-container">
              <Card.Img
                src={item.images?.[0]?.image ? `${item.images[0].image}` : 'http://localhost:2005/uploads/notfound.jpg'}
                alt={item.name}
                className="ts-image"
              />
            </Col>

            <Col xs={7}>
              <Card.Body className="p-3">
                <Link to={`/product/${item._id}`} className="text-decoration-none">
                  <div className="ts-title mb-1">
                    {item.name}
                  </div>
                </Link>

                <div className="ts-price">
                  ₹{item.pricing ? Number(item.pricing.basePrice).toLocaleString("en-IN") : "0"}
                </div>

                <Button
                  as={Link}
                  to={`/product/${item._id}`}
                  className="ts-buy-btn w-100"
                >
                  <i className="bi bi-cart3"></i>
                  <span>Buy Now</span>
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </Col>
  </Fragment>
);
}
