import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import useLocalState from "../hooks/useLocalState";
import { authInitialState } from "../utils/constants";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // const { state, dispatch } = useReducer(authReducer);
  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalState("token");
  const [loading, setLoading] = useState(true);
  const api = axios.create();

  console.log("User state: ", user);

  const signup = async (userData) => {
    const res = await api.post(
      "http://localhost:8080/auth/user/register",
      userData
    );
    console.log(res);
    return res.data;
  };

  const login = async (userData) => {
    return api
      .post("http://localhost:8080/auth/user/login", userData)
      .then((res) => {
        if (res.status === 200) {
          setToken(res.data.token);
          return true;
        }
      })
      .catch((err) => {
        setToken(null);
        console.log(err);
        return false;
      });
  };

  const logout = () => {
    setToken(null);
  };

  const getUser = async () => {
    return api
      .get("http://localhost:8080/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setUser({ ...res.data });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setUser(null);
      });
  };

  useEffect(() => {
    let id;
    if (token) {
      setLoading(true);
      id = setTimeout(() => {
        getUser();
      }, 1000);
    } else {
      setLoading(false);
      setUser(null);
    }

    return () => clearTimeout(id);
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
