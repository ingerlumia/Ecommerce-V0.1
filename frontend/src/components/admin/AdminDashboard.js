import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSummary } from "../../actions/websiteAction";

export default function AdminDashboard() {
      const dispatch = useDispatch();
    
        const { summary = {} } = useSelector(state => state.websiteState);
    
        useEffect(() => {
            dispatch(getSummary());    
           
        }, [dispatch]);
         
    return (
        <>
            <h2 className="mb-4">Admin Dashboard</h2>

            <div className="row g-3">
                <DashboardCard title="Website Visits" value={summary.websiteViews}/>
                <DashboardCard title="Total Orders" value={summary.totalOrders}/>
                <DashboardCard title="Processing Orders" value={summary.processingOrders}/>
                <DashboardCard title="Shipped Orders" value={summary.shippedOrders}/>
                <DashboardCard title="Delivered Orders" value={summary.deliveredOrders}/>
                <DashboardCard title="Cancelled Orders" value={summary.cancelledOrders}/>
                
                <DashboardCard title="Month Revenue" value={summary?.monthrevenue} />
                <DashboardCard title="Total Revenue" value={summary?.revenue?.[0]?.total || 0} />
                <DashboardCard title="Products" value={summary.totalProducts}/>
                <DashboardCard title="Active/Approved Products" value={summary.activeProducts}/>
                <DashboardCard title="Pending Products" value={summary.pendingProducts}/>
                <DashboardCard title="Rejected Products" value={summary.rejectedProducts}/>
                <DashboardCard title="Out of Stock" value={summary.outOfStock}/>

                <DashboardCard title="Users" value={summary.users}/>
                <DashboardCard title="Seller's" value={summary.sellers}/>
                <DashboardCard title="Manager's" value={summary.managers}/>
            </div>
        </>
    );
}

/* Reusable Card */
function DashboardCard({ title, value }) {
    return (
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <div className="card shadow-sm text-center h-100">
                <div className="card-body d-flex flex-column justify-content-center">
                    <h6 className="text-muted">{title}</h6>
                    <h3 className="fw-bold">{value}</h3>
                </div>
            </div>
        </div>
    );
}
