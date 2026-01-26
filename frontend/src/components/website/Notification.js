import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getNotification, updateNotification } from "../../actions/websiteAction";
import { clearError } from "../../slices/productsSlice";
import { useEffect } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { responceSaleEvent } from "../../actions/salesEventAction";
import { clearupdateNotifications } from "../../slices/websiteSlice";
import SideBar from "../admin/SideBar";


const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 }
    ];

    for (const i of intervals) {
        const count = Math.floor(seconds / i.seconds);
        if (count > 0) return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
    }
    return "Just now";
};

export default function Notification() {
  const dispatch = useDispatch();

  const { notifications = [], error,isnotificationsupdate=false } = useSelector(
    (state) => state.websiteState
  );
  const { user } = useSelector(state => state.authState);

  const responseHandler = (notification, status) => {
    const payload = {
      eventId: notification.relatedId,
      catagoryId: notification.catagory,
      status
    };

let notificationId = {notificationId:notification._id};
    dispatch(responceSaleEvent(payload));
    dispatch(updateNotification(notificationId));
  };

  useEffect(() => {
  if (error) {
    toast.error(error);
    dispatch(clearError());
    return;
  }

  if (isnotificationsupdate) {
    toast.success("Notification updated successfully");
    dispatch(clearupdateNotifications());
    dispatch(getNotification());
    return;
  }

  dispatch(getNotification());
}, [dispatch, error, isnotificationsupdate]);


  return (
    <Container fluid className="py-4">
    <SideBar user={{role: user?.role}}/>
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <h4 className="mb-4 fw-semibold">Notifications</h4>

          {notifications.length === 0 && (
            <Card className="text-center p-4 shadow-sm">
              <Card.Body>
                <p className="mb-0 text-muted">
                  No notifications available
                </p>
              </Card.Body>
            </Card>
          )}

          {Array.isArray(notifications) &&notifications.map((notification) => (
            <Card
              key={notification._id}
              className={`mb-3 shadow-sm border ${
                notification.isRead ? "" : "border-warning"
              }`}
            >
              <Card.Body>
                <Row className="align-items-start">
                  <Col xs={12} md={9}>
                    <div className="d-flex align-items-center mb-1">
                      <h6 className="mb-0 fw-semibold">
                        {notification.title}
                      </h6>

                      {!notification.isRead && (
                        <Badge bg="warning" text="dark" className="ms-2">
                          New
                        </Badge>
                      )}
                    </div>

                    <p className="mb-2 text-muted small">
                      {notification.message}
                    </p>

                    <div className="d-flex flex-wrap gap-2 small">
                      <Badge bg="secondary">
                        {notification.type}
                      </Badge>

                      <span className="text-muted">
                        Category ID: {notification.catagory}
                      </span>
                    </div>
                  </Col>

                  <Col xs={12} md={3} className="text-md-end mt-2 mt-md-0">
                    <small className="text-muted">
                      {timeAgo(notification.createdAt)}
                    </small>
                  </Col>
                </Row>

                {/* ACTION BUTTONS */}
                {!notification.isRead && (
                  <div className="mt-3 d-flex gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() =>
                        responseHandler(notification, "accepted")
                      }
                    >
                      Accept
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() =>
                        responseHandler(notification, "rejected")
                      }
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
