
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Wishlist from './pages/Whishlist';
import Login from './components/user/Login';
import ProductSearch from './components/products/ProductSearch';
import Register from './components/user/Register';
import OtpVerify from './components/user/OtpVerify';
import { loadUser } from './actions/userAction';
import store from './store';
import Profile from './components/user/Profile';
import ProductedRoute from './components/Route/ProductedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import ChangePassword from './components/user/ChangePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/payment/Payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import OrderSucess from './components/cart/OrderSucess';
import UserOrders from './components/order/UserOrders';
import OrderDetails from './components/order/OrderDetails';
import Dashboard from './components/admin/Dashbord';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import UpdateOrder from './components/admin/UpdateOrder';
import UserList from './components/admin/UserList';
import UserUpdate from './components/admin/UserUpdate';
import ReviewList from './components/admin/ReviewList';
import ProductInfo from './components/products/ProductInfo';
import StockUpdate from './components/admin/StockUpdate';
import ProductApprove from './components/admin/ProductApprove';
import StockInfo from './components/admin/StockInfo';
//import { useSelector } from 'react-redux';
import NewFilterAttribute from './components/admin/NewFilterAttribute';
import ViewCatagory from './components/admin/ViewCatagory';
import ViewProducts from './components/products/ViewProducts';
import SalesEventUpdate from './components/website/SalesEventUpdate';
import SalesEvent from './components/website/SalesEvent';
import ShippingData from './components/website/ShippingData';
import ShippingDataUpdate from './components/website/ShippingDataUpdate';
import { WebsiteImages } from './components/website/WebsiteImages';
import { WebsiteImagesUpdate } from './components/website/WebsiteImagesUpdate';
import WebsiteImageNew from './components/website/WebsitImageNew';
import SalesEventNew from './components/website/SalesEventNew';
import ShippingDataNew from './components/website/ShippingDataNew';
import SeoUpdate from './components/admin/SeoUpdate';
import Notification from './components/website/Notification';
import ManagerUpdateProduct from './components/admin/ManagerUpdateProduct';


function App() {

  const [cartItems, setCartItems] = useState([]);
  const [wish, setWish] = useState([]);
  const [stripeApiKey, setstripeApiKey] = useState();
  //const {user} = useSelector(state => state.authState)

  useEffect(() => {
    store.dispatch(loadUser);

    async function getStripeApiKey() {
      try {
        const { data } = await axios.get("/api/stripeapi", {
          withCredentials: true, // important if you’re using cookies
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if JWT in localStorage
          },
        });

        setstripeApiKey(data.stripeApiKey);
      } catch (err) {
        console.error("Stripe key fetch failed:", err.response?.data || err.message);
      }
    }

    getStripeApiKey();
    fetch("/api/website/visite");
  }, [])

  return (
    <div className="App">
      <HelmetProvider>
        <Router>

          <div className="app-content">
            <ToastContainer theme='light' position="bottom-right" />
            <Header cartItems={cartItems} wish={wish} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/otpVerify" element={<OtpVerify />} />
              <Route path="/Profile" element={<ProductedRoute><Profile /></ProductedRoute>} />
              <Route path="/changepassword" element={<ProductedRoute><ChangePassword /></ProductedRoute>} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetpassword/:token" element={<ResetPassword />} />
              <Route path="/UpdateProfile" element={<UpdateProfile />} />
              <Route path="/search/:keyword" element={<ProductSearch />} />
              <Route path="/product/:id" element={<ProductInfo cartItems={cartItems} setCartItems={setCartItems} wish={wish} setWish={setWish} />} />
              <Route path="/viewproducts" element={<ViewProducts/>} />
              <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
              <Route path="/wishlist" element={<Wishlist wish={wish} setWish={setWish} cartItems={cartItems} setCartItems={setCartItems} />} />
              <Route path='/register' element={<Register />} />
              <Route path="/shipping" element={<ProductedRoute><Shipping /></ProductedRoute>} />
              <Route path="/order/confirm" element={<ProductedRoute><ConfirmOrder /></ProductedRoute>} />
              <Route path="/order/sucess" element={<ProductedRoute><OrderSucess /></ProductedRoute>} />
              <Route path="/order/userorders" element={<ProductedRoute><UserOrders /></ProductedRoute>} />
              <Route path="/order/view/:id" element={<ProductedRoute><OrderDetails /></ProductedRoute>} />
              <Route path="/order/payment" element={<ProductedRoute>{stripeApiKey ? (<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>)
                : (<div>Loading Stripe...</div>)}</ProductedRoute>} />

            <Route path="/dashboard" element={<ProductedRoute allowedRoles={['admin','seller','manager']}><Dashboard /></ProductedRoute>} />

            <Route path="/product/productlist" element={<ProductedRoute allowedRoles={['admin','seller','manager']}><ProductList /></ProductedRoute>} />
            <Route path="/product/add/product" element={<ProductedRoute allowedRoles={['admin','seller','manager']}><NewProduct /></ProductedRoute>}/>
            <Route path="/product/updateProduct/:id" element={<ProductedRoute allowedRoles={['admin','seller','manager']}><UpdateProduct /></ProductedRoute>} />

            <Route path="/order/orderlist" element={<ProductedRoute allowedRoles={['admin','seller','manager']}><OrderList /></ProductedRoute>} />
            <Route path="/order/order/:id" element={<ProductedRoute allowedRoles={['admin','seller',]}><UpdateOrder /></ProductedRoute>} />

            <Route path="/user/userlist" element={<ProductedRoute allowedRoles={['admin','manager']}><UserList /></ProductedRoute>} />
            <Route path="/user/userupdate/:id" element={<ProductedRoute allowedRoles={['admin','manager']}><UserUpdate /></ProductedRoute>} />
            <Route path="/product/reviews" element={<ProductedRoute allowedRoles={['admin','manager']}><ReviewList /></ProductedRoute>} />
            <Route path="/product/stockinfo" element={<ProductedRoute allowedRoles={['admin','manager']}><StockInfo /></ProductedRoute>} />

            <Route path="/admin/view/category" element={<ProductedRoute isAdmin={true}><ViewCatagory /></ProductedRoute>} />
            <Route path="/admin/newcategory" element={<ProductedRoute isAdmin={true}><NewFilterAttribute /></ProductedRoute>} />
            <Route path="/admin/product/SEO/:id" element={<ProductedRoute isAdmin={true}><SeoUpdate /></ProductedRoute>} />

            <Route path="/admin/view/salesEvent" element={<ProductedRoute isAdmin={true}><SalesEvent /></ProductedRoute>} />
            <Route path="/admin/new/salesEventNew" element={<ProductedRoute isAdmin={true}><SalesEventNew /></ProductedRoute>} />
            <Route path="/admin/update/salesEvent/:id" element={<ProductedRoute isAdmin={true}><SalesEventUpdate /></ProductedRoute>} />

            <Route path="/admin/view/shippingData" element={<ProductedRoute isAdmin={true}><ShippingData /></ProductedRoute>} />
            <Route path="/admin/new/shippingDataNew" element={<ProductedRoute isAdmin={true}><ShippingDataNew /></ProductedRoute>} />
            <Route path="/admin/update/shippingData/:id" element={<ProductedRoute isAdmin={true}><ShippingDataUpdate /></ProductedRoute>} />

            <Route path="/view/Notifications" element={<ProductedRoute ><Notification /></ProductedRoute>} />

            <Route path="/admin/view/WebsiteImages" element={<ProductedRoute isAdmin={true}><WebsiteImages /></ProductedRoute>} />
            <Route path="/admin/new/WebsiteImages" element={<ProductedRoute isAdmin={true}><WebsiteImageNew /></ProductedRoute>} />
            <Route path="/admin/update/WebsiteImages/:id" element={<ProductedRoute isAdmin={true}><WebsiteImagesUpdate /></ProductedRoute>} />
            <Route path="/admin/update/productStatus/:id" element={<ProductedRoute isAdmin={true}><ManagerUpdateProduct /></ProductedRoute>} />

            <Route path="/seller/stockUpdate/" element={<ProductedRoute isSeller={true}><StockUpdate /></ProductedRoute>} />

            <Route path="/manager/productapprove" element={<ProductedRoute isManager={true}><ProductApprove /></ProductedRoute>} />

          </Routes>
          </div>

        </Router>
      </HelmetProvider>
      <Footer />

    </div>
  );
}

export default App;
/*
            <Route path="/seller/dashboard" element={<ProductedRoute isSeller={true}><SellerDashbord /></ProductedRoute>} />
            <Route path="/seller/sellerproductlist" element={<ProductedRoute isSeller={true}><SellerProductList /></ProductedRoute>} />
            <Route path="/seller/selleraddproduct" element={<ProductedRoute isSeller={true}><SellerNewProduct /></ProductedRoute>} />
            <Route path="/seller/updateProduct/:id" element={<ProductedRoute isSeller={true}><SellerUpdateProduct /></ProductedRoute>} />
            <Route path="/seller/orderProductlist" element={<ProductedRoute isSeller={true}><SellerOrderList /></ProductedRoute>} />
            <Route path="/seller/order/:id" element={<ProductedRoute isSeller={true}><SellerUpdateOrder /></ProductedRoute>} />
            <Route path="/seller/reviews" element={<ProductedRoute isSeller={true}><SellerReviewList /></ProductedRoute>} />

            <Route path="/manager/userlist" element={<ProductedRoute isManager={true}><ManagerUserList /></ProductedRoute>} />
            <Route path="/manager/managerproductlist" element={<ProductedRoute isManager={true}><ManagerProductList /></ProductedRoute>} />
            <Route path="/manager/updateProduct/:id" element={<ProductedRoute isManager={true}><ManagerUpdateProduct /></ProductedRoute>} />
            <Route path="/manager/orderProductlist" element={<ProductedRoute isManager={true}><ManagerOrderList /></ProductedRoute>} />
            <Route path="/manager/reviews" element={<ProductedRoute isManager={true}><ManagerReviewList /></ProductedRoute>} />
            <Route path="/manager/stocklinfo/" element={<ProductedRoute isManager={true}><ManagerStockInfo /></ProductedRoute>} />
            <Route path="/manager/userupdate/:id" element={<ProductedRoute isManager={true}><ManagerUserUpdate /></ProductedRoute>} />

*/

/* 

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Wishlist from './pages/Whishlist';
import Login from './components/user/Login';
import ProductSearch from './components/products/ProductSearch';
import Register from './components/user/Register';
import OtpVerify from './components/user/OtpVerify';
import { loadUser } from './actions/userAction';
import store from './store';
import Profile from './components/user/Profile';
import ProductedRoute from './components/Route/ProductedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import ChangePassword from './components/user/ChangePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/payment/Payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import OrderSucess from './components/cart/OrderSucess';
import UserOrders from './components/order/UserOrders';
import OrderDetails from './components/order/OrderDetails';
import Dashboard from './components/admin/Dashbord';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import UpdateOrder from './components/admin/UpdateOrder';
import UserList from './components/admin/UserList';
import UserUpdate from './components/admin/UserUpdate';
import ReviewList from './components/admin/ReviewList';
import ProductInfo from './components/products/ProductInfo';
import SellerProductList from './components/Seller/SellerProductList';
import SellerDashbord from './components/Seller/SellerDashbord';
import SellerNewProduct from './components/Seller/SellerNewProduct';
import SellerUpdateProduct from './components/Seller/SellerUpdateProduct';
import SellerOrderList from './components/Seller/SellerOrderList';
import SellerUpdateOrder from './components/Seller/SellerUpdateOrder';
import SellerReviewList from './components/Seller/SellerReviewList';
import StockUpdate from './components/Seller/StockUpdate';
import ManagerDashbord from './components/Manager/ManagerDashbord';
import ManagerUserList from './components/Manager/ManagerUserList';
import ManagerUserUpdate from './components/Manager/ManagerUserUpdate';
import ManagerOrderList from './components/Manager/ManagerOrderList';
import ManagerProductList from './components/Manager/ManagerProductList';
import ManagerReviewList from './components/Manager/ManagerReviewList';
import ProductApprove from './components/Manager/ProductApprove';
import ManagerUpdateProduct from './components/Manager/ManagerUpdateProduct';
import ManagerStockInfo from './components/Manager/ManagerStockInfo';
import StockInfo from './components/admin/StockInfo';
import { useSelector } from 'react-redux';
import NewFilterAttribute from './components/admin/NewFilterAttribute';
import ViewCatagory from './components/admin/ViewCatagory';
import ViewProducts from './components/products/ViewProducts';





function App() {

  const [cartItems, setCartItems] = useState([]);
  const [wish, setWish] = useState([]);
  const [stripeApiKey, setstripeApiKey] = useState();
  const {user} = useSelector(state => state.authState)

  useEffect(() => {
    store.dispatch(loadUser);
    
    async function getStripeApiKey() {
      try {
        const { data } = await axios.get("/api/stripeapi", {
          withCredentials: true, // important if you’re using cookies
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if JWT in localStorage
          },
        });

        setstripeApiKey(data.stripeApiKey);
      } catch (err) {
        console.error("Stripe key fetch failed:", err.response?.data || err.message);
      }
    }

    getStripeApiKey();
    fetch("/api/website/visite");
  }, [])

  return (
    <div className="App">
      <HelmetProvider>
        <Router>

          <div>
            <ToastContainer theme='light' position="bottom-right" />
            <Header cartItems={cartItems} wish={wish} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/otpVerify" element={<OtpVerify />} />
              <Route path="/Profile" element={<ProductedRoute><Profile /></ProductedRoute>} />
              <Route path="/changepassword" element={<ProductedRoute><ChangePassword /></ProductedRoute>} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetpassword/:token" element={<ResetPassword />} />
              <Route path="/UpdateProfile" element={<UpdateProfile />} />
              <Route path="/search/:keyword" element={<ProductSearch />} />
              <Route path="/product/:id" element={<ProductInfo cartItems={cartItems} setCartItems={setCartItems} wish={wish} setWish={setWish} />} />
              <Route path="/viewproducts" element={<ViewProducts/>} />
              <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
              <Route path="/wishlist" element={<Wishlist wish={wish} setWish={setWish} cartItems={cartItems} setCartItems={setCartItems} />} />
              <Route path='/register' element={<Register />} />
              <Route path="/shipping" element={<ProductedRoute><Shipping /></ProductedRoute>} />
              <Route path="/order/confirm" element={<ProductedRoute><ConfirmOrder /></ProductedRoute>} />
              <Route path="/order/sucess" element={<ProductedRoute><OrderSucess /></ProductedRoute>} />
              <Route path="/order/userorders" element={<ProductedRoute><UserOrders /></ProductedRoute>} />
              <Route path="/order/view/:id" element={<ProductedRoute><OrderDetails /></ProductedRoute>} />
              <Route path="/order/payment" element={<ProductedRoute>{stripeApiKey ? (<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>)
                : (<div>Loading Stripe...</div>)}</ProductedRoute>} />

              
            <Route path="/admin/dashboard" element={<ProductedRoute isAdmin={true}><Dashboard /></ProductedRoute>} />
            <Route path="/admin/productlist" element={<ProductedRoute isAdmin={true}><ProductList /></ProductedRoute>} />
            <Route path="/add/product"element={<ProductedRoute allowedRoles={['admin','seller','manager']}><NewProduct /></ProductedRoute>}/>
            <Route path="/admin/updateProduct/:id" element={<ProductedRoute isAdmin={true}><UpdateProduct /></ProductedRoute>} />
            <Route path="/admin/orderlist" element={<ProductedRoute isAdmin={true}><OrderList /></ProductedRoute>} />
            <Route path="/admin/order/:id" element={<ProductedRoute isAdmin={true}><UpdateOrder /></ProductedRoute>} />
            <Route path="/admin/userlist" element={<ProductedRoute isAdmin={true}><UserList /></ProductedRoute>} />
            <Route path="/admin/userupdate/:id" element={<ProductedRoute isAdmin={true}><UserUpdate /></ProductedRoute>} />
            <Route path="/admin/reviews" element={<ProductedRoute isAdmin={true}><ReviewList /></ProductedRoute>} />
            <Route path="/admin/stockinfo" element={<ProductedRoute isAdmin={true}><StockInfo /></ProductedRoute>} />
            <Route path="/admin/view/catagory" element={<ProductedRoute isAdmin={true}><ViewCatagory /></ProductedRoute>} />
            <Route path="/admin/newcatagory" element={<ProductedRoute isAdmin={true}><NewFilterAttribute /></ProductedRoute>} />
            
        
            <Route path="/seller/dashboard" element={<ProductedRoute isSeller={true}><SellerDashbord /></ProductedRoute>} />
            <Route path="/seller/sellerproductlist" element={<ProductedRoute isSeller={true}><SellerProductList /></ProductedRoute>} />
            <Route path="/seller/selleraddproduct" element={<ProductedRoute isSeller={true}><SellerNewProduct /></ProductedRoute>} />
            <Route path="/seller/updateProduct/:id" element={<ProductedRoute isSeller={true}><SellerUpdateProduct /></ProductedRoute>} />
            <Route path="/seller/orderProductlist" element={<ProductedRoute isSeller={true}><SellerOrderList /></ProductedRoute>} />
            <Route path="/seller/order/:id" element={<ProductedRoute isSeller={true}><SellerUpdateOrder /></ProductedRoute>} />
            <Route path="/seller/reviews" element={<ProductedRoute isSeller={true}><SellerReviewList /></ProductedRoute>} />
            <Route path="/seller/stockUpdate/" element={<ProductedRoute isSeller={true}><StockUpdate /></ProductedRoute>} />
          
          
            <Route path="/manager/dashboard" element={<ProductedRoute isManager={true}><ManagerDashbord /></ProductedRoute>} />
            <Route path="/manager/userlist" element={<ProductedRoute isManager={true}><ManagerUserList /></ProductedRoute>} />
            <Route path="/manager/managerproductlist" element={<ProductedRoute isManager={true}><ManagerProductList /></ProductedRoute>} />
            <Route path="/manager/productapprove" element={<ProductedRoute isManager={true}><ProductApprove /></ProductedRoute>} />
            <Route path="/manager/updateProduct/:id" element={<ProductedRoute isManager={true}><ManagerUpdateProduct /></ProductedRoute>} />
            <Route path="/manager/orderProductlist" element={<ProductedRoute isManager={true}><ManagerOrderList /></ProductedRoute>} />
            <Route path="/manager/reviews" element={<ProductedRoute isManager={true}><ManagerReviewList /></ProductedRoute>} />
            <Route path="/manager/stocklinfo/" element={<ProductedRoute isManager={true}><ManagerStockInfo /></ProductedRoute>} />
            <Route path="/manager/userupdate/:id" element={<ProductedRoute isManager={true}><ManagerUserUpdate /></ProductedRoute>} />
          </Routes>
          </div>

        </Router>
      </HelmetProvider>
      <Footer />

    </div>
  );
}

export default App;

*/