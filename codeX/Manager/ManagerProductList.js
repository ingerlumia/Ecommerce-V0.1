import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../layouts/Loader";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Badge, FormControl } from "react-bootstrap";
import {FaEdit } from "react-icons/fa";

import { clearError } from "../../slices/managerSlice";
import { managerGetProducts, managerGetProductsFil, managerGetUser, managerGetUsers } from "../../actions/managerAction";
import ManagerSideBar from "./ManagerSideBar";
import UsersComponent from "./UsersComponent";


export default function ManagerProductList() {

  const { user = {}, products = [], loading = true, error } = useSelector(state => state.managerState);

  const dispatch = useDispatch();
  const [productId, setProductId] = useState("");
  const [keyword, setkeyword] = useState("");
  const [debouncekeyword, setdebouncekeyword] = useState("");
  const [userrole, setUserrole] = useState('seller');


  const UserSelect = (id) => {
    dispatch(managerGetUser(id))
  }

  useEffect(() => {
    if (error) {
      toast.error(error, {
        onOpen: () => { dispatch(clearError()) }
      });
      return;
    }

    dispatch(managerGetProductsFil());
    dispatch(managerGetUsers());
  }, [dispatch, error])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container fluid className="p-0">
          <Row className="gx-0">
            {/* Sidebar - fixed width */}
            <Col xs={12} md={2} className="bg-light border-end vh-100 p-3">
              <ManagerSideBar />
            </Col>

            {/* Main content - Products */}
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
                  const sellerId = typeof p.seller === "object" ? p.seller.id : null;
                  const isMyProduct = sellerId && user._id === sellerId;

                  if (!isMyProduct) return null;

                  return (
                    <Col xs={12} sm={6} md={6} lg={4} key={idx}>
                      <Card className="h-100 shadow-sm border-0 cursor-pointer">
                        <Card.Img
                          variant="top"
                          src={`http://localhost:2005${p.images[0].image}`}
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


                          <div
                            className={`text-muted mb-3 ${p.status === "pending" ? "text-danger" : ""}`}
                          >
                            {p.status}
                          </div>

                          <div className="d-flex justify-content-between">
                            <Link
                              className="btn btn-sm btn-outline-primary"
                              to={`/manager/updateProduct/${p._id}`}
                            >
                              <FaEdit />
                            </Link>

                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Col>


            <Col xs={12} md={2} className="bg-light border-start p-3">
              <UsersComponent />
            </Col>
          </Row>

        </Container>
      )}
    </Fragment>
  );

}

