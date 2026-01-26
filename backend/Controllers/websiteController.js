import { statusCode } from "../Middlewar/statusCode.js";
import { Notification } from "../Model/notificationModel.js";
import { Website } from "../Model/websiteModel.js";
import fs from 'fs';
import path from 'path';
export const visiters = async (req, res) => {
    try {
        const website = await Website.findOneAndUpdate(
            {},
            { $inc: { websiteviews: 1 } },
            { new: true, upsert: true }
        );
    
        return res.status(statusCode.ok).json({
            totalViews: website.websiteviews
        });

    } catch (err) {
        return res.status(statusCode.server_Error).json({
            message: 'Something went wrong',
            error: err.message
        });
    }
};

export const addNewImage = async (req, res) => {
    try {

        if (!['admin', 'seller', 'manager'].includes(req.user.role)) {
            return res.status(403).json({ message: 'Unauthorized User' });
        }

        const website = await Website.findOneAndUpdate(
            {},
            { $setOnInsert: { images: [] } },
            { new: true, upsert: true }
        );

        const imagesToInsert = req.files.map((file, index) => ({
            image: `/uploads/${file.filename}`,
            title: req.body.meta?.[index]?.title || '',
            altText: req.body.meta?.[index]?.altText || '',
            position: req.body.meta?.[index]?.position || 'default',
            isActive: req.body.meta?.[index]?.isActive === 'true',
            uploadedBy: req.user._id
        }));

        website.images.push(...imagesToInsert);
        await website.save();

        res.status(statusCode.ok).json({
            message: 'Images added successfully',
            images: website.images,
        });

    } catch (err) {
        res.status(statusCode.server_Error).json({
            message: err.message,
        })
    }
};

export const updateImage = async (req, res) => {
  try {
    if (!['admin', 'seller', 'manager'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Unauthorized User' });
    }

    const website = await Website.findOne();
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    const image = website.images.id(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Only replace image if a new file is uploaded
    if (req.file) {
      image.image = `/uploads/${req.file.filename}`;
    }

    image.title = req.body.title ?? image.title;
    image.altText = req.body.altText ?? image.altText;
    image.position = req.body.position ?? image.position;
    image.isActive = req.body.isActive ?? image.isActive;

    await website.save();

    res.json({
      message: 'Image updated successfully',
      image,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View All Images
export const getAllImages = async (req, res) => {
    try {
        const website = await Website.findOne();

        let images = website.images;

        if (!images || images.length === 0) {
            return res.status(statusCode.bad_Request).json({
                message: 'No Image Found',
            })
        }

        res.status(statusCode.ok).json({
            message: 'Images Fetched.',
            images
        })
    } catch (error) {
        return res.status(statusCode.server_Error).json({
            message: 'Something went wrong'
        })
    }
}

export const deleteImages = async (req, res) => {
    try {
        const { id } = req.params;
        //Role Checking
        if (req.user.role != 'admin' && req.user.role !== 'manager') {
            return res.status(statusCode.unAuthorized).json({
                message: 'Unauthorized User',
            });
        }
        const website = await Website.findOne({ "images._id": id });
        if (!website) {
            return res.status(statusCode.not_Found).json({
                message: 'Image Not Found'
            })
        };

        const image = website.images.id(id);
        const filepath = path.join(process.cwd(), image.image);

        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }

        website.images.pull(id);
        await website.save();

        return res.status(statusCode.ok).json({
            message: 'Images Deleted!!!.',
            image
        })
    } catch (error) {
        return res.status(statusCode.server_Error).json({
            message: 'Something went wrong'
        })
    }
}

// View All Product
export const getShippingData = async (req, res) => {
    try {
        const website = await Website.findOne();

        let shipping = website.shipping;

        if (!shipping || shipping.length === 0) {
            return res.status(statusCode.bad_Request).json({
                message: 'No Shipping Data',
            })
        }

        res.status(statusCode.ok).json({
            message: 'Shipping Data Fetched.',
            shipping: shipping.countries
        })
    } catch (error) {
        return res.status(statusCode.server_Error).json({
            message: 'Something went wrong'
        })
    }
}

export const getCountryById = async (req, res) => {
  try {
    const { id } = req.params; // country _id from frontend
    console.log('id',id)
    const website = await Website.findOne();
    if (!website || !website.shipping?.countries) {
      return res.status(404).json({ message: "No shipping data found" });
    }

    // Find country by _id
    let countryEntry = null;
    for (const [countryName, country] of website.shipping.countries.entries()) {
      if (String(country._id) === String(id)) {
        countryEntry = { countryName, ...country.toObject() };
        break;
      }
    }

    if (!countryEntry) {
      return res.status(404).json({ message: "Country not found" });
    }

    return res.status(statusCode.ok).json({ country: countryEntry });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const addCountryWithCouriers = async (req, res) => {
  try {
    const { countryName, countryConfig } = req.body;

    if (!countryName || !countryConfig) {
      return res.status(400).json({ message: "countryName and countryConfig are required" });
    }

    let website = await Website.findOne();
    if (!website) website = new Website({ shipping: { countries: new Map() } });
    if (!website.shipping) website.shipping = { countries: new Map() };

    if (website.shipping.countries.has(countryName)) {
      return res.status(409).json({ message: "Country already exists" });
    }

    website.shipping.countries.set(countryName, { ...countryConfig });
    await website.save();

    res.json({
      message: "Country added successfully",
      country: website.shipping.countries.get(countryName)
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateCountryAndCouriers = async (req, res) => {
  try {
    const { countryId, countryConfig } = req.body;
    
    if (!countryId || !countryConfig) {
      return res.status(400).json({ message: "countryId and countryConfig are required" });
    }

    const website = await Website.findOne();
    if (!website?.shipping?.countries) {
      return res.status(404).json({ message: "No countries found" });
    }

    // Find country by _id
    let countryEntry;
    for (const [name, country] of website.shipping.countries.entries()) {
      if (String(country._id) === String(countryId)) {
        countryEntry = { name, country };
        break;
      }
    }

    if (!countryEntry) {
      return res.status(404).json({ message: "Country not found" });
    }

    const { name, country } = countryEntry;

    // Update country fields
    if (countryConfig.currency !== undefined) country.currency = countryConfig.currency;
    if (countryConfig.zoneRates) country.zoneRates = { ...country.zoneRates, ...countryConfig.zoneRates };

    // Update or add couriers
    if (Array.isArray(countryConfig.couriers)) {
      countryConfig.couriers.forEach((incomingCourier) => {
        if (incomingCourier._id) {
          // Update existing courier
          const existingCourier = country.couriers.id(incomingCourier._id);
          if (existingCourier) Object.assign(existingCourier, incomingCourier);
        } else {
          // Add new courier
          country.couriers.push(incomingCourier);
        }
      });
    }

    website.shipping.countries.set(name, country);
    await website.save();

    res.json({ message: "Country and couriers updated successfully", country });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;

    const website = await Website.findOne();
    if (!website || !website.shipping?.countries) {
      return res.status(404).json({
        message: "No shipping data found"
      });
    }

    let countryKeyToDelete = null;

    // Find the map key using _id
    for (const [countryKey, countryValue] of website.shipping.countries.entries()) {
      if (String(countryValue._id) === String(id)) {
        countryKeyToDelete = countryKey;
        break;
      }
    }

    if (!countryKeyToDelete) {
      return res.status(404).json({
        message: "Country not found"
      });
    }

    // DELETE from Map
    website.shipping.countries.delete(countryKeyToDelete);

    // Save changes
    await website.save();

    return res.status(200).json({
      message: "Country deleted successfully",
      deletedCountry: countryKeyToDelete
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


export const shippingData = async (req, res) => {
    try {
        const { shipping } = req.body;

        if (!shipping || !shipping.countries) {
            return res.status(400).json({
                message: "shipping countries is required"
            });
        }

        let website = await Website.findOne();

        if (!website) {
            website = new Website({
                shipping: {
                    countries: new Map()
                }
            });
        }

        if (!website.shipping) {
            website.shipping = { countries: new Map() };
        }

        if (!website.shipping.countries) {
            website.shipping.countries = new Map();
        }

        Object.entries(shipping.countries).forEach(
            ([countryCode, countryConfig]) => {
                website.shipping.countries.set(countryCode, countryConfig);
            }
        );

        await website.save();

        res.status(200).json({
            message: "Shipping settings saved / updated successfully",
            shipping: website.shipping
        });
    } catch (err) {
        return res.status(statusCode.server_Error).json({
            message: err.message
        });
    };
};

export const getNotifications = async (req, res) => {
    const userId = req.user._id;

    if (!userId) {
        return res.status(statusCode.unAuthorized).json({
            message: 'Something Went Wrong..'
        })
    }

    const notifications = await Notification.find({ user: userId });
    return res.status(statusCode.ok).json({
        message: 'Notifications Fetched!!!',
        msgcount: notifications.length,
        notifications
    })
};

export const updateNotifications = async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
        return res.status(statusCode.unAuthorized).json({
            message: 'Something Went Wrong..'
        })
    }
    const {notificationId} = req.body;

    const notifications = await Notification.findByIdAndUpdate({ _id: notificationId, user: userId },
    { $set: { isRead: true } },
    { new: true });
    return res.status(statusCode.ok).json({
        message: 'Notifications Updated!!!',
        notifications
    })
};


/*
export const newOrder = async (req, res) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;

    try {
        
        let website =await Website.findOne();
        if(!website){
            website =  new Website({shipping: {}});
            await website.save();
        }
        const order = await orderpro.create({
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            user: req.user.id

        });
        order.orderItems.forEach(async orderitems => {
            await updateStock(orderitems.product, orderitems.qty);
            console.log('stock updated');
        });
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

export const createOrder = async(req,res,next) => {
    try{

        const cartitems = req.body;
        const amount = Number(cartitems.reduce((acc,item) => (acc+item.product.price*item.qty),0)).toFixed(2);
        const statusi = 'pending';

        console.log(`Amount : ${amount}`);
        const orders = await order.create({cartitems,amount,statusi});

        //Updating product stock
        cartitems.forEach( async(item) => {
            const product = await Product.findById(item.product._id);
            product.stock = product.stock - item.qty;
            await product.save();
            
        });

        return res.status(statusCode.ok).json({
            message:'order placed Successfily!!!',
            orders,
        })

    }catch(err){
        return res.status(500).json({
            message:'Something is Wrong',
            err:err.message,
        })
    }
}

*/