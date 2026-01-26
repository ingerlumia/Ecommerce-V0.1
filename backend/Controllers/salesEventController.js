import { statusCode } from "../Middlewar/statusCode.js";
import { Catagory } from "../Model/categoryModel.js";
import { Notification } from "../Model/notificationModel.js";
import { Product } from "../Model/productModel.js";
import { SaleEvent, SellerEventConsent } from "../Model/salesEventModel.js";


export const createSalesEvent = async (req, res) => {
    try {
        //Role Checking
        if (req.user.role !== 'admin' && req.user.role !== 'manager') {
            return res.status(statusCode.unAuthorized).json({
                message: 'Unauthorized User',
            });
        }

        const { name, startAt, endAt, isActive } = req.body;
        const rules = req.body.rules ? JSON.parse(req.body.rules) : [];

        const saleevent = await SaleEvent.create({
            name,
            startAt,
            endAt,
            isActive: false,
            rules
        })

        return res.status(statusCode.ok).json({
            message: 'Event details Created !!!',
            saleevent,
        })

    } catch (err) {
        return res.status(statusCode.server_Error).json({
            eror: err.message,
        })
    }
}

export const getSalesEvents = async (req, res) => {
    try {
        //Role Checking
        if (req.user.role !== 'admin' && req.user.role !== 'manager') {
            return res.status(statusCode.unAuthorized).json({
                message: 'Unauthorized User',
            });
        }
        const salesEvent = await SaleEvent.find();
        if (!salesEvent) { return res.status(statusCode.not_Found).json({ message: 'Sale Events Not Found.' }) };

        return res.status(statusCode.ok).json({
            message: "sales Events Fetched",
            salesEvent
        })
    } catch (error) {
        return res.status(statusCode.server_Error).json({
            message: error.message
        })
    }
}

export const updateSalesEvent = async (req, res) => {
    try {
        if (!['admin', 'manager'].includes(req.user.role)) {
            return res.status(statusCode.unAuthorized).json({
                message: 'Unauthorized User',
            });
        }

        const eventId = req.params.id;

        const updateData = {
            name: req.body.name,
            startAt: req.body.startAt,
            endAt: req.body.endAt,
            isActive: req.body.isActive,
            rules: req.body.rules
        };



        const saleevent = await SaleEvent.findByIdAndUpdate(
            eventId,
            updateData,
            { new: true, runValidators: true }
        );

        return res.status(statusCode.ok).json({
            message: 'Event details Updated !!!',
            saleevent,
        });


    } catch (err) {
        return res.status(statusCode.server_Error).json({
            eror: err.message,
        })
    }
}

export const deleteSalesEvent = async (req, res) => {
    try {
        const { id } = req.params;
        //Role Checking
        if (req.user.role != 'admin' && req.user.role !== 'manager') {
            return res.status(statusCode.unAuthorized).json({
                message: 'Unauthorized User',
            });
        }
        const salesEvent = await SaleEvent.findByIdAndDelete(id);

        return res.status(statusCode.ok).json({
            message: 'Event Deleted!!!.',
        })
    } catch (error) {
        return res.status(statusCode.server_Error).json({
            message: 'Something wentwrong'
        })
    }
}

export const salesEventRequest = async (req, res) => {
    try {
        //Role Checking
        if (req.user.role !== 'admin' && req.user.role !== 'manager') {
            return res.status(statusCode.unAuthorized).json({
                message: 'Unauthorized User',
            });
        }

        const { catagoryId, eventId } = req.body;

        if (!catagoryId) {
            return res.status(statusCode.not_Found).json({
                message: 'Catagory Id Not Found'
            })
        }

        const product = await Product.find({ category: catagoryId });

        const sellerIds = [...new Set(
            product.map(p => p.seller.id.toString())
        )];

        const notification = sellerIds.map(sellerId => ({
            user: sellerId,
            title: 'Sale Event Invitation',
            message: 'A new sale event is available for your category products.',
            type: 'SALE_EVENT',
            relatedId: eventId,
            catagory:catagoryId
        }));

        await Notification.insertMany(notification);

        return res.status(statusCode.ok).json({
            message: 'Sales Event details Sended !!!',
            sellersNotified: sellerIds.length
        });

    } catch (err) {
        return res.status(statusCode.server_Error).json({
            eror: err.message,
        })
    }
}

export const toggleSalesEvent = async (req, res) => {
    const { saleid } = req.body;
    console.log(saleid)
    const saleevent = await SaleEvent.findById(saleid);
    if (!saleevent) {
            return res.status(statusCode.notFound).json({
                message: "Sale event not found"
            });
        }
        console.log(saleevent)
    saleevent.isActive = !saleevent.isActive
    await saleevent.save();

    return res.status(statusCode.ok).json({
        message: `${saleevent.name} Sale On Live !!!`
    })
}

export const responedToEvent = async (req, res) => {
    const { eventId, catagoryId, status,isRead } = req.body;
    const consent = await SellerEventConsent.findOneAndUpdate({
        seller: req.user._id,
        event: eventId,
        catagory: catagoryId,
    }, { status }, { upsert: true, new: true });

    return res.status(statusCode.ok).json({
        message: `Sale Event Request Accepted!!!`
    })
}