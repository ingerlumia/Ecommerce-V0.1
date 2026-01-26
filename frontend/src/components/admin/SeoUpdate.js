import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError, clearUpdatedProduct } from "../../slices/productsSlice";
import { toast } from "react-toastify";
import { getProduct, updateProductSeo } from "../../actions/productsActions";


export default function SeoUpdate() {
  const { isProductUpdated, loading, error, product = {} } = useSelector((state) => state.productsState);

  const dispatch = useDispatch();
  const { id } = useParams();

  const [metaTitle, setmetaTitle] = useState();
  const [metaDescription, setmetaDescription] = useState();
  const [slug, setSlug] = useState();
  const [keyword, setkeyword] = useState("");

  const submitHandler = () => {
    const formData = new FormData();
    const keywordArray = keyword.split(',').map(k => k.trim()).filter(Boolean)

    formData.append('metaTitle', metaTitle)
    formData.append('metaDescription', metaDescription)
    formData.append('slug', slug)

    keywordArray.forEach(k => {
      formData.append("keywords[]", k);
    });
    
    dispatch(updateProductSeo(id,formData))
  }

  useEffect(() => {
    if (isProductUpdated) {
      toast.success("Product SEO Updated Successfully", {
        onOpen: () => dispatch(clearUpdatedProduct()),
      });
      return;
    }

    if (error) {
      toast.error(error, {
        onOpen: () => dispatch(clearError()),
      });
      return;
    }

    dispatch(getProduct(id));
  }, [isProductUpdated, error, dispatch, id]);

  useEffect(() => {
    if (product?.seo) {
      setmetaTitle(product?.seo?.metaTitle);
      setmetaDescription(product?.seo?.metaDescription);
      setSlug(product?.seo?.slug)
      setkeyword((product?.seo?.keywords || []).join(','));
    }
  }, [product])
  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="shadow border-0">
            <Card.Header className="bg-dark text-white">
              <h5 className="mb-0">Update Product SEO</h5>
            </Card.Header>

            <Card.Body className="p-4">
              <Form >
                <Form.Group className="mb-3">
                  <Form.Label>Meta Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setmetaTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Meta Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={metaDescription}
                    onChange={(e) => setmetaDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Slug</Form.Label>
                  <Form.Control
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Keywords</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="keyword1, keyword2, keyword3"
                    value={keyword}
                    onChange={(e) => setkeyword(e.target.value)}
                  />
                  <div className="form-text">
                    Separate keywords using commas
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-end gap-2">
                  <Button variant="secondary">
                    Cancel
                  </Button>
                  <Button onClick={submitHandler} variant="success">
                    Update SEO
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
