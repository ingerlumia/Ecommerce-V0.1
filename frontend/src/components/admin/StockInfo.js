import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../layouts/Loader";
import { Container, Row, Col, Card, Badge, FormControl } from "react-bootstrap";
import SideBar from "./SideBar";
import { getUsers } from "../../actions/userAction";
import UsersComponent from "./UsersComponent";
import { allProducts } from "../../actions/productsActions";
import { clearError } from "../../slices/productsSlice";



export default function StockInfo() {

  const {user = {}} = useSelector(state => state.userState);
  const { products = [], loading = true, error } = useSelector(state => state.productsState);
  const dispatch = useDispatch();
  const [keyword, setkeyword] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error, {
        onOpen: () => { dispatch(clearError()) }
      });
      return;
    }

    dispatch(allProducts());
    dispatch(getUsers());
  }, [dispatch, error])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container fluid className="p-0">
          <Row className="gx-0">

            <Col xs={12} md={2} className="bg-light border-end vh-100 p-3">
              <SideBar />
            </Col>

            <Col xs={12} md={8} className="p-4">
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
                  const isPending = p.status === 'pending';
                  const isRejected = p.status === 'rejected';
                  const sellerId = typeof p.seller === "object" ? p.seller.id : null;
                  const isMyProduct = sellerId && user._id === sellerId;

                  if (!isMyProduct) return null;

                    return (<Col xs={12} sm={6} md={6} lg={4} key={idx}>
                      <Card className="h-100 shadow-sm border-0 cursor-pointer">
                        <Card.Img
                          variant="top"
                          src={`http://localhost:2005${p.images[0].image}`}
                          alt={p.name}
                          style={{ height: "160px", objectFit: "cover" }}
                        />
                        <Card.Body>

                        {!isRejected &&  <div className="d-flex justify-content-between align-items-center mb-2">
                            <Card.Title className="mb-0" style={{ fontSize: "1rem" }}>{p.name}</Card.Title>
                            <Badge bg={outOfStock ? "danger" : "success"}>
                              {outOfStock ? "Out of Stock" : "In Stock"}
                            </Badge>
                          </div>}

                          <div className="d-flex flex-wrap gap-3" style={{ fontSize: "0.95rem" }}>
                        <div><strong>Product ID:</strong> {p._id}</div>
                        <div><strong>Seller ID:</strong> {p.seller.id}</div>
                        <div><strong>Seller Name:</strong> {p.seller.name}</div>
                        <div><strong>Stock:</strong> <span style={{ color: outOfStock ? "#dc3545" : "#28a745"}}>{p.stock}</span></div>
                        <div><strong>Price:</strong> ₹{Number(p.price).toLocaleString()}</div>
                        <div><strong>Status:</strong> <span style={{ color: isRejected ? "#dc3545" :isPending ? "#ffc107" : "#28a745" }}>{p.status}</span></div>
                      </div>

                        </Card.Body>
                      </Card>
                    </Col>)

                })}
              </Row>
            </Col>

            {/* User List - Right side */}
            <Col xs={12} md={2} className="bg-light border-start p-3">
              <UsersComponent/>
            </Col>
          </Row>

        </Container>
      )}
    </Fragment>
  );

}

