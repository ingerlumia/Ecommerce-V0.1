import { useState } from "react"
import { useNavigate } from "react-router-dom";


export default function Search() {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault();
        navigate(`/viewproducts?keyword=${keyword}`);
    }

    return (
        <div className="input-group shadow-sm rounded-pill overflow-hidden">
            <input
                type="text"
                id="search_field"
                className="form-control border-0 px-4 py-2"
                placeholder="Search products..."
                onChange={(e) => setKeyword(e.target.value)}
                style={{ fontSize: "0.95rem" }}
            />

            <button
                id="search_btn"
                className="btn px-4 d-flex align-items-center justify-content-center"
                style={{
                    backgroundColor: "#F97316",
                    borderColor: "#F97316"
                }}
                onClick={searchHandler}
            >
                <i className="fa fa-search text-white"></i>
            </button>
        </div>

    );

}