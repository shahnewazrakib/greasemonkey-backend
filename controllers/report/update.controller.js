import { hasPermission } from "../../lib/permission.js";
import { ZodError } from "zod";
import {
  engineSchema,
  fluidSchema,
  gearboxSchema,
  differentialSchema,
  suspensionSchema,
  brakeSchema,
  tyreSchema,
  exhaustSchema,
  lightSchema,
  interiorSchema,
  exteriorSchema,
  chassisSchema,
  historySchema,
  customerSchema,
  vehicleSchema,
  inspectorCommentSchema,
} from "../../utils/zod.schema.js";
import { Report } from "../../models/report.js";

export const updateReport = async (req, res) => {
  try {
    const user = req.user;

    if (!hasPermission(user, "update:report")) {
      return res
        .status(403)
        .json({ message: "You don't have permission to update report" });
    }

    const { reportId } = req.params;

    // Validate all incoming data
    const customerData = customerSchema.parse(req.body.customer);
    const vehicleData = vehicleSchema.parse(req.body.vehicle);
    const engineData = engineSchema.parse(req.body.engine);
    const fluidData = fluidSchema.parse(req.body.fluid);
    const gearboxData = gearboxSchema.parse(req.body.gearbox);
    const differentialData = differentialSchema.parse(req.body.differential);
    const suspensionData = suspensionSchema.parse(req.body.suspension);
    const brakeData = brakeSchema.parse(req.body.brake);
    const tyreData = tyreSchema.parse(req.body.tyre);
    const exhaustData = exhaustSchema.parse(req.body.exhaust);
    const lightData = lightSchema.parse(req.body.light);
    const interiorData = interiorSchema.parse(req.body.interior);
    const exteriorData = exteriorSchema.parse(req.body.exterior);
    const chassisData = chassisSchema.parse(req.body.chassis);
    const historyCheckData = historySchema.parse(req.body.history);
    const inspectorComment = inspectorCommentSchema.parse(req.body.inspectorComment);

    const report = await Report.findById(reportId)
      .populate("assignedTo")
      .select("assignedTo");
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    if (
      user.role === "inspector" &&
      report.assignedTo._id.toString() !== user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You don't have permission to update this report" });
    }

    // Update the report
    await Report.findByIdAndUpdate(reportId, {
      $set: {
        customer: customerData,
        vehicle: vehicleData,
        engine: engineData,
        fluid: fluidData,
        gearbox: gearboxData,
        differential: differentialData,
        suspension: suspensionData,
        brake: brakeData,
        tyre: tyreData,
        exhaust: exhaustData,
        light: lightData,
        interior: interiorData,
        exterior: exteriorData,
        chassis: chassisData,
        history: historyCheckData,
        inspectorComment: inspectorComment,
      },
    });

    res.status(200).json({
      message: "Report updated",
    });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
};
