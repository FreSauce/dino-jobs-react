import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { authInitialState } from "../utils/constants";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // const { state, dispatch } = useReducer(authReducer);
  const [user, setUser] = useState(authInitialState.user);
  const api = axios.create();
  useEffect(() => {}, []);
  const signup = async (userData) => {
    const res = await api.post(
      "https://dinojobs.netlify.app/.netlify/functions/register",
      userData
    );
    console.log(res);
    return res.data;
  };

  const login = async (userData) => {
    const res = await api.post(
      "https://dinojobs.netlify.app/.netlify/functions/login",
      userData
    );
    console.log(res);
    return res.data;
  };

  return (
    <AuthContext.Provider value={{ user, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
