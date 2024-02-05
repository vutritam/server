const mongoose = require("mongoose");
const { Schema } = mongoose;
const qrCodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  locationId: { type: Schema.Types.ObjectId, ref: "Location" },
  tableNumber: {
    type: Number,
    default: 0,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  code: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("QRCodeSchema", qrCodeSchema);
