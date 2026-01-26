import { Fragment} from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./dashboard.css";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import SellerDashboard from "./SellerDashboard";



export default function Dashboard() {

    const { user } = useSelector(state => state.authState);

    return (
        <Fragment>
            <div className="d-flex">
                <SideBar user={{role: user?.role}}/>

                <div className="content flex-grow-1 p-3 p-md-4">
                    {user?.role === "admin" && <AdminDashboard />}
                    {user?.role === "manager" && <AdminDashboard />}
                    {user?.role === "seller" && <SellerDashboard/>}
                </div>
            </div>
        </Fragment>
    );
}
