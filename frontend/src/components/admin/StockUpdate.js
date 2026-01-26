import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../layouts/Loader";
import { Container, Row, Col, Card, Badge, FormControl, Button, Modal } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { allProducts, stockUpdate } from "../../actions/productsActions";
import SideBar from "./SideBar";
import { clearError, clearIsupdateStock } from "../../slices/productsSlice";

export default function StockUpdate() {
  const dispatch = useDispatch();
  const { products = [], isStockUpdated, loading = true, error } = useSelector(state => state.productsState);
  const { user } = useSelector(state => state.authState);

  
  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);  
  const [stock, setStockInput] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error, {
        onOpen: () => { dispatch(clearError()) }
      });
    }
    if (isStockUpdated) {
      toast.success('Stock Updated!!!', {
        onOpen: () => { dispatch(clearIsupdateStock()) }
      });
      dispatch(allProducts());
    }
      dispatch(allProducts());
  }, [dispatch, error, isStockUpdated]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setStockInput(product.stock);  
    setModalShow(true);
  };

  const handleUpdateStock = () => {
    if (!selectedProduct) return;
    const newStock = Number(stock);
    if (isNaN(newStock) || newStock < 0) {
      toast.error("Please enter a valid stock number");
      return;
    }
    // dispatch action with product id and new stock
    dispatch(stockUpdate(selectedProduct._id, stock));
    setModalShow(false);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container fluid className="p-0">
          <Row className="gx-0">
            <Col xs={12} md={2} className="bg-light border-end vh-100 p-3">
              <SideBar user={{role: user?.role}}/>
            </Col>
            <Col xs={12} md={10} className="p-4">
              <h5 className="fw-bold mb-3">My Products</h5>
              <Row className="g-4">
                {products.map((p, idx) => {
                  const outOfStock = Number(p.stock) <= 0;
            
                  return (
                    <Col xs={12} sm={6} md={4} lg={3} key={p._id}>
                      <Card className="h-100 shadow-sm border-0">
                        <Card.Img
                          variant="top"
                          src={`http://localhost:2005${p.images[0]?.image}`}
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
                            stock: {(p.stock)}
                          </div>
                          <div className="text-muted mb-3">
                            ₹{Number(p.price).toLocaleString()}
                          </div>
                          <div className="d-flex justify-content-between">
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() => openModal(p)}
                            >
                              <FaEdit /> Update Stock
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>

          {/* Modal for stock update */}
          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedProduct && (
                <>
                  <div className="mb-3">
                    <strong>{selectedProduct.name}</strong>
                  </div>
                  <FormControl
                    type="number"
                    min="0"
                    value={stock}
                    onChange={e => setStockInput(e.target.value)}
                  />
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModalShow(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleUpdateStock}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>

        </Container>
      )}
    </Fragment>
  );
}
