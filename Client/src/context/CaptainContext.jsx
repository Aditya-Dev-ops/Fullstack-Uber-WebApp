import { createContext, useState } from "react";

export const CaptainContext = createContext(null);

export const CaptainProvider = ({ children }) => {
    const [captain, setcaptain] = useState("");
    const [isloading , setisloading] =useState("");
    const [iserror ,setiserror] = useState("");
   
    return (
        <CaptainContext.Provider value={{ captain, setcaptain , isloading ,iserror ,setiserror , setisloading }}>
            {children}
        </CaptainContext.Provider>
    );
}; 