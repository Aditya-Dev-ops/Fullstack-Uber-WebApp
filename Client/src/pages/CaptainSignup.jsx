import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [email ,setemail] = useState("");
  const [password , setpassword] = useState(""); 
  const [firstname ,setfirstname] = useState("");
  const [lastname , setlastname] = useState("");
  const [captaindata , setcaptaindata] = useState("");
  function FormSubmit(e){
    e.preventDefault();
    setcaptaindata({
      username:{
        firstname , lastname
      },
      email,
      password
    });
    console.log(captaindata);
    setemail("");
    setpassword("");
    setfirstname("");
    setlastname("");
  } 
  return (
    <div className="flex flex-col justify-between h-screen overflow-hidden">
    <div className="p-2">
    <img className="w-20 ml-6 mt-6" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png" alt=""/>
      <form className="p-6" onSubmit={FormSubmit}>
        <h3 className="text-xl">What&#39;s captain name</h3>
        <div className="flex gap-3 mt-2">
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

        <button className="bg-[#111] w-full px-4 py-2 rounded text-lg text-white mb-3">SignUp</button>
      </form> 
      <div className="w-full flex justify-center -mt-7">
        <p className="inline">Already Signup? </p>
        <Link to="/captain-login" className="text-blue-500">
        Login as Captain</Link>
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

export default CaptainSignup