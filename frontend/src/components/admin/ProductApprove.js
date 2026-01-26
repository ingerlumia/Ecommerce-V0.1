import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../layouts/Loader";
import { Link } from "react-router-dom";
import { Container, Row, Col} from "react-bootstrap";
import {  FaEdit } from "react-icons/fa";
import { getProducts } from "../../actions/productsActions";
import { getUsers } from "../../actions/userAction";
import SideBar from "./SideBar";
import { clearError } from "../../slices/productsSlice";


export default function ProductApprove() {

    const {products = [], loading = true, error } = useSelector(state => state.productsState);
    const { user } = useSelector(state => state.authState);

    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            toast.error(error, {
                onOpen: () => { dispatch(clearError()) }
            });
            return;
        }

        dispatch(getProducts());
        dispatch(getUsers());
    }, [dispatch, error])

    return (
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <Container fluid className="p-0">
              <Row className="gx-0">

                {/* Sidebar - Left */}
                <Col xs={12} md={2} className="bg-light border-end vh-100 p-3">
                  <SideBar user={{role: user?.role}}/>
                </Col>

                {/* Products Section */}
                <Col xs={12} md={10} className="p-4">
                  <h5 className="fw-bold mb-3">My Products</h5>

                  <Row className="g-3">
                    {products
                      .filter((p) => p.status === "pending")
                      .map((p, idx) => (
                        <Col xs={12} md={6} key={idx}>
                          <div className="d-flex justify-content-between align-items-center border rounded shadow-sm p-3 bg-white h-100">
                            {/* Left side: product image + info */}
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={`http://localhost:2005${p.images[0].image}`}
                                alt={p.name}
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                }}
                              />
                              <div>
                                <h6 className="mb-1 fw-bold">{p.name}</h6>
                                <small className="text-muted">{p.description}</small>
                                <div className="text-muted">₹{Number(p.price).toLocaleString()}</div>
                              </div>
                            </div>
      
                            {/* Right side: actions */}
                            <div className="d-flex gap-2">
                              <Link
                                className="btn btn-sm btn-outline-primary"
                                to={`/manager/updateProduct/${p._id}`}
                              >
                                <FaEdit />
                              </Link>
                            </div>
                          </div>
                        </Col>
                      ))}
                  </Row>
                </Col>
              </Row>
            </Container>
          )}
        </Fragment>
      );
      

}

