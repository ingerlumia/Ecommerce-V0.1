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
  const homeStyles = `
  /* 1. Global Section Styling */
  .home-section {
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid #edf2f7;
    margin-bottom: 24px;
    padding: 20px;
    transition: box-shadow 0.3s ease;
  }

  .home-section:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }

  /* 2. Professional Headers */
  .section-title {
    font-weight: 800;
    color: #333;
    margin-bottom: 20px;
    position: relative;
    padding-left: 15px;
    border-left: 5px solid #FF7A00; /* Your Theme Color */
    text-transform: uppercase;
    font-size: 1.1rem;
    letter-spacing: 0.5px;
  }

  /* 3. Category Row Specific Fix */
  .category-strip {
    background: #fff;
    border-bottom: 2px solid #f8f9fa;
    margin-bottom: 30px;
    padding: 10px 0;
  }

  /* 4. Banner Polish */
  .hero-banner {
    width: 100%;
    height: 300px;
    border-radius: 15px;
    background: linear-gradient(45deg, rgba(255,122,0,0.1), rgba(0,0,0,0.2)), 
                url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    padding-left: 40px;
    color: white;
    margin-bottom: 30px;
  }

  @media (max-width: 768px) {
    .hero-banner { height: 180px; padding-left: 20px; }
    .section-title { font-size: 1rem; }
  }
`;
  const dispatch = useDispatch();
  const { products,  error } = useSelector((state) => state.productsState);
  const [currentPage, setcurrentPage] = useState(1);

  useEffect(() => {
    if (error) toast(error, { type: 'error' });

    dispatch(getProducts(null, null, null, null, currentPage));
  }, [error, dispatch, currentPage]);

return (
  <Fragment>
    <style>{homeStyles}</style>
    <MetaData title="Home - Best Tech Deals" />

    <Container fluid className="px-md-5">
      
      {/* 1. HERO BANNER */}
      <div className="hero-banner shadow-sm">
        <div>
          <h1 className="fw-bold mb-0" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
            Premium <span style={{color: '#FF7A00'}}>Tech</span> Store
          </h1>
          <p className="d-none d-md-block">Quality gadgets at the best prices.</p>
        </div>
      </div>

      {/* 2. CATEGORY BAR (Clean, No Border conflict) */}
      <div className="category-strip">
        <CatagoryRow />
      </div>

      {/* 3. TOP SELLING (Full Width Highlight) */}
      <section className="home-section">
        <h4 className="section-title">Top Selling Products</h4>
        <TopSellingProducts />
      </section>

      {/* 4. MAIN CONTENT AREA */}
      <Row className="g-4">
        
        {/* LEFT COLUMN: TRENDING (Sidebar Style) */}
        <Col xs={12} lg={3} xl={2}>
          <section className="home-section h-100">
            <h5 className="section-title" style={{borderLeftColor: '#333'}}>Trending</h5>
            <TrendingProducts />
          </section>
        </Col>

        {/* RIGHT COLUMN: PRODUCT GRID & MONTHLY */}
        <Col xs={12} lg={9} xl={10}>
          
          {/* Main Products Grid */}
          <div className="mb-5">
            <h4 className="section-title">New Arrivals</h4>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
              {products && products.slice(0, 12).map((product) => (
                <Col key={product._id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </div>

          {/* MONTHLY TOP PRODUCTS (Distinct Section) */}
          <section className="home-section" style={{background: '#fcfcfc'}}>
            <h4 className="section-title">Monthly Favorites</h4>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
              <MonthlyTopProducts limit={8} />
            </Row>
          </section>

        </Col>
      </Row>
    </Container>
  </Fragment>
);

}
