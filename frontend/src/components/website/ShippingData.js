import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getShippingData } from "../../actions/websiteAction";
import { clearAddShippingData } from "../../slices/websiteSlice";
import { toast } from "react-toastify";
import { clearError } from "../../slices/productsSlice";
import SideBar from "../admin/SideBar";

export default function ShippingData() {
  const dispatch = useDispatch();
  const {
    shipping = {},
    error,
    isShippingDataAddted,
  } = useSelector((state) => state.websiteState);
  const { user } = useSelector((state) => state.authState);

  useEffect(() => {
    if (isShippingDataAddted) {
      toast.success("Shipping Data Added!!!", {
        onOpen: () => dispatch(clearAddShippingData()),
      });
      return;
    }

    if (error) {
      toast.error(error, {
        onOpen: () => dispatch(clearError()),
      });
      return;
    }
    dispatch(getShippingData());
  }, [dispatch, error, isShippingDataAddted]);

  const deleteCountryHandler = (countryCode) => {
    if (window.confirm(`Delete ${countryCode} shipping config?`)) {
      // dispatch(deleteCountry(countryCode));
    }
  };

  const deleteCourierHandler = (countryCode, index) => {
    if (window.confirm("Delete this courier?")) {
      // dispatch(deleteCourier(countryCode, index));
    }
  };

  return (
    <Fragment>
      <SideBar user={{ role: user?.role }} />

      <Container  className="py-4">
        {/* Header */}
        <Row className="mb-4 align-items-center">
          <Col>
            <h4 className="fw-bold mb-0">Shipping Configuration</h4>
          </Col>
          <Col xs="auto">
            <Link to="/admin/new/shippingDataNew">
              <Button variant="primary">+ Add Country</Button>
            </Link>
          </Col>
        </Row>

        {/* Countries */}
        {Object.entries(shipping).map(([countryCode, config]) => (
          <Card key={countryCode} className="mb-4 shadow-sm border-0">
            {/* Country Header */}
            <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center">
              <div>
                <strong>{countryCode}</strong>
                <Badge bg="secondary" className="ms-2">
                  {config?.currency}
                </Badge>
              </div>

              <Stack direction="horizontal" gap={2}>
                <Link to={`/admin/update/shippingData/${config._id}`}>
                  <Button size="sm" variant="outline-light">
                    Edit
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => deleteCourierHandler(config._id)}
                >
                  Delete
                </Button>
              </Stack>
            </Card.Header>

            <Card.Body>
              {/* Zone Rates */}
              {config?.zoneRates && (
                <Row className="mb-4">
                  <Col>
                    <h6 className="fw-semibold mb-2">Zone Rates</h6>
                    <Table bordered responsive size="sm">
                      <thead className="table-light">
                        <tr>
                          <th>Local</th>
                          <th>Zonal</th>
                          <th>National</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{config.zoneRates.local}</td>
                          <td>{config.zoneRates.zonal}</td>
                          <td>{config.zoneRates.national}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              )}

              {/* Couriers */}
              <h6 className="fw-semibold mb-3">Couriers</h6>

              <Row className="g-3">
                {config?.couriers?.map((courier, index) => (
                  <Col xs={12} md={6} lg={4} key={index}>
                    <Card className="h-100 border shadow-sm">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <strong>{courier.name}</strong>
                          <Badge bg={courier.isActive ? "success" : "danger"}>
                            {courier.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>

                        <div className="small text-muted mb-2">
                          COD: {courier.supportsCOD ? "Yes" : "No"}
                        </div>

                        <div className="small">
                          <strong>Zones</strong>
                          <div>
                            Local:{" "}
                            {courier.serviceableZones?.local ? "Yes" : "No"}
                          </div>
                          <div>
                            Zonal:{" "}
                            {courier.serviceableZones?.zonal ? "Yes" : "No"}
                          </div>
                          <div>
                            National:{" "}
                            {courier.serviceableZones?.national ? "Yes" : "No"}
                          </div>
                        </div>

                        <div className="small mt-2">
                          Weight Slabs: {courier.weightSlabs?.length || 0}
                        </div>
                      </Card.Body>

                      <Card.Footer className="bg-white border-top d-flex justify-content-between"></Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </Fragment>
  );
}
