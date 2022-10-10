import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // const { state, dispatch } = useReducer(authReducer);
  const [user, setUser] = useState();
  const api = axios.create({
    headers: {
      "Context-Type": "text/plain",
      // 'Access-Control-Allow-Origin': '*'
    },
  });

  useEffect(() => {}, []);

  const signup = async (userData) => {
    const res = await api.post(
      "https://dinojobs.netlify.app/.netlify/functions/signup",
      userData
    );
    console.log(res);
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
