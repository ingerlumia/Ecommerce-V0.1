import React, { Fragment, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteImage, getImages } from "../../actions/websiteAction";
import {
  clearIsImageDelete,
  clearupdateImage,
} from "../../slices/websiteSlice";
import { toast } from "react-toastify";
import { clearError } from "../../slices/productsSlice";
import SideBar from "../admin/SideBar";

export function WebsiteImages() {
  const dispatch = useDispatch();
  const {
    images = [],
    error,
    isImageDelete,
    isImageupdate,
  } = useSelector((state) => state.websiteState);
  const { user } = useSelector((state) => state.authState);
  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteImage(id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error, {
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isImageDelete) {
      toast.success("Image Deleted!!!", {
        onOpen: () => {
          dispatch(clearIsImageDelete());
        },
      });
      return;
    }
    if (isImageupdate) {
      toast.success("Image Data Updated!!!", {
        onOpen: () => {
          dispatch(clearupdateImage());
        },
      });
      return;
    }
    dispatch(getImages());
  }, [dispatch, isImageDelete, isImageupdate, error]);
  return (
    <Fragment>
      <SideBar user={{ role: user?.role }} />
      <Container >
        <Row className="g-4">
          {images.map((image) => (
            <Col xs={12} md={6} lg={4}>
              <Card className="shadow border-0 h-100">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">Banner Image</span>
                  {image.isActive ? (
                    <Badge bg="success">Active</Badge>
                  ) : (
                    <Badge bg="danger">InActive</Badge>
                  )}
                </Card.Header>
                <Card.Body>
                  <Image
                    src={`${image?.image}`}
                    alt="banner"
                    fluid
                    rounded
                    className="mb-3"
                  />

                  <div className="mb-2">
                    <strong>Title:</strong> {image.title}
                  </div>
                  <div className="mb-2">
                    <strong>Alt Text:</strong> {image.altText}
                  </div>
                  <div className="mb-2">
                    <strong>Position:</strong> {image.position}
                  </div>
                  <div className="small text-muted">
                    Created At: {image.createdAt}
                  </div>
                </Card.Body>
                <Card.Footer className="d-flex gap-2">
                  <Link to={`/admin/update/WebsiteImages/${image._id}`}>
                    <Button variant="outline-primary" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Link onClick={(e) => deleteHandler(e, image._id)}>
                    <Button variant="outline-danger" size="sm">
                      Delete
                    </Button>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          ))}
          <Link to={"/admin/new/WebsiteImages"}>
            <Button variant="outline-primary" size="sm">
              Add Image
            </Button>
          </Link>
        </Row>
      </Container>
    </Fragment>
  );
}
