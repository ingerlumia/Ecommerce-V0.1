import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../layouts/Loader";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Badge, FormControl } from "react-bootstrap";
import { FaTrash, FaStar, FaEdit, FaClock } from "react-icons/fa";
import { getReviews, reviewGetProducts } from "../../actions/productsActions";
import SellerSideBar from "./SellerSideBar";
import { clearDeletedProduct, sellerclearError } from "../../slices/sellerSlice";
import { sellerDeleteProduct, sellerGetProducts } from "../../actions/sellerAction";


export default function SellerProductList() {

  const { products = [], isProductDeleted = false, loading = true, error } = useSelector(state => state.sellerState);
  const { user } = useSelector(state => state.authState)

  const dispatch = useDispatch();
  const [productId, setProductId] = useState("");
  const [keyword, setkeyword] = useState("");
  const [debouncekeyword, setdebouncekeyword] = useState("");

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(sellerDeleteProduct(id, id))
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(sellerDeleteProduct(productId))
  }


  useEffect(() => {
    if (error) {
      toast.error(error, {
        onOpen: () => { dispatch(sellerclearError()) }
      });
      return;
    }

    if (isProductDeleted) {
      toast.success('Product Deleted!!!', {
        onOpen: () => { dispatch(clearDeletedProduct()) }
      });
      return;
    }
    dispatch(sellerGetProducts());
    console.log('product list useeffect')
  }, [dispatch, isProductDeleted])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container fluid className="p-0">
          <Row className="gx-0">
           
            <Col xs={12} md={2} className="bg-light border-end vh-100 p-3">
              <SellerSideBar />
            </Col>

            
            <Col xs={12} md={10} className="p-4">
              <FormControl
                size="sm"
                placeholder="Search by Product ID..."
                className="mb-4"
                value={keyword}
                onChange={(e) => setkeyword(e.target.value)}
              />

              <h5 className="fw-bold mb-3">My Products</h5>

              <Row className="g-4">
                {products.map((p, idx) => {
                  const outOfStock = Number(p.stock) <= 0;
                  const sellerId = typeof p.seller === "object" ? p.seller.id : null;
                  const isMyProduct = sellerId && user._id === sellerId;
                  const isPending = String(p.status || "").toLowerCase().trim() === "pending";
                  if (!isMyProduct) return null;

                  return (
                    <Col xs={12} sm={6} md={4} lg={3} key={idx}>
                      <Card className="h-100 shadow-sm border-0 cursor-pointer">
                        <Card.Img
                          variant="top"
                          src={p.images?.[0]?.image?`http://localhost:2005${p.images[0].image}`:'http://localhost:2005/uploads/notfound.jpg'}
                          alt={p.name}
                          style={{ height: "160px", objectFit: "cover" }}
                        />
                        <Card.Body>
                        
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <Card.Title className="mb-0" style={{ fontSize: "1rem" }}>{p.name}</Card.Title>
                            <Badge bg={outOfStock ? "danger" : "success"}>
                              {outOfStock ? "Out of Stock" : "In Stock"}
                            </Badge>
                          </div>

                        
                          <div className="text-muted mb-3">
                            ₹{Number(p.price).toLocaleString()}
                          </div>

                          <div className="mb-3" style={isPending ? { color: "black", fontWeight: 600 } : {}}>
                            <FaClock/>{p.status}
                          </div>           
                          <div className="d-flex justify-content-between">
                            <Link
                              className="btn btn-sm btn-outline-primary"
                              to={`/seller/updateProduct/${p._id}`}>
                              <FaEdit />
                            </Link>

                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={(e) => { deleteHandler(e, p._id) }}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>

                  );
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </Fragment>
  );

}



