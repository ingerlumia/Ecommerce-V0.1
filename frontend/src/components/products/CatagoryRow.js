import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCatagory } from "../../actions/featuresAction";
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";
import { clearError } from "../../slices/productsSlice";


export default function CatagoryRow() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { catagory = [], loading,error } = useSelector((state) => state.featuresState);

    useEffect(() => {
        if (error) {
              toast.error(error, {
                onOpen: () => dispatch(clearError()),
              });
              return;
            }
        dispatch(getCatagory())
    }, [dispatch,error]);

    return (
        <Fragment>
            {!catagory ? <Loader />:
        (<div className="container-fluid">
                <div
                    className="d-flex align-items-center gap-4"
                    style={{
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                        scrollbarWidth: "thin",
                    }}
                >
                    {catagory.map((cat) => (
                        <div
                            key={cat._id}
                            className="px-4 py-2 text-center fw-semibold"
                            style={{
                                borderRadius: "20px",
                                background: "#F1F3FF",
                                color: "#3F3D56",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                            }}
                            onClick={() =>
                                navigate(`/viewproducts?category=${cat._id}`)
                            }
                            onMouseEnter={(e) => {
                                e.target.style.background = "#6C63FF";
                                e.target.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = "#F1F3FF";
                                e.target.style.color = "#3F3D56";
                            }}
                        >
                            {cat.name}
                        </div>
                    ))}
                </div>
            </div>)}
        </Fragment>

    );
}
