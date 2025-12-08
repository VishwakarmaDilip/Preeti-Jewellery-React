import React, { useEffect } from "react";
import {useSelector } from "react-redux";
import { Navigate, Outlet} from "react-router-dom";

const PrivateRoute = () => {
  const token = useSelector((state)=> state.user.loggedIn)
  const loading = useSelector((state) => state.user.loading)

  if (loading) return <div>Loading...</div>;
 
  return token ? <Outlet/> : <Navigate to="/login" />;
};

export default PrivateRoute;