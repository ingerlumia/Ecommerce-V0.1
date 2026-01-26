import {
  FaTachometerAlt,
  FaShoppingCart,
  FaBox,
  FaWarehouse,
  FaUsers,
  FaStar,
  FaListUl,
  FaAngrycreative,
  FaEmpire,
  FaStream,
  FaImages
} from "react-icons/fa";

export const SIDEBAR_MENU = [
  {
    label: "Dashboard",
    icon: FaTachometerAlt,
    path: "/dashboard",
    roles: ["admin", "manager", "seller"]
  },
  {
    label: "Orders",
    icon: FaShoppingCart,
    roles: ["admin", "manager", "seller"],
    children: [
      { label: "Order List", path: "/order/orderlist" }
    ]
  },
  {
    label: "Products",
    icon: FaBox,
    roles: ["admin", "manager"],
    children: [
      { label: "Product List", path: "/product/productlist" },
      { label: "Add Product", path: "/product/add/product" }
    ]
  },
  {
    label: "My Products",
    icon: FaBox,
    roles: ["seller"],
    children: [
      { label: "Product List", path: "/product/productlist" },
      { label: "Add Product", path: "/product/add/product" }
    ]
  },
  {
    label: "Stock",
    icon: FaWarehouse,
    path: "/seller/stockUpdate/",
    roles: ["seller"]
  },
  {
    label: "Stock",
    icon: FaWarehouse,
    path: "/product/stockinfo",
    roles: ['admin','manager']
  },
  {
    label: "Users",
    icon: FaUsers,
    path: "/user/userlist",
    roles: ["admin"]
  },
  {
    label: "Sales Events",
    icon: FaEmpire,
    path: "/admin/view/salesEvent",
    roles: ["admin"]
  },
  {
    label: "Shipping Configs",
    icon: FaStream,
    path: "/admin/view/shippingData",
    roles: ["admin"]
  },
  {
    label: "Website Images",
    icon: FaImages,
    path: "/admin/view/WebsiteImages",
    roles: ["admin"]
  },
  {
    label: "Reviews",
    icon: FaStar,
    path: "/product/reviews",
    roles: ["admin", "manager"]
  },
  {
    label: "Categories",
    icon: FaListUl,
    roles: ["admin", "manager"],
    children: [
      { label: "View Category", path: "/admin/view/category" },
      { label: "New Category", path: "/admin/newcategory" }
    ]
  },
    {
    label: "Notification's",
    icon: FaAngrycreative,
    path: "/view/Notifications",
    roles: ["admin", "manager","seller"]
  },
    
];
