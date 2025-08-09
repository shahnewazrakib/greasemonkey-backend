import { User } from "../../models/user.js";
import { MemberInvitationToken } from "../../models/memberInvitationToken.js";
import _ from "lodash";

export const acceptInvitation = async (req, res) => {
  try {
    const { userId, token } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Inspector doesn't exist" });
    }

    if (user.isActive) {
      return res.status(400).json({ message: "Inspector is already active" });
    }

    const memberInvitationToken = await MemberInvitationToken.findOne({
      userId,
      token,
    });

    if (!memberInvitationToken) {
      return res.status(400).json({ message: "Link is not valid" });
    }

    await User.findByIdAndUpdate(userId, { isActive: true });
    await MemberInvitationToken.deleteMany({ userId });

    res.status(200).json({
      message: "Invitation accepted",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
