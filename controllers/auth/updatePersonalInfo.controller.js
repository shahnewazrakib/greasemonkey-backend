import { ZodError } from "zod";
import { User } from "../../models/user.js";
import { personalInformationSchema } from "../../utils/zod.schema.js";

export const updatePersonalInformation = async (req, res) => {
  try {
    const user = req.user;
    const { name, phone } = personalInformationSchema.parse(req.body);

    await User.findByIdAndUpdate(user._id, { name, phone });
    res.status(200).json({
      message: "Personal information updated",
      information: {
        name,
        phone,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: "Server error" });
  }
};
