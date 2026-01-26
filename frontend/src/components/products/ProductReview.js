
export default function ProductReview({ reviews }) {
    return (
        <div className="container my-4">

            <h4 className="mb-3">Customer Reviews</h4>

            {reviews && reviews.map(review => (
                <div className="card mb-3 shadow-sm" key={review._id}>
                    <div className="card-body">

                        {/* Rating */}
                        <div className="d-flex align-items-center mb-2">
                            <div className="progress w-50 me-3" style={{ height: "6px" }}>
                                <div
                                    className="progress-bar bg-warning"
                                    role="progressbar"
                                    style={{ width: `${review.rating / 5 * 100}%` }}
                                ></div>
                            </div>
                            <span className="text-muted small">{review.rating} / 5</span>
                        </div>

                        {/* Username */}
                        <p className="mb-1 fw-bold text-primary">
                            {review.user.name}
                        </p>

                        {/* Comment */}
                        <p className="mb-0 text-muted">
                            {review.comment}
                        </p>

                    </div>
                </div>
            ))}

        </div>
    );
}
