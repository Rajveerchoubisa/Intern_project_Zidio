import Order from "../models/orderModels.js";
import Product from "../models/productModels.js";
import User from "../models/userModels.js";

export const getAnalytics = async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ role: "customer" });
    const totalProducts = await Product.countDocuments();

    const productStats = await Product.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "orderItems.product",
          as: "orders"
        }
      },
      {
        $project: {
          name: 1,
          orderCount: { $size: "$orders" }
        }
      },
      { $sort: { orderCount: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      totalSales: totalSales[0]?.total || 0,
      totalOrders,
      totalUsers,
      totalProducts,
      topProducts: productStats
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
};
