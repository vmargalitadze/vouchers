import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet"; // Import Helmet for meta tags

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import RegistrationLeftside from "./components/RegistrationLeftside";
import { MyContext } from "../../Context/myContext";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const context = useContext(MyContext);

  useEffect(() => {
    if (context?.isLoggined) {
      navigate("/Dashboard");
    }
  }, [context?.isLoggined, navigate]);

  const [isLogging, setIsLogging] = useState(true); // Toggle between Login and Sign Up

  return (
    <>
      {/* React Helmet for Meta Tags */}
      <Helmet>
        <title>{isLogging ? "შესვლა" : "რეგისტრაცია"} | Offers Card</title>
        <meta
          name="description"
          content={`${
            isLogging ? "შესვლა" : "რეგისტრაცია"
          } to your Offers Card account to access services and manage your profile.`}
        />
        <meta
          name="keywords"
          content={`Offers Card, ${
            isLogging ? "შესვლა" : "რეგისტრაცია"
          }, user registration, account access`}
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="relative mb-56 h-screen xl:px-1  2xl:myContainer">
        <main className="mt-[80px] text-white flex justify-around items-center h-full relative 2xl:flex-wrap gap-32 lg:gap-16">
          <RegistrationLeftside
            isLogging={isLogging}
            setIsLogging={setIsLogging}
          />
          {!isLogging ? <SignUp setIsLogging={setIsLogging} /> : <SignIn />}
        </main>
      </div>
    </>
  );
}
