import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../layouts/Loader";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, FormControl, ListGroup} from "react-bootstrap";
import { FaUser, FaShoppingCart, FaEdit, FaTrash } from "react-icons/fa";
import { getUser, getUsers, userDelete } from "../../actions/userAction";
import { clearError, clearUserDeleted } from "../../slices/userSlice";
import SideBar from "./SideBar";


export default function UserList() {
    const { users = [], user = {}, isUserDeleted, loading = true, error } = useSelector(state => state.userState);
    const { user: userA } = useSelector(state => state.authState);
    const dispatch = useDispatch();

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(userDelete(id))
    }
    const UserSelect = (id) => {
        dispatch(getUser(id))
    }

    useEffect(() => {
        if (error) {
            toast.error(error, {
                onOpen: () => { dispatch(clearError()) }
            });
            return;
        }
        if (isUserDeleted) {
            toast.success('User Deleted!!!', {
                onOpen: () => { dispatch(clearUserDeleted()) }
            });
            return;
        }
        dispatch(getUsers())
    }, [dispatch, error, isUserDeleted])

    return (
        <Fragment>
        
          {loading ? (
            <Loader />
          ) : (
            <Container fluid>
              <Row className="vh-100 flex-nowrap">
                {/* Sidebar - Left */}
                <Col xs={12} md={2} className="bg-light border-end p-3">
                <SideBar user={{role: userA?.role}}/>
                </Col>

                {/* Main Content - Center */}
                <Col
                  xs={12}
                  md={8}
                  className="p-3 d-flex justify-content-center align-items-start"
                >
                  <Row className="w-100 justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="mb-0 text-center w-100">
                          <FaShoppingCart className="me-2 text-primary" /> User Details
                          View
                        </h4>
                      </div>
                    {user._id?<>
                      <Card className="shadow-sm">
                        <Card.Body>
                          <div className="d-flex align-items-center mb-3">
                            <img
                              src={user?.avatar}
                              alt={user?.name}
                              className="rounded-circle me-3"
                              width="60"
                              height="60"
                            />
                            <div>
                              <Card.Title className="mb-0">
                                {user?.name || "Select a user"}
                              </Card.Title>
                              <small className="text-muted">
                                {user?.role || "-"}
                              </small>
                            </div>
                          </div>
      
                          <Card.Text>
                            <strong>Email:</strong> {user?.email || "-"}
                          </Card.Text>
                          <Card.Text>
                            <strong>Contact:</strong> {user?.contact || "-"}
                          </Card.Text>
                          <Card.Text>
                            <strong>Created At:</strong>{" "}
                            {user?.createdAt &&
                              new Date(user.createdAt).toLocaleDateString()}
                          </Card.Text>
                        </Card.Body>
                    
                        {/* Footer with buttons */}
                        <Card.Footer className="d-flex justify-content-end">
                          <Link
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            to={`/admin/userupdate/${user._id}`}
                          >
                            <FaEdit className="me-1" /> Edit
                          </Link>
                          <Button variant="outline-danger" onClick={(e) => deleteHandler(e,user._id)} size="sm">
                            <FaTrash className="me-1" /> Delete
                          </Button>
                        </Card.Footer>
                      </Card>
                      </>:<h1>Select User</h1>
                    }
                    </Col>
                  </Row>
                </Col>
      
                {/* Search + User List - Right */}
                <Col xs={12} md={2} className="bg-light border-start p-0">
                  {/* Search box */}
                  <div className="mb-3">
                    <FormControl size="sm" placeholder="Search users..." />
                  </div>
      
                  {/* Scrollable user list */}
                  <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
                    <ListGroup>
                      {users.map((u) => (
                        <ListGroup.Item
                          key={u._id}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <div
                            onClick={() => UserSelect(u._id)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="fw-bold">{u.name}</div>
                            <small
                              className="text-truncate d-block"
                              style={{ maxWidth: 140 }}
                            >
                              {u.email}
                            </small>
                          </div>
                         
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
      
                  {/* Clear all button */}
                  <div className="mt-3">
                    <Button variant="outline-danger" size="sm" className="w-100">
                      Clear all
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </Fragment>
      );
      

      

}
