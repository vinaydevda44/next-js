"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function signupPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("response from signup api", response.data);
            toast.success("Signup successful, please login");
            router.push("/login");
        } catch (err: any) {
            console.error("signup failed", err.message);
            toast.error(err.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password && user.username));
    }, [user]);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h1 className="text-xl font-semibold mb-4">Signup page</h1>
            <p className="mb-4">Please fill out the form to create a new account.</p>

            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder='Enter your username'
                className='border border-gray-300 rounded p-2 mb-4 w-full'
            />

            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder='Enter your email'
                className='border border-gray-300 rounded p-2 mb-4 w-full'
            />

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder='Enter your password'
                className='border border-gray-300 rounded p-2 mb-4 w-full'
            />

            <button 
                onClick={onSignup} 
                disabled={buttonDisabled} 
                className={`w-full p-2 rounded ${buttonDisabled ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
            >
                {buttonDisabled ? "Fill all fields" : (loading ? "Processing..." : "Signup")}
            </button>

            <p className="mt-4">
                Already have an account? 
                <Link href="/login" className='text-blue-500 hover:underline ml-1'>
                    Login
                </Link>
            </p>
        </div>
    );
}
