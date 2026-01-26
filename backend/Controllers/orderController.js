import { statusCode } from "../Middlewar/statusCode.js";
import { Order } from "../Model/orderModel.js"
import { Product } from "../Model/productModel.js";
import { SellerBalance } from "../Model/sellerBalanceModel.js";
import { SellerLedger } from "../Model/sellerLedgerModel.js";
import { User } from "../Model/UserModel.js";
import { Website } from "../Model/websiteModel.js";

const resolveFinalPrice = (product) => {
    const now = new Date();

    if (
        product.pricing.sellerDeal?.isActive &&
        product.pricing.sellerDeal?.approved &&
        now >= product.pricing.sellerDeal.startAt &&
        now <= product.pricing.sellerDeal.endAt
    ) {
        return product.pricing.sellerDeal.dealPrice;
    }

    return product.pricing.basePrice;
};

const detectZone = ({ sellerPincode, buyerPincode, sellerState, buyerState }) => {
    if (sellerPincode === buyerPincode) return 'local';
    if (sellerState === buyerState) return 'zonal';
    return 'national';
};

export const newOrder = async (req, res) => {
    const {
        orderItems,
        shippingInfo,
        paymentInfo } = req.body;

    let subtotal = 0;
    let discountAmount = 0;
    let shippingAmount = 0;
    let taxAmount = 0;
    let product;
    let finalPrice = 0;
    let qty = 1;
    const finalOrderItems = [];

    try {
        const website = await Website.findOne();
        let countryCode = shippingInfo.country;
        const country = website.shipping.countries.get(countryCode);
        if (!country) throw new Error('Shipping country not supported');
        for (const item of orderItems) {
            product = await Product.findById(item.product);
            let sellerid = product?.seller.id
            const sellerInfo = await User.findById(sellerid);

            const zone = detectZone({
                sellerPincode: sellerInfo.addresses[0].pincode,
                buyerPincode: shippingInfo.postalCode,
                sellerState: sellerInfo.addresses[0].state,
                buyerState: shippingInfo.state,
            });

            const courier = country.couriers
                .filter(c => c.isActive)
                .sort((a, b) => a.rateCard[zone] - b.rateCard[zone])[0];

            const baseRate = country.zoneRates[zone];
            const courierRate = courier.rateCard[zone];
            let amount = baseRate + courierRate


            qty = item.qty;
            if (!product) {
                return res.status(statusCode.not_Found).json({ message: 'Product Not Found!!!' });
            }
            if (product.stock < item.qty) {
                return res.status(statusCode.not_Found).json({ message: ' Insufficient Stock.' });
            }


            const originalPrice = product.pricing.basePrice;
            finalPrice = resolveFinalPrice(product);
            shippingAmount += amount * item.qty;

            subtotal += finalPrice * item.qty;
            discountAmount += (originalPrice - finalPrice) * item.qty;
            shippingAmount += product.baseShippingPrice * item.qty;

            finalOrderItems.push({
                product: product._id,
                name: product.name,
                image: product.images[0]?.image,
                qty: item.qty,
                originalPrice,
                finalPrice,
                seller: product.seller
            })

            product.stock -= item.qty;
            await product.save();
        }

        taxAmount = subtotal * 0.18;
        const totalAmount = subtotal + taxAmount + shippingAmount;

        const order = await Order.create({

            shippingInfo,
            user: req.user._id,
            orderItems: finalOrderItems,
            subtotal,
            discountAmount,
            shippingAmount,
            taxAmount,
            totalAmount,
            paymentInfo,
            paidAt: Date.now(),
            discountMeta: {
                type: discountAmount > 0 ? 'Event' : 'NONE'
            }
        });
        if (order) {
            await SellerLedger.create({
                seller: product.seller?.id,
                order: order._id,
                type: 'SALE',
                amount: totalAmount,
                category: product.category,
                region: shippingInfo.country
            });

            await SellerBalance.findOneAndUpdate(
                { seller: product.seller?.id },
                {
                    $inc: {
                        pendingBalance: finalPrice * qty,
                        totalEarned: finalPrice * qty
                    }
                },
                { upsert: true }
            );
        }
        res.status(statusCode.ok).json({
            message: 'order placed',
            order
        })
    } catch (err) {
        return res.status(statusCode.server_Error).json({
            message: err.message
        });
    };
};


//Get single order
export const getSingleOrder = async (req, res) => {

    const order = await Order.findById(req.params.id).populate('user', '_id name email');

    if (!order) {
        return res.status(statusCode.bad_Request).json({
            message: 'No orders'
        });
    };

    res.status(statusCode.ok).json({
        message: 'Order Fetched.',
        order
    });

};

//Get User orders
export const myorders = async (req, res) => {

    try {

        const orders = await Order.find({ user: req.user.id });

        if (!orders) {
            return res.status(statusCode.bad_Request).json({
                message: 'No orders'
            });
        };

        res.status(statusCode.ok).json({
            message: 'Order Fetched.',
            orders
        });
    } catch (error) {
        throw error;
    }

};

// Admin order Controller

//Get all users order
export const getAllOrder = async (req, res) => {
    let totalPrice = 0;
    const user = req.user;
    let query = {}
    
    if(user.role === 'seller'){
        query['orderItems.seller.id'] = user._id;
    }
    const order = await Order.find(query);
    if (!order) {
        return res.status(statusCode.bad_Request).json({
            message: 'No orders'
        });
    };

    order.forEach(order => {
        totalPrice += order.totalPrice;
    });

    res.status(statusCode.ok).json({
        message: 'Order Fetched.',
        totalprice: `Total Price : ${totalPrice}`,
        order
    });

};

//update order status

export const updateOrder = async (req, res) => {
    try {

        const newData = {
            orderStatus: req.body.orderStatus,
            deliverAt: Date.now()
        }
        const order = await Order.findById(req.params.id);

        if (order.orderStatus == 'delivered') {
            return res.status(statusCode.bad_Request).json({
                message: 'Order is already delivered.'
            })
        }

        if (!order) {
            return res.status(statusCode.bad_Request).json({
                message: 'Problem in Updating.'
            })
        }

        order.orderStatus = req.body.orderStatus;
        order.deliveredAt = Date.now();
        await order.save();
        await SellerBalance.findOneAndUpdate(
            { seller: order.orderItems[0].seller?.id },
            {
                $inc: {
                    pendingBalance: -order.subtotal,
                    availableBalance: order.subtotal
                }
            }
        )

        res.status(statusCode.ok).json({
            message: 'Updated Order Data.',
            order
        });

    } catch (err) {
        return res.status(statusCode.server_Error).json({
            message: 'Internal server Error',
            err: err.message
        });
    };
}

// Order Delete

export const deleteOrder = async (req, res) => {
    
    const user = req.user;
    if(!user.role === 'admin' || !user.role === 'manager'){
        return res.status(statusCode.unAuthorized).json({
            message: 'unAuthorized User'
        })
    }
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
        return res.status(statusCode.bad_Request).json({
            message: 'Order Not Found'
        });
    };

    res.status(statusCode.ok).json({
        message: 'Order Successfuly Deleted.'
    });
}

//update stock function for update order  \  if order procees status changed to delivered the update stock function update stock
async function updateStock(productId, quantity) {
    const product = await Product.findById(productId);
    console.log(product)
    product.stock = product.stock - quantity;
    product.save({ validateBeforeSave: false });
};


export const getTopSellingProducts = async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const topSelling = await Order.aggregate([
            { $unwind: "$orderItems" },

            // Convert qty string → integer
            {
                $addFields: {
                    "orderItems.qty": { $toInt: "$orderItems.qty" }
                }
            },

            // Group by product
            {
                $group: {
                    _id: "$orderItems.product",
                    totalSold: { $sum: "$orderItems.qty" }
                }
            },

            { $sort: { totalSold: -1 } },
            { $limit: 15 }
        ]);

        res.status(statusCode.ok).json({
            topSelling
        });
    } catch (error) {
        return res.status(statusCode.server_Error).json({
            message: error.message
        })
    };
}

// Orders This Month
export const getMonthlyTopProducts = async (req, res) => {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const products = await Order.aggregate([
            { $match: { createdAt: { $gte: startOfMonth } } },
            { $unwind: "$orderItems" },
            { $addFields: { "orderItems.qty": { $toInt: "$orderItems.qty" } } },
            {
                $group: {
                    _id: "$orderItems.product",
                    orderCount: { $sum: 1 },
                    qtySold: { $sum: "$orderItems.qty" }
                }
            },
            { $sort: { qtySold: -1 } }
        ]);
        res.status(statusCode.ok).json({
            products
        });

    } catch (error) {
        return res.status(statusCode.server_Error).json({
            message: error.message
        })
    }
};


//Trending Products (last 7 days)
export const getTrendingProducts = async (req, res) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const trending = await Order.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo } } },
            { $unwind: "$orderItems" },
            { $addFields: { "orderItems.qty": { $toInt: "$orderItems.qty" } } },
            {
                $group: {
                    _id: "$orderItems.product",
                    score: { $sum: "$orderItems.qty" } // Scoring based on buying activity
                }
            },
            { $sort: { score: -1 } },
            { $limit: 10 }
        ]);
        res.status(statusCode.ok).json({
            trending
        });

    } catch (error) {
        return res.status(statusCode.server_Error).json({
            message: error.message
        })
    }
};


//Recently Viewed Products (User based)
export const updateRecentlyViewed = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        await User.findByIdAndUpdate(
            userId,
            {
                $pull: { recentlyViewed: productId },
                $push: { recentlyViewed: { $each: [productId], $position: 0 } }
            }
        );

        // Limit 10
        await User.updateOne(
            { _id: userId },
            { $push: { recentlyViewed: { $each: [], $slice: 10 } } }
        );

        const user = await User.findById(userId).select("recentlyViewed");
        res.status(200).json(user.recentlyViewed);

    } catch (error) {
        return res.status(statusCode.server_Error).json({
            message: err.message
        })
    }
}

export const filterProducts = async (req, res) => {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            keyword,
            ...attrs
        } = req.query;


        let query = {};
        query.name = { $regex: keyword, $options: "i" };

        if (!filter) { return res.status(statusCode.bad_Request).json({ meassage: 'no filter key found!' }) }

        const product = await Product.find().populate("name");
        // const catagory = await Catagory.find(product.catagory);

        res.status(statusCode.ok).json({

            product,
            message: 'sucess'
        })
    } catch (error) {
        return res.status(statusCode.server_Error).json({
            message: error.err
        })
    }

}