const { Product } = require('../model/Product');
const moment = require('moment');
const { User } = require('../model/User');
const { Order } = require('../model/Order');


exports.fetchAllProductAll = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    // Calculate the start and end dates of the current month
    const currentMonthStart = moment().startOf('month');
    const currentMonthEnd = moment().endOf('month');

    // Calculate the start and end dates of the last month
    const lastMonthStart = moment().subtract(1, 'month').startOf('month');
    const lastMonthEnd = moment().subtract(1, 'month').endOf('month');

    // Query the database for products created within this month
    const totalProductsThisMonth = await Product.countDocuments({
      createdAt: {
        $gte: currentMonthStart.toDate(),
        $lte: currentMonthEnd.toDate()
      }
    });

    // Query the database for products created within last month
    const totalProductsLastMonth = await Product.countDocuments({
      createdAt: {
        $gte: lastMonthStart.toDate(),
        $lte: lastMonthEnd.toDate()
      }
    });

    res.status(200).json({ totalProducts, totalProductsThisMonth, totalProductsLastMonth });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.fetchAllUsersAll = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    // Calculate the start and end dates of the current month
    const currentMonthStart = moment().startOf('month');
    const currentMonthEnd = moment().endOf('month');

    // Calculate the start and end dates of the last month
    const lastMonthStart = moment().subtract(1, 'month').startOf('month');
    const lastMonthEnd = moment().subtract(1, 'month').endOf('month');

    // Query the database for users created within this month
    const totalUsersThisMonth = await User.countDocuments({
      createdAt: {
        $gte: currentMonthStart.toDate(),
        $lte: currentMonthEnd.toDate()
      }
    });

    // Query the database for users created within last month
    const totalUsersLastMonth = await User.countDocuments({
      createdAt: {
        $gte: lastMonthStart.toDate(),
        $lte: lastMonthEnd.toDate()
      }
    });

    res.status(200).json({ totalUsers, totalUsersThisMonth, totalUsersLastMonth });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};





exports.fetchOrdersAll = async (req, res) => {
  try {
    // Get the total count of all orders
    const totalOrders = await Order.countDocuments();

    // Calculate the start and end dates of the current month
    const currentMonthStart = moment().startOf('month');
    const currentMonthEnd = moment().endOf('month');

    // Calculate the start and end dates of the last month
    const lastMonthStart = moment().subtract(1, 'months').startOf('month');
    const lastMonthEnd = moment().subtract(1, 'months').endOf('month');

    // Query the database for orders created within this month
    const totalOrdersThisMonth = await Order.countDocuments({
      createdAt: {
        $gte: currentMonthStart.toDate(),
        $lte: currentMonthEnd.toDate()
      }
    });

    // Query the database for orders created within the last month
    const totalOrdersLastMonth = await Order.countDocuments({
      createdAt: {
        $gte: lastMonthStart.toDate(),
        $lte: lastMonthEnd.toDate()
      }
    });

    // Return the total count of all orders, orders created this month, and orders created last month
    res.status(200).json({ totalOrders, totalOrdersThisMonth, totalOrdersLastMonth });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
