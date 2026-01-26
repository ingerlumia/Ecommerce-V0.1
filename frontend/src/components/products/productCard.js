import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import '../../App.css'

export default function SidebarProductCard({ product }) {
  if (!product) return null;

 return (
  <Card className="shadow-sm border-0 sidebar-card mb-3 h-100">
    <Link to={`/product/${product._id}`}>
      <Card.Img
        src={product.images[0]?.image}
        alt={product.name}
        style={{
          height: "140px",  // Taller for better visibility
          width: "100%",
          objectFit: "cover",
          borderTopLeftRadius: "6px",
          borderTopRightRadius: "6px"
        }}
      />
    </Link>

    <Card.Body className="p-3 d-flex flex-column h-100">
      <div className="flex-grow-1">
        <h6 className="mb-2 fw-semibold text-truncate lh-sm">{product.name}</h6>
        
        <p className="mb-3 small text-muted text-truncate-2 lh-sm">
          {product.description}
        </p>
        
        <div className="fw-bold text-primary mb-3 fs-5">mrp: ₹{product.pricing.mrp}</div>
        <div className="fw-bold text-primary mb-3 fs-5">Price: ₹{product.pricing.basePrice}</div>
      </div>

      {/* Button aligned to bottom right */}
      <div className="mt-auto">
        <Button
          as={Link}
          to={`/product/${product._id}`}
          size="md"
          className="btn-custom w-100"  // Full width as requested
        >
          View
        </Button>
      </div>
    </Card.Body>
  </Card>
);

}
