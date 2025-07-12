import React from "react";
import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
function ResetPassword(){
    const[newpassword,setnewpassword]=useState('')
    const[confirmpassword,setconfirmpassword]=useState('')
    const[message,setmessage]=useState('')
    const location=useLocation()
    const navigate=useNavigate()
    const email=new URLSearchParams(location.search).get("email")
    const handlereset=async()=>{
        if(newpassword!=confirmpassword){
            setmessage("Password didn't match! Enter again")
            return
        }
        try {
            const res=await fetch("http://https://agritech-backend-o5e8.onrender.com/api/reset-password",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email,password:newpassword})
            });
            const data=await res.json()
            setmessage(data.message)
            if(res.ok){
                navigate("/login")
            }
        } catch (error) {
            console.error(error)
            setmessage("Something went wrong")
        }
    }
    return(
        <div className="bg-white h-screen w-screen">
            <div className="w-full h-full border-12 border-green-200 flex items-center justify-center">
                <div className="bg-gray-400/40 h-100 w-110 flex flex-col items-center space-y-8 pt-10 rounded-3xl">
                   <div className="w-full pl-10">
                      <div className="font-bold text-1xl">Reset Password for {email}</div>
                   </div>
                   <div className="w-full pl-10 pr-10 space-y-6">
                        <label htmlFor="password" className="font-bold">New Password</label>
                            <div className="relative">
                                <FontAwesomeIcon
                                 icon={faLock}
                                 className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
                                />
                                <input
                                className="w-full text-black p-2 pl-10 rounded placeholder-black bg-white outline-none shadow-lg"
                                type="text"
                                placeholder="Enter your new Password"
                                id="password"
                                value={newpassword}
                                onChange={(e)=>setnewpassword(e.target.value)}
                                />
                             </div>
                        <label htmlFor="confirmpassword" className="font-bold">Confirm new password</label>
                            <div className="relative">
                                <FontAwesomeIcon
                                 icon={faLock}
                                 className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
                                />
                                <input
                                className="w-full text-black p-2 pl-10 rounded placeholder-black bg-white outline-none shadow-lg"
                                type="text"
                                placeholder="Confirm your new Password"
                                id="confirmpassword"
                                value={confirmpassword}
                                onChange={(e)=>setconfirmpassword(e.target.value)}
                                />
                             </div>
                      </div>
                   <button onClick={handlereset} className="bg-blue-600 text-white px-4 py-2 rounded active:scale-95" >Reset</button>
                   {message && <p className="mt-2 text-green-600">{message}</p>}
                </div>
            </div>
        </div>
    )
}
export default ResetPassword
