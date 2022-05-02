const express = require("express");
const { async } = require("q");
const { Customer } = require("../models/customer");
const router = express.Router();
const { Order } = require("../models/order");
const { OrderDetail } = require("../models/order");
const generateQR = require("../middlewares/gererateQR");
const { cloudinary } = require("../config/cloudinary");
const moment = require("moment");
router.get("/list", async (req, res) => {
  var orders = await Order.find()
    .populate({ path: "orderDetails" })
    .populate("customer", "name phone point")
    .populate("user", "fullname")
    .sort({ dateOrder: 1 });
  if (orders) {
    res.status(200).send(orders);
  } else {
    res.status(500).send("Bad server");
  }
});
