const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    date: { type: String, required: true },
    field: { type: String, required: true },
    notes: String,
    equipment: String,
    issue: String,
    parts: String,
    timeSpent: String,
    fertilizerName: String,
    quantity: String,
    duration: String,
    crop: String,
    method: String,
    area: String,
    waterSource: String,
    chemical: String,
    chemicalType: String,
    plantName: String,
    variety: String,
    number: String,
    herbicideName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
