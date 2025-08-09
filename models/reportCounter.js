import mongoose from "mongoose";

const reportCounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequenceValue: { type: Number, default: 2000000 },
});

export const ReportCounter = mongoose.model("report_counter", reportCounterSchema);