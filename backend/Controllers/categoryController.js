import { Catagory } from "../Model/categoryModel.js"
import { statusCode } from "../Middlewar/statusCode.js";

export const createCatagory = async (req, res) => {
  try {
    // Role checking
    if (req.user.role !== "admin" && req.user.role !== "manager") {
      return res.status(403).json({
        message: "Unauthorized User",
      });
    }

    const body = req.body;

    if (Array.isArray(body)) {
      // validate all categories
      for (const cat of body) {
        if (!cat.name) {
          return res.status(400).json({
            message: "Each category must have a name",
          });
        }

        const exists = await Catagory.findOne({ name: cat.name });
        if (exists) {
          return res.status(400).json({
            message: `Category '${cat.name}' already exists`,
          });
        }
      }

      const categories = await Catagory.insertMany(body);

      return res.status(201).json({
        message: "Categories added successfully",
        categories,
      });
    }

    const { name, attributes } = body;

    if (!name) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    const existing = await Catagory.findOne({ name });
    if (existing) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = await Catagory.create({ name, attributes });

    return res.status(201).json({
      message: "Category added successfully",
      category,
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const getCatagory = async (req, res) => {
  try {
    const catagory = await Catagory.find();
    res.status(statusCode.ok).json({
      message: 'Catagory Fetched.',
      catagory
    })
  } catch (error) {
    return res.status(statusCode.server_Error).json({
      message: 'Something went wrong'
    })
  }
}

export const getSingleCatagory = async (req, res) => {
  try {
    const catId = req.body.catId;

    const catagory = await Catagory.findById(catId);
    if (!catagory) {
      return res.status(statusCode.not_Found).json({
        message: 'Catagory Not Found!!!'
      })
    }
    return res.status(statusCode.ok).json({
      message: 'Catagory Fetched.',
      catagory
    })
  } catch (error) {
    return res.status(statusCode.server_Error).json({
      message: 'Something went wrong'
    })
  }
}

export const updateCatagory = async (req, res) => {
  try {
    const catId = req.params.id;
    //Role Checking
    if (req.user.role != 'admin' && req.user.role !== 'manager') {
      return res.status(403).json({
        message: 'Unauthorized User',
      });
    }

    const catagory = await Catagory.findByIdAndUpdate(catId, req.body, {
      new: true,
      runValidators: true
    });

    return res.status(statusCode.ok).json({
      message: 'Catagory Updated!!!.',
      catagory
    })
  } catch (error) {
    return res.status(statusCode.server_Error).json({
      message: 'Something went wrong'
    })
  }
}