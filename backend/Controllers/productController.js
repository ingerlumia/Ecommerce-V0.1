import mongoose from "mongoose";
import path from "path";
import fs from "fs/promises";
import { Product } from "../Model/productModel.js";
import ApiFeatures from "../utils/apiFeatures.js";
import { statusCode } from "../Middlewar/statusCode.js";
import { fileURLToPath } from "url";
import sendMail from "../Middlewar/sendMail.js";
import slugify from "slugify";
import { Order } from "../Model/orderModel.js";
import { User } from "../Model/UserModel.js";
import { Website } from "../Model/websiteModel.js";
import { SellerLedger } from "../Model/sellerLedgerModel.js";

import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../utils/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createProduct = async (req, res) => {
  try {
    //Role Checking
    if (req.user.role !== "admin" && req.user.role !== "seller") {
      return res.status(403).json({
        message: "Unauthorized User",
      });
    }

    const {
      name,
      pricing,
      description,
      ratings,
      category,
      attributes,
      stock,
      managerEmail,
    } = req.body;
    if (!req.files) {
    return res.status(400).json({ error: "Invalid input" });
}

    const results = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer, "products")),
    );

    const images = results.map((r) => ({
      url: r.secure_url,
      public_id: r.public_id,
    }));

    const user = req.user.id;
    if (!images) {
      return res.status(statusCode.bad_Request).json({
        message: "Please select the image",
      });
    }
    let parsedAttributes = {};
    if (attributes) {
      try {
        parsedAttributes =
          typeof attributes === "string" ? JSON.parse(attributes) : attributes;
      } catch (err) {
        return res.status(400).json({ message: "Invalid attributes format" });
      }
    }

    const product = await Product.create({
      name,
      pricing: {
        mrp: pricing.mrp,
        basePrice: pricing.basePrice,
      },
      description,
      ratings,
      category,
      attributes: parsedAttributes,
      seller: {
        id: req.user._id,
        name: req.user.name,
      },
      seo: {
        metaTitle: name,
        metaDescription: description,
        slug: slugify(name, { lower: true }),
      },
      images,
      stock,
    });

    const msg = `
        Hi Manager,
        
        Seller ${req.user.name} has added a new product: ${name}.
        
        Please log in to the Manager dashboard and approve it.
        
        Thank you,
        Your E-Commerce System
          `;
    if (req.user.role == "seller") {
      await sendMail(managerEmail, "Message from sample-1", msg);
    }

    return res.status(statusCode.ok).json({
      message: "Product details added success",
      product,
    });
  } catch (err) {
    return res.status(statusCode.server_Error).json({
      eror: err.message,
    });
  }
};

// View All Product
export const viewallProducts = async (req, res) => {
  try {
    const resPerPage = 10;

    let buildQuery = () => {
      return new ApiFeatures(Product.find({ status: "active" }), req.query)
        .search()
        .filter();
    };

    const totalProductCount = await Product.countDocuments({});
    const filterdProductCount = await buildQuery().query.countDocuments({});
    let productsCount = totalProductCount;

    if (filterdProductCount !== totalProductCount) {
      productsCount = filterdProductCount;
    }

    const products = await buildQuery().pageination(resPerPage).query;

    if (!products) {
      return res.status(statusCode.bad_Request).json({
        message: "Something Went Wrong",
      });
    }

    return res.status(statusCode.ok).json({
      message: "All Products are fetched",
      count: productsCount,
      resPerPage,
      products,
    });
  } catch (error) {
    return res.status(statusCode.bad_Request).json({
      message: error.message || "internal server error",
    });
  }
};

// View Single Product

export const viewsingleProduct = async (req, res) => {
  try {
    const prodId = req.params.id;

    // invalid id
    if (!mongoose.Types.ObjectId.isValid(prodId)) {
      return res.status(statusCode.bad_Request).json({
        message: `Can't find the Product ID`,
      });
    }
    await Product.findByIdAndUpdate(
      prodId,
      { $inc: { views: 1 } },
      { runValidators: false },
    );

    const product = await Product.findById(prodId).populate(
      "reviews.user",
      "name email",
    );

    // if product Not found
    if (!product) {
      return res.status(statusCode.bad_Request).json({
        message: "Product Not Found",
      });
    }

    return res.status(statusCode.ok).json({
      message: "All Products are fetched",
      product,
    });
  } catch (error) {
    return res.status(statusCode.server_Error).json({
      message: error.message,
    });
  }
};

//Delete a single product using ID

export const deletesingleproduct = async (req, res) => {
  try {
    const userId = req.params.id;
    //Role Checking
    if (req.user.role != "admin" && req.user.role !== "seller") {
      return res.status(403).json({
        message: "Unauthorized User",
      });
    }

    // invalid id
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(statusCode.bad_Request).json({
        message: `Can't find the Product ID`,
      });
    }

    //Find product using ID
    const product = await Product.findById(userId);
    // if product Not found
    if (!product) {
      return res.status(statusCode.bad_Request).json({
        message: "Product Not Found",
      });
    }

    //Remove image from Mongoose
    const deletation = await Promise.all(
      product.images.map(async (img) => {
        const filePath = path.resolve(
          __dirname,
          "../uploads",
          path.basename(img.image),
        );
        try {
          await fs.rm(filePath);
          console.log(`Deleted: ${filePath}`);
          return { success: true, file: filePath };
        } catch (error) {
          console.log(`err: ${error.message}`);
          return { success: false, error: error.message };
        }
      }),
    );
    //Delete the Product

    const failed = deletation.filter((r) => !r.success);
    if (failed.length > 0) {
      return res.status(statusCode.not_Found).json({
        message: ` failed to delete `,
      });
    }
    await product.deleteOne();

    return res.status(statusCode.ok).json({
      message: `Successfuly deleted product.ID:${userId}`,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//Update user using user ID
export const updatesingleproduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    // Parse seller
    if (req.body.seller && typeof req.body.seller === "string") {
      req.body.seller = JSON.parse(req.body.seller);
    }

    let images = product.images || [];

    // ✅ DELETE OLD IMAGES
    if (req.body.clearImages === "true" && images.length) {
      for (const img of images) {
        if (img.public_id) {
          await deleteFromCloudinary(img.public_id);
        }
      }
      images = [];
    }

    // ✅ UPLOAD NEW IMAGES (ONLY ONCE)
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer, "products");
        images.push({
          image: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    req.body.images = images;

    // Parse attributes
    if (req.body.attributes) {
      req.body.attributes =
        typeof req.body.attributes === "string"
          ? JSON.parse(req.body.attributes)
          : req.body.attributes;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Updated Successfully",
      product: updatedProduct,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// create review

export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    const newReview = {
      user: req.user.id,
      rating,
      comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((review) => {
      return review.user.toString() == req.user.id.toString();
    });

    if (isReviewed) {
      product.reviews.forEach((review) => {
        if (review.user.toString() == req.user.id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product.reviews.push(newReview);
      product.numOfReviews = product.reviews.length;
    }

    product.ratings =
      product.reviews.reduce((acc, review) => {
        return review.rating + acc;
      }, 0) / product.reviews.length;

    //check product ratings is NaN or Not
    product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

    product.save({ validateBeforeSave: false });

    res.status(statusCode.ok).json({
      message: "reviews Posted !!!",
    });
  } catch (err) {
    return res.status(statusCode.server_Error).json({
      message: "Error in Posting Reviews",
      err: err.message,
    });
  }
};

//get product reviews

export const getReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.query.id).populate(
      "reviews.user",
      "name email",
    );

    res.status(statusCode.ok).json({
      message: "reviews",
      reviews: product.reviews,
    });
  } catch (error) {
    return res.status(statusCode.server_Error).json({
      message: error.message,
    });
  }
};

//delete product reviews

export const deleteReview = async (req, res) => {
  try {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter((review) => {
      return review._id.toString() !== req.query.id.toString();
    });

    const numOfReviews = reviews.length;
    let ratings =
      reviews.reduce((acc, review) => {
        return review.rating + acc;
      }, 0) / reviews.length;
    ratings = isNaN(ratings) ? 0 : ratings;

    await Product.findByIdAndUpdate(req.query.productId, {
      numOfReviews,
      ratings,
      reviews,
    });

    res.status(statusCode.ok).json({
      message: "Review deleted.",
    });
  } catch (error) {
    return res.status(statusCode.server_Error).json({
      message: error.message,
    });
  }
};

//Admin Controllers

export const getProducts = async (req, res) => {
  try {
    const user = req.user;
    let query = {};
    if (user.role === "seller") {
      query["seller.id"] = user._id;
    }
    const products = await Product.find(query);
    res.status(statusCode.ok).json({
      message: "Products Fetched.",
      products,
    });
  } catch (error) {
    return res.status(statusCode.server_Error).json({
      message: "Something went wrong",
    });
  }
};

export const stockUpdate = async (req, res) => {
  try {
    const prodId = req.params.id;
    if (req.user.role !== "seller") {
      return res.status(statusCode.unAuthorized).json({
        message: "UnAuthorized User",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(prodId)) {
      return res.status(statusCode.not_Found).json({
        message: "product not found",
      });
    }

    const product = await Product.findByIdAndUpdate(
      prodId,
      { stock: req.body.stock },
      {
        new: true,
        runValidators: true,
      },
    );
    return res.status(statusCode.ok).json({
      message: "Stock updated",
      product: product,
    });
  } catch (error) {
    res.status(statusCode.server_Error).json({
      err: error.message,
      message: "Internal server Error",
    });
  }
};

export const productStatusUpdate = async (req, res) => {
  try {
    const prodId = req.params.id;
    let msg;
    let sellerEmail = req.body.sellerEmail;
    let sellerName = req.body.sellerName;
    let productStatus = req.body.status;

    if (req.user.role !== "manager" && req.user.role !== "admin") {
      return res.status(statusCode.unAuthorized).json({
        message: "UnAuthorized User",
      });
    }
    if (!sellerEmail) {
      return res.status(statusCode.bad_Request).json({
        message: "Email Missing",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(prodId)) {
      return res.status(statusCode.not_Found).json({
        message: "product not found",
      });
    }
    let base_URL = process.env.Frontend_URL;
    if (process.env.NODE_ENV === "production") {
      base_URL = `${req.protocol}://${req.get("host")}`;
    }
    const product = await Product.findByIdAndUpdate(
      prodId,
      { status: req.body.status },
      {
        new: true,
        runValidators: true,
      },
    );
    let productLink = `${base_URL}/product/${product._id}`;
    let productUpdateLink = `${base_URL}/seller/updateProduct/${product._id}`;

    if (productStatus === "active") {
      msg = `
                Dear ${sellerName},

                🎉 Good news! Your product has been *Approved* by our review team.

                🛒 **Product Name:** ${product.name}

                You can now view your product using the link below:
                👉 ${productLink}

                Thank you for contributing to our marketplace.

                Best regards,
                Sample Ecommerce Team`;
    }
    if (productStatus === "rejected") {
      msg = `
            Dear ${sellerName},

            We have reviewed your product submission and unfortunately, it has been *rejected*.

            🛑 **Product Name:** $${product.name}

            After comparing the product details you submitted on our platform with the **sample product you previously sent to our company**, we found significant mismatches.

            🔍 **Reason for Rejection:**
            The features, specifications, or details listed in your new product request do not match the features of the physical sample you provided earlier. Some features appear to be:
            - Modified or updated,
            - Newly added, or
            - Removed/changed from the verified sample.

            Because of this mismatch, we cannot approve the product in its current form.

            📌 **What You Need To Do:**
            Please update your product listing so that it exactly matches the approved sample product.  
            Make sure:
            - All features are correct  
            - No extra features are added  
            - Nothing has been removed  
            - Descriptions and images match the sample  

            After updating everything, please resubmit the product for approval.

            👉 Update your product here:  
            ${productUpdateLink}

            If the details match the verified sample, your product will be approved without delay.

            Thank you for your understanding.

            Best regards,  
            Your Shop Team`;
    }

    await sendMail(sellerEmail, "Message from sample-1", msg);
    return res.status(statusCode.ok).json({
      message: "Status updated",
      product: product,
    });
  } catch (error) {
    res.status(statusCode.server_Error).json({
      err: error.message,
      message: "Internal server Error",
    });
  }
};

export const filterProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, ratings, keyword, ...attributes } =
      req.query;

    const query = {};

    // Category filter
    if (category) {
      query.category = category;
    }
    if (keyword) {
      query.name = {
        $regex: keyword,
        $options: "i",
      };
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (ratings) {
      query.ratings = { $gte: Number(ratings) };
    }

    // Attribute filters (ram, brand, storage...)
    Object.keys(attributes).forEach((key) => {
      query[`attributes.${key}`] = attributes[key];
    });

    const products = await Product.find(query)
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAllProductsCategory = async (req, res) => {
  try {
    // Role check
    if (req.user.role !== "admin" && req.user.role !== "manager") {
      return res.status(403).json({ message: "Unauthorized user" });
    }

    const { categoryId, attributes } = req.body;

    // Validation
    if (!categoryId) {
      return res.status(400).json({ message: "categoryId is required" });
    }

    const result = await Product.updateMany(
      {}, // empty filter = ALL products
      {
        $set: {
          category: categoryId,
          attributes: attributes || {},
        },
      },
    );

    return res.status(200).json({
      message: "All products updated successfully",
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const updateAllProductsStatus = async (req, res) => {
  try {
    // Role check
    if (req.user.role !== "admin" && req.user.role !== "manager") {
      return res.status(403).json({ message: "Unauthorized user" });
    }

    const { status } = req.body;

    // Validation
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const result = await Product.updateMany(
      {},
      {
        $set: {
          status: status || {},
        },
      },
    );

    return res.status(200).json({
      message: "All products updated successfully",
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const updateProductSeo = async (req, res) => {
  try {
    const prodId = req.params.id;
    const { metaTitle, metaDescription, slug } = req.body;

    const keywords = req.body.keywords || req.body["keywords[]"] || [];
    // invalid id
    if (!mongoose.Types.ObjectId.isValid(prodId)) {
      return res.status(statusCode.bad_Request).json({
        message: `Can't find the Product ID`,
      });
    }

    //Role Checking
    if (!["admin", "manager"].includes(req.user.role)) {
      return res.status(403).json({
        message: "Unauthorized User",
      });
    }

    const seoUpdate = await Product.findByIdAndUpdate(
      prodId,
      {
        $set: {
          "seo.metaTitle": metaTitle,
          "seo.metaDescription": metaDescription,
          "seo.slug": slug,
          "seo.keywords": Array.isArray(keywords) ? keywords : [keywords],
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return res
      .status(statusCode.ok)
      .json({ message: "SEO Updated Successfuly", seoUpdate });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getDashboardSummary = async (req, res) => {
  try {
    const user = req.user;
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);

    let summary = {};

    if (user.role === "seller") {
      const thisMonthRevenue = await Order.aggregate([
        {
          $match: {
            orderStatus: "Delivered",
            createdAt: {
              $gte: startOfMonth,
              $lte: endOfMonth,
            },
          },
        },
        { $unwind: "$orderItems" },
        {
          $match: {
            "orderItems.seller.id": user._id,
          },
        },
        {
          $group: {
            _id: null,
            revenue: {
              $sum: {
                $multiply: ["$orderItems.finalPrice", "$orderItems.qty"],
              },
            },
          },
        },
      ]);
      const monthrevenue = thisMonthRevenue[0]?.revenue || 0;
      summary = {
        orders: await Order.countDocuments({
          "orderItems.seller.id": user._id,
        }),
        processingOrders: await Order.countDocuments({
          "orderItems.seller.id": user._id,
          orderStatus: "processing",
        }),
        shippedOrders: await Order.countDocuments({
          "orderItems.seller.id": user._id,
          orderStatus: "shipped",
        }),
        outForDeliveryOrders: await Order.countDocuments({
          "orderItems.seller.id": user._id,
          orderStatus: "outfordelivery",
        }),
        deliveredOrders: await Order.countDocuments({
          "orderItems.seller.id": user._id,
          orderStatus: "delivered",
        }),
        cancelledOrders: await Order.countDocuments({
          "orderItems.seller.id": user._id,
          orderStatus: "cancelled",
        }),
        totalProducts: await Product.countDocuments({
          "seller.id": user._id,
        }),
        pendingProducts: await Product.countDocuments({
          "seller.id": user._id,
          status: "pending",
        }),
        activeProducts: await Product.countDocuments({
          "seller.id": user._id,
          status: "active",
        }),
        inActiveProducts: await Product.countDocuments({
          "seller.id": user._id,
          status: "inactive",
        }),
        rejectedProducts: await Product.countDocuments({
          "seller.id": user._id,
          status: "rejected",
        }),
        monthrevenue,
        revenue: await SellerLedger.aggregate([
          { $match: { seller: user._id } },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]),
        outOfStock: await Product.countDocuments({
          seller: user._id,
          stock: { $lte: 0 },
        }),
      };
    } else {
      const thisMonthRevenue = await Order.aggregate([
        {
          $match: {
            orderStatus: "Delivered",
            createdAt: {
              $gte: startOfMonth,
              $lte: endOfMonth,
            },
          },
        },
        {
          $group: {
            _id: null,
            revenue: { $sum: "$totalAmount" },
          },
        },
      ]);

      const monthrevenue = thisMonthRevenue[0]?.revenue || 0;
      const website = await Website.findOne().select("websiteviews");
      const websiteViews = website.websiteviews || 0;

      summary = {
        totalOrders: await Order.countDocuments(),
        processingOrders: await Order.countDocuments({
          orderStatus: "processing",
        }),
        shippedOrders: await Order.countDocuments({ orderStatus: "shipped" }),
        deliveredOrders: await Order.countDocuments({
          orderStatus: "delivered",
        }),
        cancelledOrders: await Order.countDocuments({
          orderStatus: "cancelled",
        }),

        totalProducts: await Product.countDocuments(),
        activeProducts: await Product.countDocuments({ status: "active" }),
        inActiveProducts: await Product.countDocuments({ status: "inactive" }),
        rejectedProducts: await Product.countDocuments({ status: "rejected" }),
        pendingProducts: await Product.countDocuments({ status: "pending" }),
        outOfStock: await Product.countDocuments({ stock: { $lte: 0 } }),

        users: await User.countDocuments(),
        sellers: await User.countDocuments({ role: "seller" }),
        managers: await User.countDocuments({ role: "manager" }),
        websiteViews,
        monthrevenue,
        revenue: await Order.aggregate([
          { $group: { _id: null, total: { $sum: "$totalAmount" } } },
        ]),
      };
    }
    return res.status(statusCode.ok).json({
      summary,
    });
  } catch (error) {
    return res.status(statusCode.server_Error).json({
      message: error.meassage,
    });
  }
};












