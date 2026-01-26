import { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { addShippingData } from "../../actions/websiteAction";
import { useNavigate } from "react-router-dom";

export default function ShippingDataNew() {
  const [countryName, setCountryName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countryConfig, setCountryConfig] = useState({
    currency: "",
    zoneRates: {
      local: 0,
      zonal: 0,
      national: 0,
    },
    couriers: [],
  });

  const [courier, setCourier] = useState({
    name: "",
    isActive: true,
    supportsCOD: false,
    serviceableZones: {
      local: true,
      zonal: true,
      national: true,
    },
    rateCard: {
      local: 0,
      zonal: 0,
      national: 0,
    },
    weightSlabs: [],
  });

  const [weightSlab, setWeightSlab] = useState({
    minKg: 0,
    maxKg: 0,
    extraPerKg: 0,
  });

  /* ---------------- ADD WEIGHT SLAB ---------------- */
  const addWeightSlab = () => {
    setCourier({
      ...courier,
      weightSlabs: [...courier.weightSlabs, weightSlab],
    });

    setWeightSlab({
      minKg: 0,
      maxKg: 0,
      extraPerKg: 0,
    });
  };

  /* ---------------- ADD COURIER ---------------- */
  const addCourierToCountry = () => {
    setCountryConfig({
      ...countryConfig,
      couriers: [...countryConfig.couriers, courier],
    });

    setCourier({
      name: "",
      isActive: true,
      supportsCOD: false,
      serviceableZones: {
        local: true,
        zonal: true,
        national: true,
      },
      rateCard: {
        local: 0,
        zonal: 0,
        national: 0,
      },
      weightSlabs: [],
    });
  };

  return (
    <Container className="py-4">
      <Card className="shadow border-0">
        <Card.Header className="bg-dark text-white">
          Add Country & Courier
        </Card.Header>

        <Card.Body>
          {/* -------- COUNTRY -------- */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Country Code (IN / US)</Form.Label>
              <Form.Control
                value={countryName}
                onChange={(e) => setCountryName(e.target.value.toUpperCase())}
              />
            </Col>

            <Col md={6}>
              <Form.Label>Currency</Form.Label>
              <Form.Control
                value={countryConfig.currency}
                onChange={(e) =>
                  setCountryConfig({
                    ...countryConfig,
                    currency: e.target.value,
                  })
                }
              />
            </Col>
          </Row>

          {/* -------- ZONE RATES -------- */}
          <Row className="mb-3">
            {["local", "zonal", "national"].map((z) => (
              <Col md={4} key={z}>
                <Form.Label>{z.toUpperCase()} Zone Rate</Form.Label>
                <Form.Control
                  type="number"
                  value={countryConfig.zoneRates[z]}
                  onChange={(e) =>
                    setCountryConfig({
                      ...countryConfig,
                      zoneRates: {
                        ...countryConfig.zoneRates,
                        [z]: Number(e.target.value),
                      },
                    })
                  }
                />
              </Col>
            ))}
          </Row>

          <hr />

          {/* -------- COURIER -------- */}
          <h6>Add Courier</h6>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Courier Name</Form.Label>
              <Form.Control
                value={courier.name}
                onChange={(e) =>
                  setCourier({ ...courier, name: e.target.value })
                }
              />
            </Col>

            <Col md={3} className="mt-4">
              <Form.Check
                label="Active"
                checked={courier.isActive}
                onChange={(e) =>
                  setCourier({ ...courier, isActive: e.target.checked })
                }
              />
            </Col>

            <Col md={3} className="mt-4">
              <Form.Check
                label="COD"
                checked={courier.supportsCOD}
                onChange={(e) =>
                  setCourier({
                    ...courier,
                    supportsCOD: e.target.checked,
                  })
                }
              />
            </Col>
          </Row>

          {/* -------- SERVICEABLE ZONES -------- */}
          <Row className="mb-3">
            {["local", "zonal", "national"].map((z) => (
              <Col md={4} key={z}>
                <Form.Check
                  label={`Service ${z}`}
                  checked={courier.serviceableZones[z]}
                  onChange={(e) =>
                    setCourier({
                      ...courier,
                      serviceableZones: {
                        ...courier.serviceableZones,
                        [z]: e.target.checked,
                      },
                    })
                  }
                />
              </Col>
            ))}
          </Row>

          {/* -------- RATE CARD -------- */}
          <Row className="mb-3">
            {["local", "zonal", "national"].map((z) => (
              <Col md={4} key={z}>
                <Form.Label>{z.toUpperCase()} Rate</Form.Label>
                <Form.Control
                  type="number"
                  value={courier.rateCard[z]}
                  onChange={(e) =>
                    setCourier({
                      ...courier,
                      rateCard: {
                        ...courier.rateCard,
                        [z]: Number(e.target.value),
                      },
                    })
                  }
                />
              </Col>
            ))}
          </Row>

          <hr />

          {/* -------- WEIGHT SLABS -------- */}
          <h6>Weight Slabs</h6>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Min Kg</Form.Label>
              <Form.Control
                type="number"
                value={weightSlab.minKg}
                onChange={(e) =>
                  setWeightSlab({
                    ...weightSlab,
                    minKg: Number(e.target.value),
                  })
                }
              />
            </Col>

            <Col md={4}>
              <Form.Label>Max Kg</Form.Label>
              <Form.Control
                type="number"
                value={weightSlab.maxKg}
                onChange={(e) =>
                  setWeightSlab({
                    ...weightSlab,
                    maxKg: Number(e.target.value),
                  })
                }
              />
            </Col>

            <Col md={4}>
              <Form.Label>Extra / Kg</Form.Label>
              <Form.Control
                type="number"
                value={weightSlab.extraPerKg}
                onChange={(e) =>
                  setWeightSlab({
                    ...weightSlab,
                    extraPerKg: Number(e.target.value),
                  })
                }
              />
            </Col>
          </Row>

          <div className="text-end mb-3">
            <Button variant="secondary" onClick={addWeightSlab}>
              Add Weight Slab
            </Button>
          </div>

          {/* -------- ADD COURIER -------- */}
          <div className="text-end mb-4">
            <Button variant="secondary" onClick={addCourierToCountry}>
              Add Courier to Country
            </Button>
          </div>

          <hr />

          {/* -------- SAVE COUNTRY -------- */}
          <div className="text-end">
            <Button
              variant="primary"
              disabled={!countryName || !countryConfig.couriers.length}
              onClick={() => {
                const payload = {
                  countryName,
                  countryConfig,
                };
                console.log(payload)
                dispatch(addShippingData(payload))
                navigate('/admin/view/shippingData')
              }}>
              Save Country
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

