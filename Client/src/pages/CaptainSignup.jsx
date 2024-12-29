import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState(""); 
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [vehiclecolor, setvehiclecolor] = useState("");
  const [vehicleplate, setvehicleplate] = useState("");
  const [vehiclecapacity, setvehiclecapacity] = useState("");
  const [vehicletype, setvehicletype] = useState("");
  
  const { setcaptain } = useContext(CaptainContext);

  async function FormSubmit(e) {
    e.preventDefault();
    const data = {
      fullname: {
        firstname,
        lastname
      },
      email,
      password,
      vehicles: {
        color: vehiclecolor,
        plate: vehicleplate,
        capacity: vehiclecapacity,
        vehicletype
      }
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/captains/register`,
        data
      );
      
      if (response.status === 201) {
        setcaptain({
          captain: response.data.data,
          token: response.data.token,
          isLoading: false,
          error: null
        });
        localStorage.setItem('captain', JSON.stringify(response.data.data));
        localStorage.setItem('token', response.data.token);
        navigate('/captain-dashboard');
      }
    } catch (error) {
      setcaptain(prev => ({
        ...prev,
        error: error.response?.data?.message || 'Registration failed'
      }));
      console.error('Registration error:', error.response?.data || error.message);
    }
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

        <h3 className="text-xl">Vehicle Information</h3>
        <div className="flex gap-3 mt-2">
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 mb-4"
            required 
            type="text"
            value ={vehiclecolor}
            onChange={(e)=>{
            e.preventDefault()
            setvehiclecolor(e.target.value)}}
            placeholder="color" 
          /> 
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 mb-4"
            required 
            type="text"
            value ={vehicleplate}
            onChange={(e)=>{
            e.preventDefault()
            setvehicleplate(e.target.value)}}
            placeholder="Plate" 
          />
          </div>

        <div className="flex gap-3 mt-2">
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 mb-4"
            required 
            type="number"
            value ={vehiclecapacity}
            onChange={(e)=>{
            e.preventDefault()
            setvehiclecapacity(()=>{
              console.log(e.target.value);
              return e.target.value < 0 ? e.target.value * -1 : e.target.value ;
            })}}
            placeholder="max passenger" 
          />
         <select required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 mb-4"
            value={vehicletype}
            onChange={(e)=> setvehicletype(e.target.value) }
          >
          <option value="" disabled>Select Vehicle Type</option>
          <option value="car">Car</option>
          <option value="auto">Auto</option>
          <option value="Moto">moto</option>
         </select>
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

        <button className="bg-[#111] w-full px-4 py-2 rounded text-lg text-white mb-3">Create Captain</button>
      
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