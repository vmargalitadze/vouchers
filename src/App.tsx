import axios from "axios";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
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

  useEffect(() => {
    axios
      .post(`${API}/users`, {
        token: localStorage.getItem("Token"),
        language: context?.defaultLanguage,
      })
      .then((res) => {
        if (context?.setUserInfo) {
          context.setUserInfo(res.data.userData[0]);
        }
       
        if (context?.setNotifications) {
          context.setNotifications(res.data.notifications);
        }
      });
  }, []);

 useEffect(() => {
   const protectedRoutes = [
    

    
     "/PaymentSuccess",
     "/PaymentFailed",
   ];

   const isOnProtectedRoute = protectedRoutes.some((route) =>
     location.pathname.startsWith(route.replace(":id", ""))
   );

   if (!context?.isLoggined && isOnProtectedRoute) {
     navigate("/");
   } else if (context?.isLoggined && location.pathname === "/Login") {
     navigate("/Dashboard");
   }
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
        <Route path="/Login" element={<RegistrationPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/All" element={<All />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/cards" element={<Vouchers />} />
        <Route path="/cards/:id" element={<Voucher />} />
        <Route path="/company/:id" element={<CompanyPage />} />
        <Route path="/send" element={<Send />} />
         <Route path="/rules" element={<Rules />} />
         <Route path="/politic" element={<Politic />} />
        <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
        <Route path="/PaymentFailed" element={<PaymentFailed />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
