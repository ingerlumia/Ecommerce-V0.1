import { Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import { useState } from "react";
import { getUser } from "../../actions/userAction";
import { Fragment } from "react";
import SideBar from "./SideBar";

export default function UsersComponent() {
  const { users = [], loading = true } = useSelector(
    (state) => state.userState,
  );
  const { user } = useSelector(state => state.authState);
  const dispatch = useDispatch();
  const [userrole, setUserrole] = useState("seller");
  const UserSelect = (id) => {
    dispatch(getUser(id));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
        <SideBar user={{role: user?.role}}/>
          <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <ListGroup>
              {users
                .filter((u) => u.role === userrole)
                .map((u) => (
                  <ListGroup.Item
                    key={u._id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div
                      onClick={() => UserSelect(u._id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="fw-bold">{u.name}</div>
                      <small
                        className="text-truncate d-block"
                        style={{ maxWidth: 140 }}
                      >
                        {u.email}
                      </small>
                    </div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </div>

          {/* Clear button */}
          <div className="mt-3">
            <Button variant="outline-danger" size="sm" className="w-100">
              Clear all
            </Button>
          </div>
        </>
      )}
    </Fragment>
  );
}
