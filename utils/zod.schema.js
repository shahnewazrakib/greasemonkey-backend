import { z } from "zod";

// Auth schemas
export const authSchema = z.object({
  email: z
    .string({
      message: "Email is required",
    })
    .email({
      message: "Invalid email address",
    })
    .transform((val) => val.toLowerCase()),
  password: z
    .string({
      message: "Password is required",
    })
    .min(1, {
      message: "Password is required",
    }),
});

export const emailSchema = z.object({
  email: z
    .string({
      message: "Email is required",
    })
    .email({
      message: "Invalid email address",
    })
    .transform((val) => val.toLowerCase()),
});

export const forgotPasswordSchema = z
  .object({
    newPassword: z
      .string({
        message: "New password is required",
      })
      .min(8, {
        message: "New password must be at least 8 characters",
      }),
    confirmPassword: z.string({
      message: "Confirm password is required",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Confirm password doesn't match",
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({
        message: "Current password is required",
      })
      .min(1, {
        message: "Current password is required",
      }),

    newPassword: z
      .string({
        message: "New password is required",
      })
      .min(8, {
        message: "New password must be at least 8 characters",
      }),
    confirmNewPassword: z.string({
      message: "Confirm password is required",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Confirm password doesn't match",
  });

export const personalInformationSchema = z.object({
  name: z
    .string({
      message: "Email is required",
    })
    .min(1, {
      message: "Full name is required",
    }),
  phone: z
    .string({
      message: "Phone number is required",
    })
    .min(1, {
      message: "Phone number is required",
    }),
});

// Inspector schemas
export const inspectorSchema = z.object({
  name: z
    .string({
      message: "Full name is required",
    })
    .min(1, {
      message: "Full name is required",
    }),
  email: z
    .string({
      message: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  phone: z
    .string({
      message: "Phone number is required",
    })
    .min(1, {
      message: "Phone number is required",
    }),
  role: z.enum(["admin", "inspector"], {
    message: "Invalid role",
  }),
});

export const editInspectorSchema = z.object({
  name: z
    .string({
      message: "Full name is required",
    })
    .min(1, {
      message: "Full name is required",
    }),
  email: z
    .string({
      message: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  phone: z
    .string({
      message: "Phone number is required",
    })
    .min(1, {
      message: "Phone number is required",
    }),
  role: z.enum(["admin", "inspector"], {
    message: "Invalid role",
  }),
  isActive: z.boolean({
    message: "Inspector status is required",
  }),
});

export const deleteInspectorSchema = z.object({
  transferTo: z
    .string({
      message: "Select a inspector to transfer assets",
    })
    .min(1, {
      message: "Select a inspector to transfer assets",
    }),
});


// Customer schema
export const customerSchema = z.object({
  customerName: z.string({
    message: "Customer name is required",
  }),
  customerPhone: z.string({
    message: "Customer phone number is required",
  }),
  customerEmail: z.string({
    message: "Customer email is required",
  }),
  notes: z.string({
    message: "Notes are required",
  }),
});

// Vehicle Schema
export const vehicleSchema = z.object({
  make: z.string({
    message: "Make is required",
  }),
  model: z.string({
    message: "Model is required",
  }),
  modelYear: z.string({
    message: "Model year is required",
  }),
  vin: z.string({
    message: "VIN is required",
  }),
  odometer: z
    .number({
      message: "Odometer reading is required",
    })
    .int()
    .min(0, {
      message: "Odometer reading must be a positive integer",
    })
    .nullable(),
  inspectionDate: z.string({
    message: "Inspection date is required",
  }),
  vehicleAddress: z.string({
    message: "Vehicle address is required",
  }),
  featuredPhotos: z.array(z.string()),
});

// Component schema without isAvailable
const componentSchema = z.object({
  rating: z.number().min(0).max(5),
  comment: z.string(),
  photos: z.array(z.string().url()),
});

// Component schema with isAvailable
const componentWithAvailabilitySchema = componentSchema.extend({
  isAvailable: z.boolean(),
});

export const engineSchema = z.object({
  fuelType: z.string(),
  alternator: componentSchema,
  starterMotor: componentSchema,
  waterPump: componentSchema,
  oilSump: componentSchema,
  driveBelt: componentSchema,
  radiator: componentSchema,
  engineMount: componentSchema,
  sparkPlug: componentWithAvailabilitySchema,
  injector: componentSchema,
  coils: componentSchema,
});

export const fluidSchema = z.object({
  coolant: componentSchema,
  engineOil: componentSchema,
  brakeFluid: componentSchema,
  powerSteeringFluid: componentSchema,
  wiperFluid: componentSchema,
});

export const gearboxSchema = z.object({
  transmissionType: z.string(),
  gearSelector: componentSchema,
  clutch: componentWithAvailabilitySchema,
  transmissionFluid: componentSchema,
  shiftQuality: componentSchema,
});

export const differentialSchema = z.object({
  differentialBushes: componentSchema,
  driveShaft: componentSchema,
});

export const suspensionSchema = z.object({
  frontShockAbsorbers: componentSchema,
  rearShockAbsorbers: componentSchema,
  springs: componentSchema,
  controlArms: componentSchema,
  ballJoints: componentSchema,
  bushings: componentSchema,
  swayBars: componentSchema,
  struts: componentSchema,
});

export const brakeSchema = z.object({
  frontBrakePads: componentSchema,
  rearBrakePads: componentSchema,
  frontBrakeRotors: componentSchema,
  rearBrakeRotors: componentSchema,
  brakePedal: componentSchema,
  handbrake: componentSchema,
});

export const tyreSchema = z.object({
  frontLeftTyre: componentSchema,
  frontRightTyre: componentSchema,
  rearLeftTyre: componentSchema,
  rearRightTyre: componentSchema,
  spareTyre: componentWithAvailabilitySchema,
  frontLeftWheel: componentSchema,
  frontRightWheel: componentSchema,
  rearLeftWheel: componentSchema,
  rearRightWheel: componentSchema,
  wheelAlignment: componentSchema,
});

export const exhaustSchema = z.object({
  exhaustManifold: componentSchema,
  catalyticConverter: componentSchema,
  muffler: componentSchema,
  exhaustPipes: componentSchema,
  exhaustHangers: componentSchema,
  exhaustEmissions: componentSchema,
});

export const lightSchema = z.object({
  headlight: componentSchema,
  indicator: componentSchema,
  reverseLight: componentSchema,
  fogLights: componentWithAvailabilitySchema,
  highBeam: componentSchema,
  brakeLight: componentSchema,
  taillight: componentSchema,
  numberPlateLights: componentSchema,
});

export const interiorSchema = z.object({
  seatsDriver: componentSchema,
  seatsPassenger: componentSchema,
  seatsRear: componentSchema,
  doorsDriverSide: componentSchema,
  doorsFrontLeft: componentSchema,
  doorsRearLeft: componentSchema,
  doorsRearRight: componentSchema,
  dashboard: componentSchema,
  steeringWheel: componentSchema,
  speedOdometer: componentSchema,
  airConditioning: componentSchema,
  heater: componentSchema,
});

export const exteriorSchema = z.object({
  frontBumperBar: componentSchema,
  bonnet: componentSchema,
  frontQuarterPanels: componentSchema,
  frontDoors: componentSchema,
  rearDoors: componentWithAvailabilitySchema,
  rearQuarterPanels: componentSchema,
  roofPanel: componentSchema,
  sunroofOrConvertible: componentWithAvailabilitySchema,
});

export const chassisSchema = z.object({
  aPillar: componentSchema,
  bPillar: componentSchema,
  cPillar: componentSchema,
  rearChassisRails: componentSchema,
  frontChassisRails: componentSchema,
  crossMembers: componentSchema,
});

export const historyCheckSchema = z.object({
  status: z
    .enum(["yes", "no", "unknown"], {
      message: "Invalid status",
    })
    .default("unknown"),
  comment: z.string().default(""),
  photos: z.array(z.string()).default([]),
});

export const historySchema = z.object({
  writtenOff: historyCheckSchema,
  stolenStatus: historyCheckSchema,
  financeCheck: historyCheckSchema,
  odometerCheck: historyCheckSchema,
  engineFaultCodes: historyCheckSchema,
  serviceCheck: historyCheckSchema,
});

export const inspectorCommentSchema = z.string({
  message: "Inspector comment is required",
});

export const reportStatus = z.object({
  status: z.enum(["draft", "published"], {
    message: "Invalid report status",
  }),
});


export const taskStatus = z.object({
  status: z.enum(["processing", "assigned", "completed", "cancelled"], {
    message: "Invalid task status",
  }),
});