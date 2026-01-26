import { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productsActions';
import { toast } from 'react-toastify';
import MetaData from '../components/layouts/MetaData';
import ProductCard from '../components/products/productCard';
import TopSellingProducts from '../components/products/TopSellingProducts';
import MonthlyTopProducts from '../components/products/MonthlyTopProducts';
import TrendingProducts from '../components/products/TrendingProducts';
import CatagoryRow from '../components/products/CatagoryRow';

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.productsState);
  const [currentPage, setcurrentPage] = useState(1);

  useEffect(() => {
    if (error) toast(error, { type: 'error' });

    dispatch(getProducts(null, null, null, null, currentPage));
  }, [error, dispatch, currentPage]);

return (
  <Fragment>
    <MetaData title="Home - Ecommerce" />

    {/* BANNER */}
    <div
      className="mb-4 rounded shadow-sm"
      style={{
        width: "100%",
        height: "220px",  // Reduced for mobile
        background: "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80') center/cover no-repeat",
      }}
    />

    {/* CATEGORY ROW */}
    <div className="p-3 rounded shadow-sm mb-4 bg-white">
      <CatagoryRow />
    </div>

    {/* TOP SELLING PRODUCTS */}
    <Row className="mb-4">
      <Col xs={12}>
        <section className="p-3 rounded shadow-sm bg-white">
          <h4 className="fw-bold mb-3 text-center" style={{ color: "#1E3A8A" }}>
            Top Selling Products
          </h4>
          <TopSellingProducts />
        </section>
      </Col>
    </Row>

    {/* MAIN LAYOUT - FIXED SPACING */}
    <Row className="g-3 g-md-4">
      {/* LEFT COLUMN - TRENDING WITH PROPER SPACE */}
      <Col xs={12} lg={2} className="mb-3 mb-lg-0">
        <section className="p-2 p-md-3 rounded shadow-sm bg-white h-100 min-vh-50">
          <h5 className="fw-bold mb-3 text-center" style={{ color: "#1E3A8A" }}>
            Trending This Week
          </h5>
          <TrendingProducts />
        </section>
      </Col>

      {/* RIGHT COLUMN 80% */}
      <Col xs={12} lg={10}>
        {/* Product Grid */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 mb-4">
          {products && products.slice(0, 12).map((product) => (
            <Col key={product._id}>
              <ProductCard
                product={product}
                style={{
                  minHeight: "320px",  // Slightly reduced
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              />
            </Col>
          ))}
        </div>

        {/* MONTHLY - WITH PROPER SPACE */}
        <section className="p-3 rounded shadow-sm bg-white mt-3">
          <h4 className="fw-bold mb-3" style={{ color: "#1E3A8A" }}>
            Monthly Top Products
          </h4>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
            <MonthlyTopProducts limit={8} />
          </div>
        </section>
      </Col>
    </Row>
  </Fragment>
);

}
