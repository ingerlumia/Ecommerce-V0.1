import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSalesEvent, updateSaleEvent } from "../../actions/salesEventAction";
import { useParams } from "react-router-dom";
import SideBar from "../admin/SideBar";

const toDateTimeLocal = (iso) => {
  if (!iso) return "";
  return new Date(iso).toISOString().slice(0, 16);
};

export default function SalesEventUpdate() {

  const dispatch = useDispatch();
  const { id } = useParams();
  const { salesEvent = [] } = useSelector(
    (state) => state.saleEventState
  );
  const { user } = useSelector(state => state.authState);

  const [form, setForm] = useState({
    _id: "",
    name: "",
    startAt: "",
    endAt: "",
    isActive: false,
    rules: []
  });

  useEffect(() => {
    dispatch(getSalesEvent());
  }, [dispatch]);

  useEffect(() => {
    if (!salesEvent.length || !id) return;

    const event = salesEvent.find(ev => ev._id === id);
    if (!event) return;

    setForm({

      name: event.name || "",
      startAt: toDateTimeLocal(event.startAt),
      endAt: toDateTimeLocal(event.endAt),
      isActive: event.isActive || false,
      rules: event.rules.map(rule => ({

        category: rule.category,
        discountType: rule.discountType,
        discountValue: Number(rule.discountValue)
      }))
    });
  }, [salesEvent, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleRuleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRules = [...form.rules];

    updatedRules[index][name] =
      name === "discountValue" ? Number(value) : value;

    setForm(prev => ({
      ...prev,
      rules: updatedRules
    }));
  };

  const addRule = () => {
    setForm(prev => ({
      ...prev,
      rules: [
        ...prev.rules,
        {
          _id: null,
          category: "",
          discountType: "percentage",
          discountValue: 0
        }
      ]
    }));
  };

  const removeRule = (index) => {
    setForm(prev => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index)
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const updateData = {
      _id: form._id,
      name: form.name,
      startAt: new Date(form.startAt).toISOString(),
      endAt: new Date(form.endAt).toISOString(),
      isActive: form.isActive,
      rules: form.rules.map(rule => ({
        _id: rule._id,
        category: rule.category,
        discountType: rule.discountType,
        discountValue: rule.discountValue
      }))
    };

    dispatch(updateSaleEvent(id, updateData))

  };


  return (
    <Container fluid className="py-4">
    <SideBar user={{role: user?.role}}/>
      <Row className="justify-content-center">
        <Col xs={12} lg={8} xl={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3">
                Update Sales Event
              </Card.Title>

              <Form onSubmit={submitHandler}>
                <Row className="g-3">

                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Event Name</Form.Label>
                      <Form.Control
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="startAt"
                        value={form.startAt}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="endAt"
                        value={form.endAt}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Form.Check
                      type="switch"
                      label="Is Active"
                      name="isActive"
                      checked={form.isActive}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col xs={12}>
                    <hr />
                    <h6>Discount Rules</h6>
                  </Col>

                  {form.rules.map((rule, index) => (
                    <Col xs={12} key={rule._id || index}>
                      <Card className="mb-3 border">
                        <Card.Body>
                          <Row className="g-2">

                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Category ID</Form.Label>
                                <Form.Control
                                  name="category"
                                  value={rule.category}
                                  onChange={(e) => handleRuleChange(index, e)}
                                  required
                                />
                              </Form.Group>
                            </Col>

                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Discount Type</Form.Label>
                                <Form.Select
                                  name="discountType"
                                  value={rule.discountType}
                                  onChange={(e) => handleRuleChange(index, e)}
                                >
                                  <option value="percentage">Percentage</option>
                                  <option value="flat">Flat</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>

                            <Col md={3}>
                              <Form.Group>
                                <Form.Label>Discount Value</Form.Label>
                                <Form.Control
                                  type="number"
                                  name="discountValue"
                                  value={rule.discountValue}
                                  onChange={(e) => handleRuleChange(index, e)}
                                  required
                                />
                              </Form.Group>
                            </Col>

                            <Col md={1} className="d-flex align-items-end">
                              {form.rules.length > 1 && (
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => removeRule(index)}
                                >
                                  ✕
                                </Button>
                              )}
                            </Col>

                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}

                  <Col xs={12}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={addRule}
                    >
                      Add Rule
                    </Button>
                  </Col>

                  <Col xs={12}>
                    <hr />
                  </Col>

                  <Col xs={12} className="text-end">
                    <Button type="submit" variant="success">
                      Update Event
                    </Button>
                  </Col>

                </Row>
              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
