import { ReportCounter } from "../models/reportCounter.js";

export const generateReportgId = async () => {
  // Ensure the counter document exists
  const existingCounter = await ReportCounter.findById("reportId");
  if (!existingCounter) {
    await ReportCounter.create({ _id: "reportId", sequenceValue: 200000 });
  }

  const randomIncrement = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

  // Increment and return the next report ID
  const counter = await ReportCounter.findByIdAndUpdate(
    "reportId",
    { $inc: { sequenceValue: randomIncrement } },
    { new: true, upsert: true }
  );

  return counter.sequenceValue;
};
