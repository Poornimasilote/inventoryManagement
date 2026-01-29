const cron = require("node-cron");
const Product = require("../models/productModel");

// Runs every night at 12:00 AM
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Running stock cron job...");

    const products = await Product.find();

    for (const product of products) {
      let status;

      if (product.quantity === 0) {
        status = "Out of Stock";
      } else if (product.quantity <= product.threshold) {
        status = "Low Stock";
      } else {
        status = "In Stock";
      }

      if (product.status !== status) {
        product.status = status;
        await product.save();
      }
    }

    console.log("Stock cron completed");
  } catch (err) {
    console.log("Cron error:", err.message);
  }
});


cron.schedule("0 1 * * *", async () => {
  try {
    console.log("Running expiry cron job...");

    const today = new Date();
    const next30 = new Date();
    next30.setDate(today.getDate() + 30);

    const expiring = await Product.find({
      expiryDate: { $lte: next30, $ne: null },
    });

    console.log("Expiring products:", expiring.length);
  } catch (err) {
    console.log("Expiry cron error:", err.message);
  }
});
