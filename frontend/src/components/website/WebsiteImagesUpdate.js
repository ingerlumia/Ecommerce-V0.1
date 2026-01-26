import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Image, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {  getImages, updateImage } from "../../actions/websiteAction";

export function WebsiteImagesUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { images=[] } = useSelector((state) => state.websiteState);

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [altText, setAltText] = useState("");
  const [position, setPosition] = useState("top");
  const [isActive, setIsActive] = useState(true);
  const [preview, setPreview] = useState("");

 const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  setFile(selectedFile);

  if (selectedFile) {
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);
  }
};

  /* Load image data */
  useEffect(() => {
        
    if (!images?.length) {
      dispatch(getImages());
    } else {
      const img = images.find((i) => i._id === id);
      if (img) {
        setTitle(img.title);
        setAltText(img.altText);
        setPosition(img.position);
        setIsActive(img.isActive);
        setPreview(img.image);
        
      }
    }
  }, [images, id, dispatch]);

  const submitHandler = () => {
    const formData = new FormData();

    if (file) {
      formData.append("image", file);
    }

    formData.append("title", title);
    formData.append("altText", altText);
    formData.append("position", position);
    formData.append("isActive", isActive);
    
    dispatch(updateImage(id, formData));
    navigate("/admin/view/WebsiteImages");
  };

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow border-0">
            <Card.Header className="bg-dark text-white">
              <h5 className="mb-0">Update Website Image</h5>
            </Card.Header>
            <Card.Body className="p-4">
              {preview && (
                <div className="mb-3 text-center">
                  <Image
                    src={preview}
                    alt="preview"
                    fluid
                    rounded
                  />
                </div>
              )}

              <Row className="g-3">

                <Col xs={12}>
                  <Form.Label>Replace Image (optional)</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Col>

                <Col xs={12}>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Col>

                <Col xs={12}>
                  <Form.Label>Alt Text</Form.Label>
                  <Form.Control
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                  />
                </Col>

                <Col md={6}>
                  <Form.Label>Position</Form.Label>
                  <Form.Select
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    <option value="top">Top</option>
                    <option value="mid">Mid</option>
                    <option value="bot">Bottom</option>
                  </Form.Select>
                </Col>

                <Col md={6}>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={isActive ? "1" : "0"}
                    onChange={(e) => setIsActive(e.target.value === "1")}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </Form.Select>
                </Col>

              </Row>

              <div className="text-end mt-4">
                <Button variant="primary" onClick={submitHandler}>
                  Update Image
                </Button>
              </div>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
