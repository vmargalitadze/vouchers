import axios from "axios";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";

import Navbar from "./components/Navbar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { MyContext } from "./Context/myContext";
import { useNavigate } from "react-router-dom";
import { API } from "./baseAPI";
import FAQ from "./pages/FAQ/FAQ";
import Profile from "./pages/Profile/Profile";
import Vouchers from "./pages/Vouchers/Vouchers";
import Voucher from "./pages/Vouchers/components/Voucher.tsx";
import { Helmet } from "react-helmet-async"; // Import Helmet
import PaymentSuccess from './pages/Payment/PaymentSuccess.tsx'
import PaymentFailed from "./pages/Payment/PaymentFailed.tsx";
import CompanyPage from "./pages/Company/CompanyPage.tsx"; 
import Footer from "./components/Footer.tsx";
import Send from "./pages/Send/Send.tsx";
import Rules from "./pages/Rules/Rules";
import All from "./pages/All/All.tsx";
import Politic from "./pages/Politic/Politic.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
function App() {
  const navigate = useNavigate();
  const location = useLocation(); // To get the current route path
  const context = useContext(MyContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentLanguage, setCurrentLanguage] = useState<any>(
    context?.defaultLanguage === "GE" ? "ninoM" : "interMedium"
  );

  useEffect(() => {
    setCurrentLanguage(
      context?.defaultLanguage === "GE" ? "ninoM" : "interMedium"
    );
  }, [context?.defaultLanguage]);

  // Authentication state check effect
  useEffect(() => {
    const checkAuthState = async () => {
      const token = localStorage.getItem("Token");
      
      if (!token) {
        if (context?.setIsLoggined) context.setIsLoggined(false);
        if (context?.setUserInfo) context.setUserInfo(null);
        if (context?.setNotifications) context.setNotifications([]);
        return;
      }

      try {
        const response = await axios.post(`${API}/users`, {
          token: token,
          language: context?.defaultLanguage,
        });

        if (context?.setIsLoggined) context.setIsLoggined(true);
        if (context?.setUserInfo) context.setUserInfo(response.data.userData[0]);
        if (context?.setNotifications) context.setNotifications(response.data.notifications || []);
      } catch (error) {
        // If token is invalid, clear all auth data
        localStorage.removeItem("Token");
        localStorage.removeItem("dailyOrderCount");
        localStorage.removeItem("orderCountDate");
        
        if (context?.setIsLoggined) context.setIsLoggined(false);
        if (context?.setUserInfo) context.setUserInfo(null);
        if (context?.setNotifications) context.setNotifications([]);
        
        console.error("Token validation failed:", error);
      }
    };

    checkAuthState();
  }, [context?.setIsLoggined, context?.setUserInfo, context?.defaultLanguage, context?.setNotifications]);

 useEffect(() => {
   const protectedRoutes = [
     "/Profile",
     "/cards",

     "/send",
   
  
   ];

   const isOnProtectedRoute = protectedRoutes.some((route) =>
     location.pathname.startsWith(route.replace(":id", ""))
   );

   // Check token and update user info if needed
   const checkAuthAndUpdateUser = async () => {
     const token = localStorage.getItem("Token");
     if (token && !context?.isLoggined) {
       try {
         const response = await axios.post(`${API}/users`, {
           token,
           language: context?.defaultLanguage,
         });
         
         if (context?.setUserInfo) {
           context.setUserInfo(response.data.userData[0]);
         }
         if (context?.setIsLoggined) {
           context.setIsLoggined(true);
         }
       } catch (error) {
         console.error("Error verifying token:", error);
      
         if (isOnProtectedRoute) {
           navigate("/");
         }
       }
     } else if (!token && isOnProtectedRoute) {
       navigate("/Login");
     }
   };

   checkAuthAndUpdateUser();
 }, [context?.isLoggined, location.pathname]);

  useEffect(() => {
    if (
      context?.userInfo?.auto_sub == 1 &&
      context?.userInfo.subscription == 0 &&
      context?.userInfo.balance >= 3
    ) {
      axios
        .post(`${API}/users/subscription`, {
          email: context?.userInfo.email,
          language: context?.defaultLanguage,
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [context?.userInfo]);

  return (
    <div
      className={`App ${context?.isLoggined ? "" : ""} `}
      style={{ fontFamily: currentLanguage }}
    >
<Navbar />

      
      <Helmet>
        <link
          rel="canonical"
          href={`https://offerscard.ge${location.pathname}`}
        />
      </Helmet>

      <Routes>
        <Route path="/" element={<Navigate to="/Dashboard" replace />} />
 
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/All" element={<All />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/cards" element={<Vouchers />} />
        <Route path="/cards/:id" element={<Voucher />} />
        <Route path="/company/:id" element={<CompanyPage />} />
        <Route path="/send" element={<Send />} />
         <Route path="/rules" element={<Rules />} />
         <Route path="/Login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/politic" element={<Politic />} />
        <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
        <Route path="/PaymentFailed" element={<PaymentFailed />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
