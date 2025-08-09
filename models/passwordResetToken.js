import { Schema, model } from "mongoose";

const passwordResetTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Number,
      required: true
    },
  },
  { timestamps: true }
);

export const PasswordResetToken = model(
  "password_reset_token",
  passwordResetTokenSchema
);
