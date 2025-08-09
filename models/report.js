import { Schema, model } from "mongoose";
import {
  brake,
  chassis,
  customer,
  differential,
  engine,
  exhaust,
  exterior,
  fluid,
  gearbox,
  history,
  interior,
  light,
  suspension,
  tyre,
  vehicle,
} from "../utils/constant.js";

const reportSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    reportId: {
      type: String,
      required: true,
      unique: [true, "Report ID must be unique. Try again"],
    },

    customer: customer,
    vehicle: vehicle,
    engine: engine,
    fluid: fluid,
    gearbox: gearbox,
    differential: differential,
    suspension: suspension,
    brake: brake,
    tyre: tyre,
    exhaust: exhaust,
    light: light,
    interior: interior,
    exterior: exterior,
    chassis: chassis,
    history: history,
    inspectorComment: {
      type: String,
      default: "",
    },
    inspectionStatus: {
      type: String,
      enum: ["processing", "assigned", "completed", "cancelled"],
      default: "processing",
    },
    reportStatus: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export const Report = model("report", reportSchema);
