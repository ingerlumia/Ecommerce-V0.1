import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function OrderSucess() {
  const styles = `
    .success-wrapper {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      background: #f9f9f9;
    }

    /* Floating Confetti/Snow Animation */
    .confetti {
      position: absolute;
      width: 10px;
      height: 10px;
      background: #FF7A00;
      top: -10%;
      border-radius: 50%;
      animation: fall linear infinite;
    }

    @keyframes fall {
      to { transform: translateY(110vh) rotate(360deg); }
    }

    /* Success Card */
    .success-card {
      background: #fff;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 15px 35px rgba(0,0,0,0.1);
      text-align: center;
      z-index: 10;
      max-width: 500px;
      width: 90%;
      animation: popIn 0.5s cubic-bezier(0.26, 0.53, 0.74, 1.48);
    }

    @keyframes popIn {
      0% { transform: scale(0.5); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }

    .check-icon-circle {
      width: 100px;
      height: 100px;
      background: #FF7A00;
      color: #fff;
      font-size: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin: 0 auto 1.5rem;
      box-shadow: 0 10px 20px rgba(255, 122, 0, 0.3);
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
      40% {transform: translateY(-20px);}
      60% {transform: translateY(-10px);}
    }

    .btn-track {
      background: #FF7A00;
      color: #fff;
      border: none;
      padding: 12px 30px;
      font-weight: 700;
      border-radius: 50px;
      text-decoration: none;
      transition: all 0.3s ease;
      display: inline-block;
      margin-top: 1rem;
    }

    .btn-track:hover {
      background: #E66E00;
      box-shadow: 0 5px 15px rgba(255, 122, 0, 0.4);
      color: #fff;
      transform: translateY(-2px);
    }
  `;

  // Generate 20 random confetti pieces
  const confettiPieces = Array.from({ length: 20 });

  return (
    <Fragment>
      <style>{styles}</style>
      <div className="success-wrapper">
        {/* Animated Confetti Background */}
        {confettiPieces.map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random(),
              backgroundColor: i % 2 === 0 ? "#FF7A00" : "#ffcc00"
            }}
          ></div>
        ))}

        <div className="success-card">
          <div className="check-icon-circle">
            <i className="fa fa-check"></i>
          </div>
          <h1 className="fw-bold mb-2">Order Success!</h1>
          <p className="text-muted mb-4">
            Thank you for your purchase. Your order has been placed successfully and is being processed.
          </p>
          
          <div className="p-3 bg-light rounded-3 mb-4">
            <span className="text-muted d-block small">Order Status</span>
            <strong className="text-success">Confirmed</strong>
          </div>

          <Link to="/orders" className="btn-track text-uppercase">
            <i className="fa fa-box-open me-2"></i> Track My Orders
          </Link>
          
          <div className="mt-4">
            <Link to="/" className="text-decoration-none text-muted small">
              <i className="fa fa-arrow-left me-1"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}