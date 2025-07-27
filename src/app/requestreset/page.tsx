"use client";

import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";

export default function RequestResetPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post("/api/users/requestreset", { email });
      setMessage(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4">
      <h1 className="text-2xl font-semibold mb-4">Forgot your password?</h1>
      <p className="mb-6 text-center text-gray-600">
        Enter your registered email, and we'll send you a reset link.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
            <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-2.5 w-96">
              <Link href="/login">Sign in</Link>
            </button>
      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
