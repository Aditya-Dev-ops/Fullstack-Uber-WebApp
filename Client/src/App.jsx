import { Routes , Route } from "react-router-dom"
// import Home from "./pages/Start"
import UserLogin from "./pages/UserLogin"
import UserSignup from "./pages/UserSignup"
import CaptainSignup from "./pages/CaptainSignup"
import CaptainLogin from "./pages/CaptainLogin"
import Start from "./pages/Start"
import Home from "./pages/Home"
import { UserProvider } from "./context/UserContext";
import UserProtectiveWrapper from "./pages/UserProtectiveWrapper"
import UserLogout from "./pages/UserLogout"
import { CaptainProvider } from "./context/CaptainContext"
import CaptainProtectiveWrapper from "./pages/CaptainProtectiveWrapper"
import CaptainDashboard from "./pages/CaptainDashboard"

function App() {
  return (
    <UserProvider>
      <CaptainProvider>
      <div>
        <Routes>        
          <Route path='/' element={<Start/>}/>
          <Route path='/home' element={
            <UserProtectiveWrapper>
              <Home/>
            </UserProtectiveWrapper>
            }/>

            <Route path='/captain-dashboard' element={
            <CaptainProtectiveWrapper>
               <CaptainDashboard/>
            </CaptainProtectiveWrapper>
            }/>
          <Route path='/login' element={<UserLogin/>}/>
          <Route path='/signup' element={<UserSignup/>}/>
          <Route path='/captain-login' element={<CaptainLogin/>}/>
          <Route path='/captain-signup' element={<CaptainSignup/>}/>
          <Route path='/logout' element={<UserLogout/>}/>
        </Routes>
      </div>
      </CaptainProvider>
    </UserProvider>
  )
}

export default App
