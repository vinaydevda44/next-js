import { connect } from "@/dbconfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const { token, password, confirmPassword } = await request.json();

    if (password !== confirmPassword) {
      return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
    }

    // Get all users whose token hasn't expired
    const users = await User.find({
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    // Find the user whose hashed token matches the raw token
    let matchedUser = null;

    for (const user of users) {
      const isMatch = await bcryptjs.compare(token, user.forgotPasswordToken || "");
      if (isMatch) {
        matchedUser = user;
        break;
      }
    }

    if (!matchedUser) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    matchedUser.password = hashedPassword;
    matchedUser.forgotPasswordToken = null;
    matchedUser.forgotPasswordTokenExpiry = null;

    await matchedUser.save();

    return NextResponse.json({ message: "Password updated successfully", success: true });
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
