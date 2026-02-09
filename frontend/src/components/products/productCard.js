import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import '../../App.css'

export default function SidebarProductCard({ product }) {
  if (!product) return null;

const styles = `
  .sidebar-product-card {
    border-radius: 12px;
    background: #fff;
    border: 1px solid #f0f0f0 !important;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .sidebar-product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.08) !important;
    border-color: #FF7A00 !important;
  }

  /* Image Container Alignment Fix */
  .card-img-container {
    height: 180px; /* Fixed height for consistency */
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff; /* Clean white background */
    padding: 15px;
    border-bottom: 1px solid #f9f9f9;
    overflow: hidden;
  }

  .card-img-top-custom {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain; /* Keeps entire product visible */
    transition: transform 0.5s ease;
  }

  .sidebar-product-card:hover .card-img-top-custom {
    transform: scale(1.08); /* Subtle zoom on hover */
  }

  .price-section {
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
  }

  .mrp-text {
    text-decoration: line-through;
    color: #a0a0a0;
    font-size: 0.85rem;
  }

  .base-price-text {
    color: #FF7A00;
    font-weight: 800;
    font-size: 1.25rem;
  }

  .btn-custom-shimmer {
    background-color: #FF7A00;
    border: none;
    font-weight: 700;
    color: white;
    padding: 10px;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    transition: background 0.3s;
  }

  .btn-custom-shimmer::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: btn-shimmer 2.5s infinite;
  }

  @keyframes btn-shimmer {
    100% { left: 150%; }
  }

  .btn-custom-shimmer:hover {
    background-color: #E66E00;
  }
`;

return (
  <Card className="sidebar-product-card shadow-sm h-100">
    <style>{styles}</style>
    
    {/* Corrected Image Alignment Container */}
    <Link to={`/product/${product._id}`} className="card-img-container">
      <Card.Img
        src={product.images[0]?.image}
        alt={product.name}
        className="card-img-top-custom"
      />
    </Link>

    <Card.Body className="p-3 d-flex flex-column">
      <div className="flex-grow-1">
        <h6 className="mb-2 fw-bold text-dark text-truncate" style={{ fontSize: '1rem' }}>
          {product.name}
        </h6>
        
        <p className="small text-muted mb-3" style={{ 
          height: '40px', 
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical'
        }}>
          {product.description}
        </p>
        
        <div className="price-section mb-3">
          <span className="base-price-text">
            ₹{product.pricing?.basePrice ? Number(product.pricing.basePrice).toLocaleString("en-IN") : "0"}
          </span>
          <span className="mrp-text">
            M.R.P: ₹{product.pricing?.mrp ? Number(product.pricing.mrp).toLocaleString("en-IN") : "0"}
          </span>
        </div>
      </div>

      <div className="mt-auto">
        <Button
          as={Link}
          to={`/product/${product._id}`}
          className="btn-custom-shimmer w-100"
        >
          View Product
        </Button>
      </div>
    </Card.Body>
  </Card>
);
}
