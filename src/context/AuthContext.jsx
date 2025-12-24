import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export let AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const [loginData, setLoginData] = useState(null);
//   let navigate = useNavigate()
  let saveLoginData = () => {
    let encodeToken = localStorage.getItem("token");
    let decodedToken = jwtDecode(encodeToken);
    setLoginData(decodedToken);
  };
  let logout =() =>{
    localStorage.removeItem('token');
    setLoginData(null);

  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (localStorage.getItem("token")) saveLoginData();
  }, []);
  return (
    <AuthContext.Provider value={{loginData,saveLoginData,logout}}>
        {props.children}
    </AuthContext.Provider>
  )
}
