import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addNewImage } from "../../actions/websiteAction";
import { useNavigate } from "react-router-dom";

export default function WebsiteImageNew() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  // Handle selecting multiple files at once
  const handleMultipleFiles = (fileList) => {
    const files = Array.from(fileList);

    const mapped = files.map((file) => ({
      file,
      title: "",
      altText: "",
      position: "top",
      isActive: true,
    }));

    setImages(mapped);
  };

  const updateImage = (index, key, value) => {
    const copy = [...images];
    copy[index][key] = value;
    setImages(copy);
  };

  const submit = () => {
    if (!images.length) {
      alert("Please select images");
      return;
    }

    const formData = new FormData();

    images.forEach((img, index) => {
      formData.append("images", img.file);
      formData.append(`meta[${index}][title]`, img.title);
      formData.append(`meta[${index}][altText]`, img.altText);
      formData.append(`meta[${index}][position]`, img.position);
      formData.append(`meta[${index}][isActive]`, img.isActive);
    });

    dispatch(addNewImage(formData));
    navigate("/admin/view/WebsiteImages");
  };

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={9} lg={7}>

          {/* MULTI FILE PICKER */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Form.Group>
                <Form.Label>Select Images</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleMultipleFiles(e.target.files)}
                />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* IMAGE METADATA CARDS */}
          {images.map((img, index) => (
            <Card className="mb-4 shadow-sm" key={index}>
              <Card.Body>
                <Form>
                  <Row className="g-3">

                    <Col xs={12}>
                      <div className="fw-semibold">
                        Image {index + 1}: {img.file?.name}
                      </div>
                    </Col>

                    {/* Title */}
                    <Col md={6} xs={12}>
                      <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter image title"
                          value={img.title}
                          onChange={(e) =>
                            updateImage(index, "title", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>

                    {/* Alt Text */}
                    <Col md={6} xs={12}>
                      <Form.Group>
                        <Form.Label>Alt Text</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter alt text"
                          value={img.altText}
                          onChange={(e) =>
                            updateImage(index, "altText", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>

                    {/* Position */}
                    <Col md={6} xs={12}>
                      <Form.Group>
                        <Form.Label>Position</Form.Label>
                        <Form.Select
                          value={img.position}
                          onChange={(e) =>
                            updateImage(index, "position", e.target.value)
                          }
                        >
                          <option value="top">Top</option>
                          <option value="mid">Mid</option>
                          <option value="bot">Bottom</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {/* Active */}
                    <Col md={6} xs={12} className="d-flex align-items-center">
                      <Form.Group className="mt-4">
                        <Form.Check
                          type="switch"
                          label="Active"
                          checked={img.isActive}
                          onChange={(e) =>
                            updateImage(index, "isActive", e.target.checked)
                          }
                        />
                      </Form.Group>
                    </Col>

                  </Row>
                </Form>
              </Card.Body>
            </Card>
          ))}

          {/* SUBMIT */}
          {images.length > 0 && (
            <div className="d-flex justify-content-end">
              <Button variant="success" onClick={submit}>
                Upload Images
              </Button>
            </div>
          )}

        </Col>
      </Row>
    </Container>
  );
}
