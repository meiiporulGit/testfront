import React from "react";
import { Route, RouteProps, Navigate, useLocation } from "react-router";
import SideNavBar from "../component/SideNav/SideNavComp";
import { Box, Grid, Paper } from "@mui/material";

import { useAppSelector, useAppDispatch } from "../Redux/Hook";
import { refresh } from "../Redux/ProviderRedux/LoginSlice";

type Props = {
  children: React.ReactNode;
};
const AdminProtectedLogin = ({ children }: Props) => {
  // const dispatch = useAppDispatch();
  // dispatch(refresh());
  const location = useLocation().pathname.split("/")[1];
 
  const authUser = useAppSelector(
    (state) => state.adminAuth.adminLogoutButton
  );

  console.log("check");

  // let isAuth=true
  return !authUser && location==="admin" ? (
    <> {children}</>
  ) : (
    <Navigate to="/admin" replace />
  );
};

export default AdminProtectedLogin;

// import React from "react";
// import { Route, RouteProps, Navigate } from "react-router";
// import {Paper} from '@mui/material';
// import SideNavBar from './component/SideNav/SideNavComp';
// import "./check.css"

// interface Props {
//   children: JSX.Element;
// }
// const ProtectedRoute = ({ children }: Props) => {
//   const isAuth = true;
//   return isAuth ? <div className="check"><SideNavBar/>{children} </div> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;
