import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


const UserSignup = () => {
  const [email ,setemail] = useState("");
  const [password , setpassword] = useState(""); 
  const [firstname ,setfirstname] = useState("");
  const [lastname , setlastname] = useState("");
  // const [userdata , setuserdata] = useState("");
  
  const navigate = useNavigate();
  const {setuser } = useContext(UserContext);

 async function FormSubmit(e){
    e.preventDefault();
    const data = {
      fullname:{
        firstname , lastname
      },
      email,
      password
    };
    setemail("");
    setpassword("");
    setfirstname("");
    setlastname("");
 try {
   const response  = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`,data)
      if(response.status === 201){
        console.log(response)
         setuser(response.data.user);
         localStorage.setItem('user',JSON.stringify(response.data.data))
         localStorage.setItem('token',response.data.token)
         navigate('/home')
      }
 } catch (error) {
     console.error('Registration error:', error.response?.data || error.message);
 }
  }
  return (
    <div className="flex flex-col justify-between h-screen overflow-hidden">
    <div className="p-2">
    <img className="w-20 ml-6 mt-6" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png" alt=""/>
      <form className="p-6" onSubmit={FormSubmit}>
        <h3 className="text-xl">What&#39;s your name</h3>
        <div className="flex mt-2 gap-3">
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 mb-4"
            required 
            type="text"
            value ={firstname}
            onChange={(e)=>{
            e.preventDefault()
            setfirstname(e.target.value)}}
            placeholder="firstname" 
          />
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 mb-4"
            required 
            type="text"
            value ={lastname}
            onChange={(e)=>{
            e.preventDefault()
            setlastname(e.target.value)}}
            placeholder="lastname" 
          />
        </div> 
        <h3 className="text-xl mb-2">What&#39;s your email</h3>
        <input
        className="bg-[#eeeeee] rounded px-4 py-2 border w-full mb-4"
        required 
        type="email"
        value ={email}
        onChange={(e)=>{
          e.preventDefault()
          setemail(e.target.value)}}
        placeholder="email@example.com" 
        />

        <h3 className="text-xl mb-2">Enter Password</h3>
        <input
         className="bg-[#eeeeee] w-full border px-4 py-2 rounded mb-4"
         onChange={(e)=>{
          e.preventDefault()
          setpassword(e.target.value)}}
         value={password}
         type="password" placeholder="password"
         />

        <button className="bg-[#111] w-full px-4 py-2 rounded text-lg text-white mb-3">Create User</button>
      </form> 
      <div className="w-full flex justify-center -mt-7">
        <p className="inline">Already Signup? </p>
        <Link to="/login" className="text-blue-500">
        Login as User</Link>
      </div> 
    </div>    
    <div className="m-10">
       {/* <Link to="/captain-login" 
          className="bg-[#10b461] text-white font-semibold 
          rounded px-4 py-2 
          w-full text-lg flex 
          items-center justify-center"
       >
            Sign in as Captain
       </Link> */}
       <p className="text-[8px] -mb-9 leading-tight">
        By proceeding, your consent to get calls, whatsApp or SMS message, including by automated means,
        from Uber and its affiliates to the number provided  
       </p>
    </div>
  </div>
  )
}

export default UserSignup