import { Schema, model } from "mongoose";

const memberInvitationTokenSchema = new Schema(
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
  },
  { timestamps: true }
);

export const MemberInvitationToken = model(
  "member_invitation_token",
  memberInvitationTokenSchema
);
