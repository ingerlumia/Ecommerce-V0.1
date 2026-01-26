import { useEffect } from "react";
import { Container, Row, Col, Card, Badge, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSaleEvent, getSalesEvent, sendSaleEventRequest, toggleSaleEvent } from "../../actions/salesEventAction";
import { clearSaleEventDelete } from "../../slices/saleEventSlice";
import { toast } from "react-toastify";
import { clearError } from "../../slices/productsSlice";
import SideBar from "../admin/SideBar";


export default function SalesEvent() {
  const { salesEvent = [], isSaleEventDeleted, isToggleSaleEvent, error } = useSelector((state) => state.saleEventState);
  const { user } = useSelector(state => state.authState);
  const dispatch = useDispatch();

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteSaleEvent(id))
  }
  let catid, saleid;
  salesEvent.map((eve) => (
    saleid = eve._id,
    eve.rules.map((rule, idx) => (
      catid = rule.category
    ))
  ))
  const idData = {
    catagoryId: catid,
    eventId: saleid
  }
  const payload = {
    saleid:saleid
  }
  const requestHandler = (e) => {
    dispatch(sendSaleEventRequest(idData))
  }
  const toggleHandler = (e) => {
    dispatch(toggleSaleEvent(payload))
  }

  useEffect(() => {
    if (error) {
      toast.error(error, {
        onOpen: () => { dispatch(clearError()) }
      });
      return;
    }
    if (isSaleEventDeleted) {
      toast.success('Sale Event Deleted!!!', {
        onOpen: () => { dispatch(clearSaleEventDelete()) }
      });
      return;
    }
    if (isToggleSaleEvent) {
      toast.success('Sale Event ON Live!!!', {
        onOpen: () => { dispatch(clearSaleEventDelete()) }
      });
      return;
    }
    dispatch(getSalesEvent());
  }, [dispatch, isSaleEventDeleted,isToggleSaleEvent, error])



  return (
    <Container className="py-4">
    <SideBar user={{role: user?.role}}/>
      {salesEvent.map((element) => (
        <Row
          key={element._id}
          className="justify-content-center mb-4">
          <Col xs={12} lg={10} xl={8}>
            <Card className="shadow border-0">
              {/* Header */}
              <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Sale Event Details</h5>
                <Badge bg={element.isActive ? "success" : "secondary"}>
                  {element.isActive ? "ACTIVE" : "INACTIVE"}
                </Badge>
              </Card.Header>

              {/* Body */}
              <Card.Body className="p-4">
                {/* Event Info */}
                <Row className="mb-4">
                  <Col md={6} className="mb-3 mb-md-0">
                    <div className="text-muted small">Event Name</div>
                    <div className="fw-semibold fs-5">
                      {element.name}
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="text-muted small">Start At</div>
                    <div>{element.startAt}</div>
                  </Col>
                  <Col md={3}>
                    <div className="text-muted small">End At</div>
                    <div>{element.endAt}</div>
                  </Col>
                </Row>

                <hr />

                {/* Rules */}
                <h6 className="mb-3">Discount Rules</h6>

                <Table bordered responsive hover className="align-middle">
                  <thead className="table-secondary">
                    <tr>
                      <th style={{ width: "45%" }}>Category</th>
                      <th style={{ width: "25%" }}>Discount Type</th>
                      <th style={{ width: "30%" }}>Discount Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {element.rules.map((rule) => (
                      <tr key={rule._id}>

                        <td>{rule.category}</td>
                        <td>
                          <Badge bg="info">
                            {rule.discountType}
                          </Badge>
                        </td>
                        <td>
                          <span className="fw-semibold">
                            {rule.discountValue}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                {/* Meta */}
                <Row className="mt-4 pt-3 border-top">
                  <Col md={6}>
                    <div className="text-muted small">Created At</div>
                    <div>{element.createdAt}</div>
                  </Col>
                  <Col md={6} className="text-md-end mt-3 mt-md-0">
                    <div className="text-muted small">Updated At</div>
                    <div>{element.updatedAt}</div>
                  </Col>
                   <Button variant="outline-danger" size="sm" onClick={e => requestHandler(e)}>
                  Send request
                </Button>
                   <Button variant="outline-danger" size="sm" onClick={e => toggleHandler(e)}>
                  Active
                </Button>
                </Row>
              </Card.Body>

              {/* Footer */}
              <Card.Footer className="d-flex gap-2">
                <Link to={`/admin/update/salesEvent/${element._id}`}>
                  <Button variant="outline-primary" size="sm">
                    Edit
                  </Button>
                </Link>

                

                <Button variant="outline-danger" size="sm" onClick={e => deleteHandler(e, element._id)}>
                  Delete
                </Button>
                
              </Card.Footer>
             
            </Card>
          </Col>
        </Row>
      ))}
      <Link to="/admin/new/salesEventNew">
                  <Button variant="outline-success" size="sm">
                    New
                  </Button>
                </Link>
    </Container>
  );
}
