"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const[user,setUser]= React.useState({
        email:"",
        password:"",
        });
        const router= useRouter();
        
        const [buttonDisabled, setButtonDisabled] = React.useState(true);
        const [loading, setLoading] = React.useState(false);

        const onLogin=async()=>{
            try{
                setLoading(true);
               const response= await axios.post("/api/users/login",user);
                console.log("response from login api", response.data);
                toast.success("Login successful");

                router.push("/profile");
            }
            catch(err:any){
                console.log("login failed",err.message);
                toast.error(err.message || "Login failed");
            }
            finally{
                setLoading(false);
            }
        }

        useEffect(()=>{
            if(user.email.length > 0 && user.password.length > 0){
                setButtonDisabled(false);   
            }
            else{
                setButtonDisabled(true);
            }
        },[user]);


    return (
        <div >
            <h1>Login Page</h1>
            <br/>
           
                <label htmlFor="email">email:</label>
            <input
                type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder='Enter your email'
                className='border border-gray-300 rounded p-2 mb-4 w-full'
                />
                <label htmlFor="password">password:</label>
            <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder='Enter your password'
                className='border border-gray-300 rounded p-2 mb-4 w-full'
                />
                <button onClick={onLogin} className='bg-blue-500 text-white p-2 rounded'>
                    
                {buttonDisabled ? "Fill all fields" : (loading ? "Processing..." : "login")}
                </button>
                <Link href="/signup" className='text-blue-500 hover:underline ml-4'>
                    Sign up here </Link>
                <Link href="/requestreset" className='text-blue-500 hover:underline ml-4'>
                Forgot Password</Link>
        </div>
    );
}