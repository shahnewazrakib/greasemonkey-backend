export const vehicle = {
  make: {
    type: String,
    default: "",
  },
  model: {
    type: String,
    default: "",
  },
  modelYear: {
    type: String,
    default: "",
  },
  vin: {
    type: String,
    default: "",
  },
  odometer: {
    type: Number,
    default: null,
  },
  inspectionDate: {
    type: String,
    default: "",
  },
  vehicleAddress: {
    type: String,
    default: "",
  },

  featuredPhotos: {
    type: [String],
    default: [],
  },
};

export const customer = {
  customerName: {
    type: String,
    default: "",
  },
  customerEmail: {
    type: String,
    default: "",
    lowercase: true,
  },
  customerPhone: {
    type: String,
    default: "",
  },
  notes: {
    type: String,
    default: "",
  },
};

export const brake = {
  frontBrakePads: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Front brake pads in good condition",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  rearBrakePads: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Rear brake pads in good condition",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  frontBrakeRotors: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Front rotors smooth, no faults found",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  rearBrakeRotors: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Rear rotors in good condition",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  brakePedal: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Brake pedal firm and responsive",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  handbrake: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Handbrake holds securely",
    },
    photos: {
      type: [String],
      default: [],
    },
  },
};

export const chassis = {
  aPillar: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "A-pillar straight with no damage" },
    photos: { type: [String], default: [] },
  },

  bPillar: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "B-pillar straight with no damage" },
    photos: { type: [String], default: [] },
  },

  cPillar: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "C-pillar straight with no damage" },
    photos: { type: [String], default: [] },
  },

  rearChassisRails: {
    rating: { type: Number, default: 4.5 },
    comment: {
      type: String,
      default: "Rear chassis rails clean and free of damage",
    },
    photos: { type: [String], default: [] },
  },

  frontChassisRails: {
    rating: { type: Number, default: 4.5 },
    comment: {
      type: String,
      default: "Front chassis rails straight with no damage",
    },
    photos: { type: [String], default: [] },
  },

  crossMembers: {
    rating: { type: Number, default: 4.5 },
    comment: {
      type: String,
      default: "Cross members intact, no signs of damage",
    },
    photos: { type: [String], default: [] },
  },
};

export const differential = {
  differentialBushes: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Differential bushes in good condition",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  driveShaft: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Drive shaft secure, no faults found",
    },
    photos: {
      type: [String],
      default: [],
    },
  },
};

export const engine = {
  fuelType: {
    type: String,
    default: "",
  },
  alternator: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Charging system working well",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  starterMotor: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Starter motor operates smoothly",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  waterPump: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Water pump operating properly",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  oilSump: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Oil sump in good condition",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  driveBelt: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Drive belt in good condition",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  radiator: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Radiator functioning properly",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  engineMount: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Engine mounts secure",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  sparkPlug: {
    isAvailable: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Spark plugs in good condition",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  injector: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Injectors operating correctly",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  coils: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Coils functioning properly",
    },
    photos: {
      type: [String],
      default: [],
    },
  },
};

export const exhaust = {
  exhaustManifold: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Exhaust manifold secure, no leaks",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  catalyticConverter: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Catalytic converter intact, no faults",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  muffler: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Muffler secure, operating as expected",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  exhaustPipes: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Exhaust pipes fitted securely",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  exhaustHangers: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Hangers and brackets secure",
    },
    photos: {
      type: [String],
      default: [],
    },
  },

  exhaustEmissions: {
    rating: {
      type: Number,
      default: 4.5,
    },
    comment: {
      type: String,
      default: "Emissions normal at inspection",
    },
    photos: {
      type: [String],
      default: [],
    },
  },
};

export const exterior = {
  frontBumperBar: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Front bumper secure and well aligned" },
    photos: { type: [String], default: [] },
  },

  bonnet: {
    rating: { type: Number, default: 4.5 },
    comment: {
      type: String,
      default: "Bonnet closes properly, no damage noted",
    },
    photos: { type: [String], default: [] },
  },

  frontQuarterPanels: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Panels aligned with no damage" },
    photos: { type: [String], default: [] },
  },

  frontDoors: {
    rating: { type: Number, default: 4.5 },
    comment: {
      type: String,
      default: "Doors open and close smoothly, no damage",
    },
    photos: { type: [String], default: [] },
  },

  rearDoors: {
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Doors aligned, no damage" },
    photos: { type: [String], default: [] },
  },

  rearQuarterPanels: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Panels secure, no damage found" },
    photos: { type: [String], default: [] },
  },

  roofPanel: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Roof panel intact, no damage visible" },
    photos: { type: [String], default: [] },
  },

  sunroofOrConvertible: {
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 4.5 },
    comment: {
      type: String,
      default: "Sunroof operates smoothly, seals in good condition",
    },
    photos: { type: [String], default: [] },
  },
};

export const fluid = {
  coolant: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Coolant level and condition good" },
    photos: { type: [String], default: [] },
  },

  engineOil: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Engine oil level and condition good" },
    photos: { type: [String], default: [] },
  },

  brakeFluid: {
    rating: { type: Number, default: 4.5 },
    comment: {
      type: String,
      default: "Brake fluid level and condition good",
    },
    photos: { type: [String], default: [] },
  },

  powerSteeringFluid: {
    rating: { type: Number, default: 4.5 },
    comment: {
      type: String,
      default: "Power steering fluid checked, all good",
    },
    photos: { type: [String], default: [] },
  },

  wiperFluid: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Wiper fluid topped up and working" },
    photos: { type: [String], default: [] },
  },
};

export const gearbox = {
  transmissionType: {
    type: String,
    default: "",
  },

  gearSelector: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Gear selector operates smoothly" },
    photos: { type: [String], default: [] },
  },

  clutch: {
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 4.5 },
    comment: {
      type: String,
      default: "Clutch operation smooth and responsive",
    },
    photos: { type: [String], default: [] },
  },

  transmissionFluid: {
    rating: { type: Number, default: 4.5 },
    comment: {
      type: String,
      default: "Transmission fluid level and condition good",
    },
    photos: { type: [String], default: [] },
  },

  shiftQuality: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Shifting smooth and precise" },
    photos: { type: [String], default: [] },
  },
};

export const history = {
  writtenOff: {
    status: {
      type: String,
      enum: ["yes", "no", "unknown"],
      default: "unknown",
    },
    comment: { type: String, default: "" },
    photos: { type: [String], default: [] },
  },

  stolenStatus: {
    status: {
      type: String,
      enum: ["yes", "no", "unknown"],
      default: "unknown",
    },
    comment: { type: String, default: "" },
    photos: { type: [String], default: [] },
  },

  financeCheck: {
    status: {
      type: String,
      enum: ["yes", "no", "unknown"],
      default: "unknown",
    },
    comment: { type: String, default: "" },
    photos: { type: [String], default: [] },
  },

  odometerCheck: {
    status: {
      type: String,
      enum: ["yes", "no", "unknown"],
      default: "unknown",
    },
    comment: { type: String, default: "" },
    photos: { type: [String], default: [] },
  },

  engineFaultCodes: {
    status: {
      type: String,
      enum: ["yes", "no", "unknown"],
      default: "unknown",
    },
    comment: { type: String, default: "" },
    photos: { type: [String], default: [] },
  },
  serviceCheck: {
    status: {
      type: String,
      enum: ["yes", "no", "unknown"],
      default: "unknown",
    },
    comment: { type: String, default: "" },
    photos: { type: [String], default: [] },
  },
};

export const interior = {
  seatsDriver: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Driver seat in good condition" },
    photos: { type: [String], default: [] },
  },

  seatsPassenger: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Passenger seat in good condition" },
    photos: { type: [String], default: [] },
  },

  seatsRear: {
    rating: { type: Number, default: 4.5 },
    comment: {
      type: String,
      default: "Rear seats clean and in good condition",
    },
    photos: { type: [String], default: [] },
  },

  doorsDriverSide: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Driver door functions properly" },
    photos: { type: [String], default: [] },
  },

  doorsFrontLeft: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Front left door operates smoothly" },
    photos: { type: [String], default: [] },
  },

  doorsRearLeft: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Rear left door operates smoothly" },
    photos: { type: [String], default: [] },
  },

  doorsRearRight: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Rear right door operates smoothly" },
    photos: { type: [String], default: [] },
  },

  dashboard: {
    rating: { type: Number, default: 4.5 },
    comment: {
      type: String,
      default: "Dashboard clean and in good condition",
    },
    photos: { type: [String], default: [] },
  },

  steeringWheel: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Steering wheel intact, no wear" },
    photos: { type: [String], default: [] },
  },

  speedOdometer: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Odometer functioning accurately" },
    photos: { type: [String], default: [] },
  },

  airConditioning: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Air conditioning works well" },
    photos: { type: [String], default: [] },
  },

  heater: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Heater working as expected" },
    photos: { type: [String], default: [] },
  },
};

export const light = {
  headlight: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Headlights working correctly" },
    photos: { type: [String], default: [] },
  },

  indicator: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Indicators operating as expected" },
    photos: { type: [String], default: [] },
  },

  reverseLight: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Reverse lights working correctly" },
    photos: { type: [String], default: [] },
  },

  fogLights: {
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Fog lights operational" },
    photos: { type: [String], default: [] },
  },

  highBeam: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "High beams functioning properly" },
    photos: { type: [String], default: [] },
  },

  brakeLight: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Brake lights working correctly" },
    photos: { type: [String], default: [] },
  },

  taillight: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Taillights in good working order" },
    photos: { type: [String], default: [] },
  },

  numberPlateLights: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Number plate lights working" },
    photos: { type: [String], default: [] },
  },
};

export const suspension = {
  frontShockAbsorbers: {
    rating: { type: Number, default: 4.5 },
    comment: {
      type: String,
      default: "Front shock absorbers in good condition",
    },
    photos: { type: [String], default: [] },
  },

  rearShockAbsorbers: {
    rating: { type: Number, default: 4.5 },
    comment: {
      type: String,
      default: "Rear shock absorbers in good condition",
    },
    photos: { type: [String], default: [] },
  },

  springs: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Springs intact, no issues found" },
    photos: { type: [String], default: [] },
  },

  controlArms: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Control arms secure, good condition" },
    photos: { type: [String], default: [] },
  },

  ballJoints: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Ball joints operating smoothly" },
    photos: { type: [String], default: [] },
  },

  bushings: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Bushings fitted securely, no faults" },
    photos: { type: [String], default: [] },
  },

  swayBars: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Sway bars secure and functional" },
    photos: { type: [String], default: [] },
  },

  struts: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Struts in good condition" },
    photos: { type: [String], default: [] },
  },
};

export const tyre = {
  frontLeftTyre: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Tyre tread good, no damage" },
    photos: { type: [String], default: [] },
  },

  frontRightTyre: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Tyre tread good, no damage" },
    photos: { type: [String], default: [] },
  },

  rearLeftTyre: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Tyre tread good, no damage" },
    photos: { type: [String], default: [] },
  },

  rearRightTyre: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Tyre tread good, no damage" },
    photos: { type: [String], default: [] },
  },

  spareTyre: {
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Spare tyre in good condition" },
    photos: { type: [String], default: [] },
  },

  frontLeftWheel: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Wheel rim in good condition" },
    photos: { type: [String], default: [] },
  },

  frontRightWheel: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Wheel rim in good condition" },
    photos: { type: [String], default: [] },
  },

  rearLeftWheel: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Wheel rim in good condition" },
    photos: { type: [String], default: [] },
  },

  rearRightWheel: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Wheel rim in good condition" },
    photos: { type: [String], default: [] },
  },

  wheelAlignment: {
    rating: { type: Number, default: 4.5 },
    comment: { type: String, default: "Wheel alignment checked and good" },
    photos: { type: [String], default: [] },
  },
};

export const HISTORY_CHECKS = [
  {
    key: "writtenOff",
    label: "Written Off",
    icon: '<i class="fa-solid fa-car-burst"></i>',
    yesMessage: "Written-off incidents reported",
    noMessage: "Not recorded as written-off",
    unknownMessage: "Insufficient records available",
  },
  {
    key: "stolenStatus",
    label: "Stolen Status",
    icon: '<i class="fa-solid fa-shield-halved"></i>',
    yesMessage: "Listed as stolen",
    noMessage: "No record as stolen",
    unknownMessage: "Insufficient records available",
  },
  {
    key: "financeCheck",
    label: "Finance Check",
    icon: '<i class="fa-solid fa-dollar-sign"></i>',
    yesMessage: "Financial interests reported",
    noMessage: "No security interests reported",
    unknownMessage: "Insufficient records available",
  },
  {
    key: "odometerCheck",
    label: "Odometer Check",
    icon: '<i class="fa-solid fa-gauge"></i>',
    yesMessage: "Odometer inconsistency suspected",
    noMessage: "No odometer rollback suspected",
    unknownMessage: "Insufficient records available",
  },
  {
    key: "engineFaultCodes",
    label: "Engine/Transmission Fault Codes",
    icon: '<i class="fa-solid fa-gears"></i>',
    yesMessage: "Fault codes detected",
    noMessage: "No fault codes detected",
    unknownMessage: "Insufficient records available",
  },
  {
    key: "serviceCheck",
    label: "Service Check",
    icon: '<i class="fa-solid fa-clipboard-check"></i>',
    yesMessage: "Service records available",
    noMessage: "No service records available",
    unknownMessage: "Insufficient records available",
  },
];

export const partsLookup = {
  // Engine Parts
  alternator: "Alternator",
  starterMotor: "Starter Motor",
  waterPump: "Water Pump",
  oilSump: "Oil Sump",
  driveBelt: "Drive Belt",
  radiator: "Radiator",
  engineMount: "Engine Mount",
  sparkPlug: "Spark Plugs",
  injector: "Injectors",
  coils: "Coils",

  // Fluid Parts
  coolant: "Coolant",
  engineOil: "Engine Oil",
  brakeFluid: "Brake Fluid",
  powerSteeringFluid: "Power Steering Fluid",
  wiperFluid: "Wiper Fluid",

  // Gearbox Parts
  gearSelector: "Gear Selector",
  clutch: "Clutch",
  transmissionFluid: "Transmission Fluid",
  shiftQuality: "Shift Quality",

  // Differential Parts
  differentialBushes: "Differential Bushes",
  driveShaft: "Drive Shaft",

  // Suspension Parts
  frontShockAbsorbers: "Front Shock Absorbers",
  rearShockAbsorbers: "Rear Shock Absorbers",
  springs: "Springs",
  controlArms: "Control Arms",
  ballJoints: "Ball Joints",
  bushings: "Bushings",
  swayBars: "Sway Bars",
  struts: "Struts",

  // Brake Parts
  frontBrakePads: "Front Brake Pads",
  rearBrakePads: "Rear Brake Pads",
  frontBrakeRotors: "Front Brake Rotors",
  rearBrakeRotors: "Rear Brake Rotors",
  brakePedal: "Brake Pedal",
  handbrake: "Handbrake / Parking Brake",

  // Tyre Parts
  frontLeftTyre: "Front Left Tyre",
  frontRightTyre: "Front Right Tyre",
  rearLeftTyre: "Rear Left Tyre",
  rearRightTyre: "Rear Right Tyre",
  spareTyre: "Spare Tyre",
  frontLeftWheel: "Front Left Wheel/Rim",
  frontRightWheel: "Front Right Wheel/Rim",
  rearLeftWheel: "Rear Left Wheel/Rim",
  rearRightWheel: "Rear Right Wheel/Rim",
  wheelAlignment: "Wheel Alignment",

  // Exhaust Parts
  exhaustManifold: "Exhaust Manifold",
  catalyticConverter: "Catalytic Converter",
  muffler: "Muffler/Silencer",
  exhaustPipes: "Exhaust Pipes",
  exhaustHangers: "Exhaust Hangers/Brackets",
  exhaustEmissions: "Exhaust Emissions",

  // Light Parts
  headlight: "Headlight",
  indicator: "Indicator",
  reverseLight: "Reverse Light",
  fogLights: "Fog Lights",
  highBeam: "High Beam",
  brakeLight: "Brake Light",
  taillight: "Taillight",
  numberPlateLights: "Number Plate Lights",

  // Interior Parts
  seatsDriver: "Seats (Driver)",
  seatsPassenger: "Seats (Passenger)",
  seatsRear: "Seats (Rear)",
  doorsDriverSide: "Doors (Driver Side)",
  doorsFrontLeft: "Doors (Front Left)",
  doorsRearLeft: "Doors (Rear Left)",
  doorsRearRight: "Doors (Rear Right)",
  dashboard: "Dashboard",
  steeringWheel: "Steering Wheel",
  speedOdometer: "Speed Odometer",
  airConditioning: "Air Conditioning",
  heater: "Heater",

  // Exterior Parts
  frontBumperBar: "Front Bumper Bar",
  bonnet: "Bonnet",
  frontQuarterPanels: "Front Right / Front Left Quarter Panels",
  frontDoors: "Front Right / Front Left Doors",
  rearDoors: "Rear Right / Rear Left Doors",
  rearQuarterPanels: "Rear Right / Rear Left Quarter Panels",
  roofPanel: "Roof Panel",
  sunroofOrConvertible: "Sunroof / Convertible",

  // Chassis Parts
  aPillar: "A-Pillar",
  bPillar: "B-Pillar",
  cPillar: "C-Pillar",
  rearChassisRails: "Rear Chassis Rails",
  frontChassisRails: "Front Chassis Rails",
  crossMembers: "Cross Members",
};

export const conditionalParts = [
  "sparkPlug",
  "clutch",
  "spareTyre",
  "fogLights",
  "sunroofOrConvertible",
  "rearQuarterPanels",
];

export const weights = {
  engine: 0.2,
  brake: 0.15,
  gearbox: 0.15,
  differential: 0.1,
  suspension: 0.1,
  fluid: 0.05,
  tyre: 0.05,
  light: 0.03,
  exhaust: 0.02,
  interior: 0.04,
  exterior: 0.04,
  chassis: 0.07,
};
