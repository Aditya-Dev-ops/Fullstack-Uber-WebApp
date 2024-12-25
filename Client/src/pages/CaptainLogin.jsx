import { useState } from 'react';
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  const [email ,setemail] = useState("");
  const [password , setpassword] = useState(""); 
  function changeEmail(e){
    e.preventDefault();
    setemail(e.target.value);
  }
  function changePassword(e){
    e.preventDefault();
    setpassword(e.target.value)
  }

  function FormSubmit(e){
    e.preventDefault();
    console.log({
      email,
      password
    });
    setemail("");
    setpassword("");
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