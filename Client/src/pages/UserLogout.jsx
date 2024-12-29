import { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const UserLogout = () => {
  const navigate = useNavigate();
  const { setuser } = useContext(UserContext);
  useEffect(() => {
    const logoutUser = async () => { 
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          } 
        );
        if (response.status > 199 && response.status < 250) {
          // Clear local storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // Clear context
          setuser({
            user: null,
            token: null
          });
          navigate('/login');
        } 
      } 
      logoutUser();
    });
  return (
    <div className="flex items-center justify-center h-screen">
      <p>Logging out...</p>
    </div>
  );
};

export default UserLogout;