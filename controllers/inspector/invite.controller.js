import { ZodError } from "zod";
import { User } from "../../models/user.js";
import bcrypt from "bcryptjs";
import { inspectorSchema } from "../../utils/zod.schema.js";
import { hasPermission } from "../../lib/permission.js";
import {
  adminPermissions,
  inspectorPermissions,
} from "../../utils/permission.js";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { MemberInvitationToken } from "../../models/memberInvitationToken.js";
import { sendEmail } from "../../lib/mailer.js";

export const inviteInspector = async (req, res) => {
  try {
    const user = req.user;
    const { name, email, phone, role } = inspectorSchema.parse(req.body);

    // Check if the requested person has the permission
    if (!hasPermission(user, "create:inspector")) {
      return res
        .status(403)
        .json({ message: "You don't have permission to add new inspector" });
    }

    // Check if the email is already taken
    const isExistingUser = await User.findOne({
      email,
    });

    if (isExistingUser) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      permissions: role === "admin" ? adminPermissions : inspectorPermissions,
    });

    await newUser.save();

    // Create a new member invitation token
    const token = uuidv4();
    const memberInvitationToken = new MemberInvitationToken({
      userId: newUser._id,
      token,
    });
    await memberInvitationToken.save();

    // Generate the invitation URL
    const url = `${process.env.CORS_ALLOWED_ORIGIN_DASHBOARD}/accept-invitation/${newUser._id}/${token}`;

    await sendEmail(email, process.env.MAILTRAP_MEMBER_INVITATION_TEMPLATE_ID, {
      name,
      role,
      password,
      url
    });

    res.status(201).json({
      message: "Invitation sent",
      inspector: _.pick(newUser, [
        "_id",
        "name",
        "email",
        "phone",
        "role",
        "isActive",
        "profilePhoto",
      ]),
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: "Server error" });
  }
};
