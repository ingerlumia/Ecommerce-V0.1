import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCatagory } from "../../actions/featuresAction";
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";
import { clearError } from "../../slices/productsSlice";

export default function CatagoryRow() {
  const styles = `
  .category-scroll-wrapper {
    background: #fff;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
  }

  .category-container {
    display: flex;
    align-items: center;
    gap: 12px;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
    padding: 5px 15px;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .category-container::-webkit-scrollbar {
    display: none;
  }

  .category-pill {
    padding: 8px 24px;
    border-radius: 50px;
    background: #f8f9fa;
    color: #444;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid #eee;
    display: inline-block;
  }

  .category-pill:hover {
    background: #FF7A00;
    color: #fff;
    border-color: #FF7A00;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 122, 0, 0.25);
  }

  .category-pill:active {
    transform: scale(0.95);
  }

  /* Glass effect for the first item or active item */
  .category-active {
    background: #FF7A00 !important;
    color: #fff !important;
    border-color: #FF7A00 !important;
  }
`;

  const dispatch = useDispatch();
  const navigate = useNavigate();
 const {
    catagory = [],
    loading,
    error,
  } = useSelector((state) => state.featuresState);

  // FIX 1: Initial Fetch - This runs exactly ONCE when the page is refreshed
  useEffect(() => {
    dispatch(getCatagory());
  }, [dispatch]); 

  // FIX 2: Error Handling - This only runs when an error actually occurs
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <style>{styles}</style>
      {/* FIX 3: Check loading or length to ensure it shows after refresh */}
      {loading || (catagory && catagory.length === 0) ? (
        <Loader />
      ) : (
        <div className="category-scroll-wrapper shadow-sm">
          <div className="container-fluid">
            <div className="category-container">
              {catagory.map((cat) => (
                <div
                  key={cat._id}
                  className="category-pill"
                  onClick={() => navigate(`/viewproducts?category=${cat._id}`)}
                >
                  {cat.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
