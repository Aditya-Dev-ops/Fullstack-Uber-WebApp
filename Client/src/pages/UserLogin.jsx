import axios from "axios";
import { useContext, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { UserContext } from "../context/UserContext";

const UserLogin = () => {
  const [email ,setemail] = useState("");
  const [password , setpassword] = useState(""); 
  const {user , setuser} = useContext(UserContext);
  const navigate = useNavigate();
  function changeEmail(e){
    e.preventDefault();
    setemail(e.target.value);
  }
  function changePassword(e){
    e.preventDefault();
    setpassword(e.target.value)
  }

  async function FormSubmit(e){
    e.preventDefault();
   const data = {
    email,
    password
  };
    setemail("");
    setpassword("");
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`,data);
      console.log(response)
      if(response.status > 199 && response.status<300){
           localStorage.setItem('user',JSON.stringify(response.data.data))
           localStorage.setItem('token',response.data.token)
         navigate('/home')
         } 
    }
    catch (error) {
      console.error(error);
    }
  }
  return (
  <div className="flex flex-col justify-between h-screen overflow-hidden">
    <div className="p-2">
    <img className="w-20 ml-6 mt-6" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png" alt=""/>
      <form className="p-6" onSubmit={FormSubmit}>
        <h3 className="text-xl mb-2">What&#39;s your email</h3>
        <input
        className="bg-[#eeeeee] rounded px-4 py-2 border w-full mb-4"
        required 
        type="email"
        value ={email}
        onChange={changeEmail}
        placeholder="email@example.com" 
        />
        
        <h3 className="text-xl mb-2">Enter Password</h3>
        <input
         className="bg-[#eeeeee] w-full border px-4 py-2 rounded mb-4"
         onChange={changePassword}
         value={password}
         type="password" placeholder="password"
         />
        <button className="bg-[#111] w-full px-4 py-2 rounded text-lg text-white mb-3">Login</button>
      </form> 
      <div className="w-full flex justify-center -mt-7">
        <p className="inline">New here? </p><Link to="/signup" className="text-blue-500">Create 
        New Account</Link>
      </div>
    </div>   
    <div className="m-10">
       <Link to="/captain-login" 
       className="bg-[#10b461] text-white font-semibold rounded px-4 py-2 w-full text-lg flex items-center justify-center">Sign in as Captain</Link>
    </div>
  </div>
  ) 
};

export default UserLogin