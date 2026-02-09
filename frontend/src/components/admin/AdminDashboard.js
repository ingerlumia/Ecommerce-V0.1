import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSummary } from "../../actions/websiteAction";
const styles = `
  .dashboard-container {
    position: relative;
    min-height: 100vh;
    background: #f8f9fa;
    overflow: hidden;
    padding: 30px;
    z-index: 1;
  }

  /* Animated Background Waves */
  .ocean { 
    height: 15%;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #f8f9fa;
    z-index: -1;
  }

  .wave {
    background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg) repeat-x; 
    position: absolute;
    top: -198px;
    width: 6400px;
    height: 198px;
    animation: wave 12s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
    transform: translate3d(0, 0, 0);
    opacity: 0.1; /* Very subtle so it's professional */
  }

  .wave:nth-of-type(2) {
    top: -175px;
    animation: wave 15s cubic-bezier(0.36, 0.45, 0.63, 0.53) -.125s infinite, swell 15s ease -1.25s infinite;
    opacity: 0.05;
  }

  @keyframes wave {
    0% { margin-left: 0; }
    100% { margin-left: -1600px; }
  }

  @keyframes swell {
    0%, 100% { transform: translate3d(0,-25px,0); }
    50% { transform: translate3d(0,5px,0); }
  }

  /* Card Glassmorphism Blend */
  .stat-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(0,0,0,0.05);
    border-radius: 20px;
    padding: 25px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(0,0,0,0.02);
  }

  .stat-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(255, 122, 0, 0.1);
    border-color: #FF7A00;
  }

  .admin-header {
    font-weight: 900;
    color: #1a1a1a;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    display: inline-block;
  }

  .admin-header::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50%;
    height: 4px;
    background: #FF7A00;
    border-radius: 10px;
  }
`;

export default function AdminDashboard() {
    const dispatch = useDispatch();
    const { summary = {} } = useSelector(state => state.websiteState);

    useEffect(() => {
        dispatch(getSummary());    
    }, [dispatch]);
         
    return (
        <div className="dashboard-container">
            <style>{styles}</style>
            
            {/* Background Animation Elements */}
            <div className="ocean">
                <div className="wave"></div>
                <div className="wave"></div>
            </div>

            <h2 className="admin-header mb-5">Admin Dashboard</h2>

            <div className="row g-4">
                {/* Revenue Section */}
                <DashboardCard title="Monthly Revenue" value={`₹${summary?.monthrevenue || 0}`} type="revenue" />
                <DashboardCard title="Total Revenue" value={`₹${summary?.revenue?.[0]?.total || 0}`} type="revenue" />
                <DashboardCard title="Visitors" value={summary.websiteViews} type="visits" />

                {/* Orders Section */}
                <DashboardCard title="Total Orders" value={summary.totalOrders} type="orders" />
                <DashboardCard title="Processing" value={summary.processingOrders} type="orders" />
                <DashboardCard title="Shipped" value={summary.shippedOrders} type="orders" />
                <DashboardCard title="Delivered" value={summary.deliveredOrders} type="orders" />
                <DashboardCard title="Cancelled" value={summary.cancelledOrders} type="danger" />
                
                {/* Inventory Section */}
                <DashboardCard title="Total Products" value={summary.totalProducts} type="stock" />
                <DashboardCard title="Out of Stock" value={summary.outOfStock} type="danger" />

                {/* Team Section */}
                <DashboardCard title="Total Users" value={summary.users} type="users" />
                <DashboardCard title="Sellers" value={summary.sellers} type="users" />
            </div>
        </div>
    );
}

function DashboardCard({ title, value, type }) {
    const getColor = () => {
        switch(type) {
            case 'revenue': return '#2ecc71';
            case 'orders': return '#3498db';
            case 'danger': return '#e74c3c';
            default: return '#FF7A00';
        }
    }

    return (
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <div className="stat-card">
                <div className="d-flex flex-column">
                    <span className="text-muted fw-bold small text-uppercase mb-2">{title}</span>
                    <h2 className="fw-900 mb-0" style={{ color: '#222', fontSize: '2rem' }}>{value}</h2>
                    <div className="mt-3" style={{ height: '4px', width: '40px', background: getColor(), borderRadius: '10px' }}></div>
                </div>
            </div>
        </div>
    );
}
