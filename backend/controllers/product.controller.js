import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // empty filter to find all the products
    res.json({ products });
  } catch (error) {
    console.log("Error is in getAllProducs", error.message);
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducsts = await redis.get("featured_products");
    if (featuredProducsts) {
      return res.json(JSON.parse(featuredProducsts));
    }

    // if not in redis, fetch from MongoDB
    // lean() is gonna return a plain JS object instead of a MongoDB document
    // which is good for the performance
    featuredProducsts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducsts) {
      return res.status(404).json({ message: "Избранных товаров нет." });
    }

    // store in redis for future quick access

    await redis.set("featured_products", JSON.stringify(featuredProducsts));

    res.json(featuredProducsts);
  } catch (error) {
    console.log("Error is in getFeatureProducts controller", error.message);
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

export const createProduct = async (req, res) => {
	try {
		const { name, description, price, image, category } = req.body;

		let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
		}

		const product = await Product.create({
			name,
			description,
			price,
			image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
			category,
		});

		res.status(201).json(product);
	} catch (error) {
		console.log("Error in createProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Товар не найден" });
    }
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];

      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("Deleted image from cloudinary");
      } catch (error) {
        console.log("Error deleting image from cloudinary");
      }
    }
    await Product.findOneAndDelete(req.params.id);
    res.json({ message: "Товар успешно удален" });
  } catch (error) {
    console.log("The error is in deleteProduct controller", error.message);
    res.status(5000).json({ message: "Ошибка сервера", error: error.message });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);

    res.json(products);
  } catch (error) {
    console.log("Error is in getRecommendedProducts controller", error.message);
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
	const { category } = req.params;

	try {
		const products = await Product.find({ category });
		res.json({ products });
	} catch (error) {
		console.log("Error in getProductsByCategory controller", error.message);
		res.status(500).json({ message: "Ошибка сервера", error: error.message });
	}
};


export const toggleFeaturedProduct = async (req, res) => {

  //update db
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.isFeatured = !product.isFeatured;

      const updatedProduct = await product.save();

      //update redis

      await updateFeaturedProductsCache();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ mesaage: "Товар не найден" });
    }
  } catch (error) {
    console.log("Error is in toggleFeaturedProduct controller", error.message);
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

async function updateFeaturedProductsCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console, log("Error is in updateFeaturedProductsCache function ");
  }
}
