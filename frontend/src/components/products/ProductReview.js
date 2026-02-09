
const styles = `
  .review-section-container {
    padding: 30px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    backdrop-filter: blur(5px);
  }

  .review-card-glass {
    background: white;
    border: 1px solid #f0f0f0;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 20px;
    transition: transform 0.2s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  }

  .review-card-glass:hover {
    transform: translateX(10px);
    border-left: 5px solid #FF7A00;
  }

  .user-avatar-initial {
    width: 40px;
    height: 40px;
    background: #FF7A00;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 15px;
  }

  .star-filled { color: #FF7A00; font-size: 0.85rem; }
  .star-empty { color: #ddd; font-size: 0.85rem; }
  
  .review-user-name {
    font-weight: 700;
    color: #333;
    margin-bottom: 0;
  }

  .review-comment {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-top: 10px;
  }
`;

export default function ProductReview({ reviews }) {
    return (
        <div className="container my-5 review-section-container">
            <style>{styles}</style>
            
            <h4 className="fw-bold mb-4" style={{ letterSpacing: '-0.5px' }}>
                Verified Customer Reviews ({reviews ? reviews.length : 0})
            </h4>

            {reviews && reviews.map(review => (
                <div className="review-card-glass" key={review._id}>
                    <div className="d-flex align-items-center mb-3">
                        {/* Avatar Initial (Professional touch) */}
                        <div className="user-avatar-initial">
                            {review.user.name.charAt(0).toUpperCase()}
                        </div>
                        
                        <div>
                            <p className="review-user-name">{review.user.name}</p>
                            {/* Stars logic based on review.rating */}
                            <div className="d-flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <i 
                                        key={star} 
                                        className={`fa fa-star ${star <= review.rating ? 'star-filled' : 'star-empty'} me-1`}
                                    ></i>
                                ))}
                                <span className="ms-2 text-muted small">({review.rating}/5)</span>
                            </div>
                        </div>
                    </div>

                    <p className="review-comment">
                        {review.comment}
                    </p>
                </div>
            ))}

            {(!reviews || reviews.length === 0) && (
                <div className="text-center py-4 text-muted">
                    <i className="fa fa-comment-slash d-block mb-2 fs-2"></i>
                    No reviews yet for this product.
                </div>
            )}
        </div>
    );
}