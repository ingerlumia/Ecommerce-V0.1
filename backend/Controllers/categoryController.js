import { Catagory } from "../Model/categoryModel.js"
import { statusCode } from "../Middlewar/statusCode.js";
import slugify from "slugify";
const generateUniqueSlug = async (name) => {
  let baseSlug = slugify(name, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;

  while (await Catagory.findOne({ "seo.slug": slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
};

export const createCatagory = async (req, res) => {
  try {
    // Role authorization
    if (!req.user || !["admin", "manager"].includes(req.user.role)) {
      return res.status(403).json({
        message: "Unauthorized User",
      });
    }

    const body = req.body;

    if (Array.isArray(body)) {
      const formattedCategories = [];

      for (const cat of body) {
        if (!cat.name) {
          return res.status(400).json({
            message: "Each category must have a name",
          });
        }

        const existing = await Catagory.findOne({ name: cat.name });
        if (existing) {
          return res.status(400).json({
            message: `Category '${cat.name}' already exists`,
          });
        }

        const slug = await generateUniqueSlug(cat.name);

        formattedCategories.push({
          name: cat.name,
          attributes: cat.attributes || [],
          seo: {
            slug,
            metaTitle: cat.name,
            metaDescription: cat.seo?.metaDescription || "",
            keywords: cat.seo?.keywords || [],
          },
        });
      }

      const categories = await Catagory.insertMany(formattedCategories);

      return res.status(201).json({
        message: "Categories added successfully",
        categories,
      });
    }


    const { name, attributes = [] } = body;

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

    const slug = await generateUniqueSlug(name);

    const category = await Catagory.create({
      name,
      attributes,
      seo: {
        slug,
        metaTitle: name,
      },
    });

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
