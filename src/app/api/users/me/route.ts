import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        console.log("/api/users/me");

        // Extract userId from token
        const userId = await getDataFromToken(request);
        console.log("User ID from token:", userId);

        // Fetch user from DB
        const user = await User.findOne({ _id: userId }).select("-password");
        console.log("User from DB:", user);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User Found",
            data: user,
            success: true,
        });
    } catch (error: any) {
        console.error("Error fetching user:", error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
