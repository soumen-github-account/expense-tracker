import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const rupeeIcon = '₹'
  const [trackData, setTrackData] = useState([]);
  const [walletData, setWalletData] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAccessToken = () => localStorage.getItem("access");
  const getRefreshToken = () => localStorage.getItem("refresh");

  // Refresh access token
  const refreshToken = async () => {
    const refresh = getRefreshToken();
    if (!refresh) return null;

    try {
      const res = await fetch(backendUrl + "/api/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });

      if (!res.ok) {
        logout();
        return null;
      }

      const data = await res.json();
      localStorage.setItem("access", data.access);
      return data.access;
    } catch (err) {
      console.error("Refresh error:", err);
      logout();
      return null;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  // Load user data
  const loadUser = async () => {
    let token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }

    let res = await fetch(backendUrl + "/api/me/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      // expired -> try refresh
      token = await refreshToken();
      if (!token) {
        setLoading(false);
        return;
      }

      res = await fetch(backendUrl + "/api/me/", {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    if (res.ok) {
      const data = await res.json();
      setUser(data);
      console.log(data)
    } else {
      setUser(null);
    }

    setLoading(false);
  };

  const fetchTrackData = async()=>{
    const token = getAccessToken();
    await axios.get(backendUrl + "/api/tracker/trackdata/", {headers:{Authorization: `Bearer ${token}`}})
    .then((res)=>{
      setTrackData(res.data)
    })
    .catch((err)=>{
      console.error("Error featching data: ", err)
    })
  }

  const fetchWalletData = async()=>{
    const token = getAccessToken();
    await axios.get(backendUrl + '/api/wallets/', {headers:{Authorization: `Bearer ${token}`}})
    .then((res)=>{
      console.log(res.data)
      setWalletData(res.data)
    })
    .catch((err)=>{
      console.err("Error :", err);
    })
  }

  useEffect(() => {
    loadUser();
    fetchTrackData();
    fetchWalletData();
  }, []);


  const value = {
    rupeeIcon,
    user,
    loading,
    backendUrl,
    logout,
    loadUser,
    trackData,
    fetchTrackData,
    walletData,
    fetchWalletData,
    getAccessToken
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
