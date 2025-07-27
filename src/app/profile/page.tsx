"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.error("Logout Error:", error?.message || error);
            toast.error(error?.message || "Logout failed");
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me");
            console.log("DEBUG: Full user response", res);

            const id = res.data?.data?._id;
            if (!id) {
                toast.error("User ID not found");
                return;
            }

            setUserId(id);
        } catch (error: any) {
            console.error("DEBUG: error fetching user", error?.message || error);
            toast.error("Failed to fetch user details");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h1 className="text-xl font-bold mb-4">Profile Page</h1>

            <h2 className="p-3 bg-orange-500 rounded mb-2 text-white">
                {userId ? (
                    <Link href={`/profile/${userId}`}>{userId}</Link>
                ) : (
                    "Nothing"
                )}
            </h2>

            <p className="mb-2">This is your profile page. Here you can view and edit your profile information.</p>
            <p className="mb-4 text-gray-600">Currently, this page is under construction.</p>

            <button
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2"
                onClick={logout}
            >
                Logout
            </button>

            <button
                className="bg-green-600 text-white p-2 rounded hover:bg-green-700 mt-2"
                onClick={getUserDetails}
            >
                Get User Details
            </button>
        </div>
    );
}
