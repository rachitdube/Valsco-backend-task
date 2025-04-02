import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product.model.js";
import User from "./models/user.model.js";
import { products } from "./data/product.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    //clear previous databse
    await Product.deleteMany();
    await User.deleteMany();

    //create a default admin user
    const createdUser = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: "123456@",
      role: "admin",
    });

    //assign the user id to the products
    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    //insert the products into the database
    await Product.insertMany(sampleProducts);
    console.log("Data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data", error);
    process.exit(1);
  }
};

seedData();
