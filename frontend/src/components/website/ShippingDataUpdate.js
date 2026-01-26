import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Card, Form, Table, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOneShippingData, updateShippingData } from "../../actions/websiteAction";
import { useParams } from "react-router-dom";
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";
import { clearError } from "../../slices/productsSlice";
import { clearUpdateShippingData } from "../../slices/websiteSlice";
import SideBar from "../admin/SideBar";


const ZONES = ["local", "zonal", "national"];

export default function ShippingDataUpdate() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { country = {}, loading,isShippingDataUpdated,error } = useSelector((state) => state.websiteState);
  const { user } = useSelector(state => state.authState);
  const [data, setData] = useState(null);

  useEffect(() => {
        if (isShippingDataUpdated) {
          toast.success("Shipping Data Updated!!!", {
            onOpen: () => dispatch(clearUpdateShippingData()),
          });
          return;
        }
    
        if (error) {
          toast.error(error, {
            onOpen: () => dispatch(clearError()),
          });
          return;
        }
    
    dispatch(getOneShippingData(id));
  }, [dispatch, isShippingDataUpdated,error,id]);

  useEffect(() => {
    const EMPTY_ZONE_RATES = {
      local: 0,
      zonal: 0,
      national: 0,
    };

    const EMPTY_SERVICE_ZONES = {
      local: false,
      zonal: false,
      national: false,
    };

    if (!country || !country._id) return;

    const normalized = {
      _id: country._id,
      countryName: country.countryName || "",
      currency: country.currency || "",

      zoneRates: {
        ...EMPTY_ZONE_RATES,
        ...(country.zoneRates || {}),
      },

      couriers: (country.couriers || []).map((c) => ({
        _id: c._id,
        name: c.name || "",
        isActive: !!c.isActive,
        supportsCOD: !!c.supportsCOD,

        serviceableZones: {
          ...EMPTY_SERVICE_ZONES,
          ...(c.serviceableZones || {}),
        },

        rateCard: {
          ...EMPTY_ZONE_RATES,
          ...(c.rateCard || {}),
        },

        weightSlabs: (c.weightSlabs || []).map((w) => ({
          _id: w._id,
          minKg: w.minKg || 0,
          maxKg: w.maxKg || 0,
          extraPerKg: w.extraPerKg || 0,
        })),
      })),
    };

    setData(normalized);
  }, [country]);


  if (!data) return null;

  const submitHandler = () => {
    dispatch(
      updateShippingData({
        countryId: data._id,
        countryConfig: data,
      })
    );
  };

  if (loading || !data) return <Loader />

  return (

    <Container fluid className="py-4">
    <SideBar user={{role: user?.role}}/>
      <Row className="justify-content-center">
        <Col xl={10}>
          <Card className="shadow border-0">
            <Card.Header className="bg-dark text-white">
              <h5 className="mb-0">Update Shipping Configuration</h5>
            </Card.Header>

            <Card.Body className="p-4">
              {/* Country Header */}
              <Row className="mb-4 align-items-center">
                <Col>
                  <h6 className="mb-0">{data.countryName}</h6>
                  <div className="text-muted small">
                    Country Code: {data.countryName}
                  </div>
                </Col>
                <Col className="text-end">
                  <Badge bg="secondary">{data.currency}</Badge>
                </Col>
              </Row>

              {/* Currency */}
              <Row className="mb-4">
                <Col md={4}>
                  <Form.Label>Currency</Form.Label>
                  <Form.Control
                    value={data.currency}
                    onChange={(e) =>
                      setData({ ...data, currency: e.target.value })
                    }
                  />
                </Col>
              </Row>

              {/* Zone Rates */}
              <Row className="mb-4">
                {ZONES.map((z) => (
                  <Col md={4} key={z}>
                    <Form.Label>{z.toUpperCase()} Zone Rate</Form.Label>
                    <Form.Control
                      type="number"
                      value={data.zoneRates[z]}
                      onChange={(e) =>
                        setData({
                          ...data,
                          zoneRates: {
                            ...data.zoneRates,
                            [z]: Number(e.target.value),
                          },
                        })
                      }
                    />
                  </Col>
                ))}
              </Row>

              {/* Couriers */}
              <h6 className="mt-4 mb-2">Couriers</h6>

              {data.couriers.map((courier, ci) => (
                <Card key={courier._id} className="mb-4">
                  <Card.Body>
                    {/* Courier Basic */}
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          value={courier.name}
                          onChange={(e) => {
                            const couriers = structuredClone(data.couriers);
                            couriers[ci].name = e.target.value;
                            setData({ ...data, couriers });
                          }}
                        />
                      </Col>

                      <Col md={4}>
                        <Form.Check
                          label="Active"
                          checked={courier.isActive}
                          onChange={(e) => {
                            const couriers = structuredClone(data.couriers);
                            couriers[ci].isActive = e.target.checked;
                            setData({ ...data, couriers });
                          }}
                        />
                      </Col>

                      <Col md={4}>
                        <Form.Check
                          label="Supports COD"
                          checked={courier.supportsCOD}
                          onChange={(e) => {
                            const couriers = structuredClone(data.couriers);
                            couriers[ci].supportsCOD = e.target.checked;
                            setData({ ...data, couriers });
                          }}
                        />
                      </Col>
                    </Row>

                    {/* Serviceable Zones */}
                    <strong>Serviceable Zones</strong>
                    <Row className="mb-3">
                      {ZONES.map((z) => (
                        <Col md={4} key={z}>
                          <Form.Check
                            label={z}
                            checked={courier.serviceableZones[z]}
                            onChange={(e) => {
                              const couriers = structuredClone(data.couriers);
                              couriers[ci].serviceableZones[z] =
                                e.target.checked;
                              setData({ ...data, couriers });
                            }}
                          />
                        </Col>
                      ))}
                    </Row>

                    {/* Rate Card */}
                    <strong>Rate Card</strong>
                    <Table bordered className="mt-2">
                      <thead>
                        <tr>
                          {ZONES.map((z) => (
                            <th key={z}>{z}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {ZONES.map((z) => (
                            <td key={z}>
                              <Form.Control
                                type="number"
                                value={courier.rateCard[z]}
                                onChange={(e) => {
                                  const couriers = structuredClone(
                                    data.couriers
                                  );
                                  couriers[ci].rateCard[z] = Number(
                                    e.target.value
                                  );
                                  setData({ ...data, couriers });
                                }}
                              />
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </Table>

                    {/* Weight Slabs */}
                    <strong>Weight Slabs</strong>

                    {courier.weightSlabs.map((slab, si) => (
                      <Row key={slab._id || si} className="mb-2">
                        <Col md={4}>
                          <Form.Control
                            type="number"
                            placeholder="Min Kg"
                            value={slab.minKg}
                            onChange={(e) => {
                              const couriers = structuredClone(data.couriers);
                              couriers[ci].weightSlabs[si].minKg = Number(
                                e.target.value
                              );
                              setData({ ...data, couriers });
                            }}
                          />
                        </Col>
                        <Col md={4}>
                          <Form.Control
                            type="number"
                            placeholder="Max Kg"
                            value={slab.maxKg}
                            onChange={(e) => {
                              const couriers = structuredClone(data.couriers);
                              couriers[ci].weightSlabs[si].maxKg = Number(
                                e.target.value
                              );
                              setData({ ...data, couriers });
                            }}
                          />
                        </Col>
                        <Col md={4}>
                          <Form.Control
                            type="number"
                            placeholder="Extra / Kg"
                            value={slab.extraPerKg}
                            onChange={(e) => {
                              const couriers = structuredClone(data.couriers);
                              couriers[ci].weightSlabs[si].extraPerKg = Number(
                                e.target.value
                              );
                              setData({ ...data, couriers });
                            }}
                          />
                        </Col>
                      </Row>
                    ))}
                  </Card.Body>
                </Card>
              ))}

              <div className="text-end">
                <Button variant="primary" onClick={submitHandler}>
                  Update Configuration
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}