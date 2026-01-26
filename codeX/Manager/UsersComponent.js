import { Button, ListGroup } from "react-bootstrap";
import { managerGetUser } from "../../actions/managerAction";
import { useDispatch, useSelector } from "react-redux";


import Loader from "../layouts/Loader";
import { useState } from "react";


export default function UsersComponent() {
    const { users = [], loading = true, error } = useSelector(state => state.managerState);
    const dispatch = useDispatch();
    const [userrole,setUserrole] = useState('seller');
    const UserSelect = (id) => {
        dispatch(managerGetUser(id))
    }
    
      return (
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
            <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
                <ListGroup>
                  {users.map((u) => {
                    
                      if(u.role === userrole){
                    
                        return(<ListGroup.Item
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
                          
                        </ListGroup.Item>)}                    
                   
                  })}
                </ListGroup>
              </div>

              {/* Clear button */}
              <div className="mt-3">
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="w-100"
                >
                  Clear all
                </Button>
              </div>
            </>
          )}
        </>
      );
}