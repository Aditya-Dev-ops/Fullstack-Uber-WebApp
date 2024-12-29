import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { CaptainContext } from '../context/CaptainContext';
const CaptainLogin = () => {
  const [email ,setemail] = useState("");
  const [password , setpassword] = useState(""); 
  const {setcaptain} = useContext(CaptainContext);
  const navigate = useNavigate(); 
  // function changeEmail(e){
  //   e.preventDefault();
  //   setemail(e.target.value);
  // }
  // function changePassword(e){
  //   e.preventDefault();
  //   setpassword(e.target.value)
  // }

  async function FormSubmit(e){
    e.preventDefault();
    const data = {
      email,
      password
    };
    console.log(data);
    try{
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/captains/login`,data);
      console.log(response);

      if (response.status === 201) {
        setcaptain(response.data.data);
        localStorage.setItem('captain', JSON.stringify(response.data.data));
        localStorage.setItem('token', response.data.token);
        navigate('/captain-dashboard');
      }
      setemail("");
      setpassword("");
    }
    catch(err){
      console.log(err);
      if(err){
        setemail("");
        setpassword("");
      }
    }
  }
  return (
    <div className="flex flex-col justify-between h-screen overflow-hidden">
    <div className="">
    <img className="w-24 h-20 ml-6 mt-6" src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt=""/>
      <form className="p-6" onSubmit={FormSubmit}>
        <h3 className="text-xl mb-2">What&#39;s your email</h3>
        <input
        className="bg-[#eeeeee] rounded px-4 py-2 border w-full mb-4"
        required 
        type="email"
        value ={email}
        onChange={(e)=> setemail(e.target.value)}
        placeholder="email@example.com" 
        /> 
        <h3 className="text-xl mb-2">Enter Password</h3>
        <input
         className="bg-[#eeeeee] w-full border px-4 py-2 rounded mb-4"
         onChange={(e)=> setpassword(e.target.value)}
         value={password}
         type="password" placeholder="password"
         />
        <button className="bg-[#111] w-full px-4 py-2 rounded text-lg text-white mb-3">Login</button>
      </form> 
      <div className="w-full flex justify-center -mt-7">
        <p className="text-center">Join a fleet?</p>
        <Link to="/captain-signup" className="text-blue-500"> Register as a Captain</Link>
      </div>
    </div>   
    <div className="m-8">
       <Link to="/login" 
       className="
       bg-[#d5622d] text-white 
       font-semibold 
       rounded px-4 py-2 w-full 
       text-lg flex 
       items-center justify-center">Sign in as User</Link>
    </div>
  </div>
  )
}

export default CaptainLogin