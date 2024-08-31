import { createContext, useEffect, useState } from "react";

export let UserContext = createContext(0);
export function UserContextProvider(props) {
  const [userLogin, setUserLogin] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("Token") !== null) {
      setUserLogin(localStorage.getItem("Token"));
    }
  }, []);
  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
}
