// env variables
import dotenv from "dotenv";

// library imports
import colors from "colors";

// model imports
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

// data imports
import products from "./data/products.js";
import users from "./data/users.js";

// connectDB function import
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // deleting all the data before importing new ones
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // create and store users object in a variable
    const createdUser = await User.insertMany(users);

    // getting the admin user
    const adminUser = createdUser[0]._id;

    // create and store sample products with admin user inside an object
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // insert the prepared data into the actual database
    await Product.insertMany(sampleProducts);

    console.log(colors.green.inverse("Data imported successfully!"));
    process.exit();
  } catch (err) {
    console.error(colors.red.inverse(`${err}`));
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // deleting all the data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(colors.green.inverse("Data deleted successfully!"));
    process.exit();
  } catch (err) {
    console.log(colors.red.inverse(`${err}`));
    process.exit(1);
  }
};

// creating a flag for the command to address which function should be executed
// we write a script in package.json to run them
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
