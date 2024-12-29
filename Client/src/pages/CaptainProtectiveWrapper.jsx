import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainProtectiveWrapper = ({children}) => {
  const navigate = useNavigate();
  const {captain , setcaptain} =useContext(CaptainContext);
  const [isloading , setisloading] = useState(true);
  
  const token = localStorage.getItem('token');
  useEffect(()=>{
    if(!token){
      navigate('/captain-login');
    }
  },[token]);

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }).then(res=>{
          console.log(res.data)
          if(res.status === 200){
            setcaptain(res.data.captain);
            setisloading(false);
          }
        }).catch(err =>{
          console.log(err);
          navigate('/captain-login')
        });
    if(isloading){
      return <>
         <h1>Loading....</h1>
      </>
    }
  return (
 <>
    {children}
 </>
  )
}

export default CaptainProtectiveWrapper