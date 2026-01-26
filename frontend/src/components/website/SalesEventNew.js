import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../slices/productsSlice";
import { createSaleEvent } from "../../actions/salesEventAction";
import { useNavigate } from "react-router-dom";
import { clearCreatedSaleEvent } from "../../slices/saleEventSlice";

export default function SalesEventNew() {
  const dispatch = useDispatch();
  const { error, isEventCreated = false } = useSelector(state => state.saleEventState);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [rules, setRules] = useState([
    {
      category: "",
      discountType: "percentage",
      discountValue: 0
    }
  ]);

  useEffect(() => {
    if (isEventCreated) {
      toast.success('New Sale Event Created!!!', {
        onOpen: () => dispatch(clearCreatedSaleEvent())
      })
      navigate('/admin/view/salesEvent')
      return;
    }
    if (error) {
      toast.error(error, {
        onOpen: () => dispatch(clearError())
      });
    }
  }, [dispatch, isEventCreated, navigate, error]);

  const handleRuleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRules = [...rules];

    updatedRules[index][name] =
      name === "discountValue" ? Number(value) : value;

    setRules(updatedRules);
  };

  const addRule = () => {
    setRules(prev => [
      ...prev,
      {
        category: "",
        discountType: "percentage",
        discountValue: 0
      }
    ]);
  };

  const removeRule = (index) => {
    setRules(prev => prev.filter((_, i) => i !== index));
  };


  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("startAt", new Date(startAt).toISOString());
    formData.append("endAt", new Date(endAt).toISOString());
    formData.append("isActive", isActive);
    formData.append("rules", JSON.stringify(rules));

    dispatch(createSaleEvent(formData));
    
  };

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <Card className="shadow border-0">
            <Card.Header className="bg-warning">
              <h5 className="mb-0">Create Sales Event</h5>
            </Card.Header>

            <Form onSubmit={submitHandler}>
              <Card.Body className="p-4">

                {/* EVENT INFO */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Event Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={startAt}
                        onChange={(e) => setStartAt(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={endAt}
                        onChange={(e) => setEndAt(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* ACTIVE */}
                <Form.Group className="mb-4">
                  <Form.Check
                    type="switch"
                    label="Active"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                </Form.Group>

                {/* RULES */}
                <h6 className="mb-3">Discount Rules</h6>

                <Table bordered responsive>
                  <thead className="table-light">
                    <tr>
                      <th>Category ID</th>
                      <th>Discount Type</th>
                      <th>Value</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {rules.map((rule, index) => (
                      <tr key={index}>
                        <td>
                          <Form.Control
                            type="text"
                            name="category"
                            value={rule.category}
                            onChange={(e) => handleRuleChange(index, e)}
                            required
                          />
                        </td>

                        <td>
                          <Form.Select
                            name="discountType"
                            value={rule.discountType}
                            onChange={(e) => handleRuleChange(index, e)}
                          >
                            <option value="percentage">percentage</option>
                            <option value="flat">flat</option>
                          </Form.Select>
                        </td>

                        <td>
                          <Form.Control
                            type="number"
                            name="discountValue"
                            value={rule.discountValue}
                            onChange={(e) => handleRuleChange(index, e)}
                            required
                          />
                        </td>

                        <td className="text-center">
                          {rules.length > 1 && (
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeRule(index)}
                            >
                              ✕
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <Button
                  variant="outline-warning"
                  size="sm"
                  className="mb-4"
                  onClick={addRule}
                >
                  Add Rule
                </Button>

                <div className="d-flex justify-content-end">
                  <Button type="submit" variant="warning">
                    Create Sales Event
                  </Button>
                </div>

              </Card.Body>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
