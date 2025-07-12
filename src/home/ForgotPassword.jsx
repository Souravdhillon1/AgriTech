import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
function ForgotPassword(){
    const[email,setemail]=useState("")
    const[message,setmessage]=useState("")
    const handlesubmit=async()=>{
        try {
            const res=await fetch("http://localhost:5000/api/forgot-password",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email})

            })
            const data=await res.json()
            setmessage(data.message)
        } catch (error) {
            console.error(error)
            setmessage("Something went wrong")
        }
    };
    return(
        <div className="w-screen h-screen bg-white">
            <div className="h-full w-full border-12 border-green-200 flex justify-center items-center">
                   <div className="h-100 w-100 bg-gray-300/40 flex flex-col items-center space-y-12 pt-15 rounded-3xl">
                      <div><h1 className=" font-bold text-3xl">Forgot Password</h1></div>
                      <div className="w-full pl-10 pr-10">
                        <label htmlFor="email" className="font-bold">Email</label>
                        <div className="relative">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
                            />
                            <input
                              className="w-full text-black p-2 pl-10 rounded placeholder-black bg-white outline-none shadow-lg"
                              type="text"
                              placeholder="Enter your registered email"
                              id="email"
                              value={email}
                              onChange={(e)=>setemail(e.target.value)}
                            />
                        </div>
                        </div>
                        <div><button onClick={handlesubmit} className="bg-blue-600 text-white px-4 py-2 rounded active:scale-95">
                            Send Reset Link</button>
                            {message && <p className="mt-4 text-green-600">{message}</p>}
                            </div>
                      
                   </div>
            </div>
        </div>
    )
}
export default ForgotPassword