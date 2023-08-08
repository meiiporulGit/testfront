import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  providerRoutespages as appRoutes,
  commonHome,
  providerLogin as appLogin,
  patientLogin,
  payerLogin,
  patientRoutes,
  homePage,
  admin,
  adminRoute,
  searchPage,
} from "./routes";

import Layout from "./component/Layout";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import ProtectedLogin from "./ProtectedRoutes/ProtectedLogin";
import ProviderLandingPage from "./Pages/testPages/Landingpage";
import Contact from "./Pages/Contact/Contact";

import { useAppDispatch, useAppSelector } from "./Redux/Hook";
import PatientLogin from "./ProtectedRoutes/PatientLogin";
import PatientRoute from "./ProtectedRoutes/PatientRoute";
import HomePage from "./ProtectedRoutes/HomePage";
import AdminProtectedLogin from "./ProtectedRoutes/AdminLogin";
import AdminProtectedRoute from "./ProtectedRoutes/AdminRoute";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: "#EBF3FA", // page background
        main: "#687B9E", //dark
        dark: "#E4ECF7", // nav background
        contrastText: "#000",
      },
      secondary: {
        main: "#4db6ac",
        light: "#B4C8FC", //"#728AB7", // Title background
        dark: "#4D77FF", //button
        contrastText: "#000",
      },
      text: {
        primary: "#173A5E",
        secondary: "#46505A",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            {searchPage.map((search)=>(
              <Route key={search.key} path={search.path} element={<search.component/>}/>
            ))}
            {/* <Route path = "/providerlanding" element = {<ProviderLandingPage/>}/> */}
            {admin.map((ad)=>(
              <Route key={ad.key}
              path={ad.path}
              element={<AdminProtectedLogin>
              <ad.component/>
            </AdminProtectedLogin>}
           
              
              />
            ))}
    {adminRoute.map((ad)=>(
              <Route key={ad.key}
              path={ad.path}
              element={<AdminProtectedRoute>
              <ad.component/>
            </AdminProtectedRoute>}
           
              
              />
            ))}
           
            {homePage.map((page)=>(
              <Route key={page.key}
              path={page.path}
              element={
                <HomePage getData={page.key}>
                  <page.component/>
                </HomePage>
              }
              />
            ))}
            {patientLogin.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={
                  <PatientLogin>
                    <route.component />
                  </PatientLogin>
                }
              />
            ))}

            {patientRoutes.map((patient) => (
              <Route
                key={patient.key}
                path={patient.path}
                element={
                  <PatientRoute>
                    <patient.component />
                  </PatientRoute>
                }
              />
            ))}

            {appLogin.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={
                  <ProtectedLogin>
                    <route.component />
                  </ProtectedLogin>
                }
              />
            ))}
            {appRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={
                  <ProtectedRoute getData={route.key}>
                    <route.component />
                  </ProtectedRoute>
                }
              />
            ))}

            {payerLogin.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component />}
              />
            ))}

            {commonHome.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Layout>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ThemeProvider>
  );
}

export default App;
