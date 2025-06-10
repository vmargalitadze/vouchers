/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import VerificationPannel from "../RegistrationPage/components/VerificationPannel";
import ForgotPassword from "../RegistrationPage/components/ForgotPassword";
import SignInForm from "../RegistrationPage/components/SignInForm";
import { MyContext } from "../../Context/myContext";
import { useContext } from "react";
import { API } from "../../baseAPI";
import { Link, useNavigate } from "react-router-dom";

interface loginTypes {
  userEmail: string;
}

export default function Login() {
  const context = useContext(MyContext);

  const [userTOKEN, setUserTOKEN] = useState("");
  const [isUserVerified, SetIsUserVerified] = useState<null | undefined | true>(
    undefined
  );

  const [inputValues, setInputValues] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<loginTypes>({ userEmail: "" });
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (isUserVerified === null) {
      axios.post(`${API}/auth/register/verify`, { email: loginInfo.userEmail });
    }
  }, [isUserVerified]);

  useEffect(() => {
    if (userTOKEN) {
      axios
        .post(`${API}/users`, {
          language: context?.defaultLanguage,
          token: userTOKEN,
        })
        .then((res) => {
          if (context?.setUserInfo) {
            context.setUserInfo(res.data);
          }
        });
    }
  }, [userTOKEN]);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const loginSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(`${API}/auth/login`, {
        usernameOrEmail: inputValues.usernameOrEmail,
        password: inputValues.password,
        language: context?.language || "en",
      })
      .then((res) => {
        if (res.data.status === "თქვენ არ გაქვთ ვერიფიკაცია გავლილი") {
          setLoginInfo({ userEmail: res.data.email });
          SetIsUserVerified(null);
        } else {
          setUserTOKEN(res.data.token);
          localStorage.setItem("Token", res.data.token);

          // Get user data after successful login
          console.log("Login Response:", res.data);

          // First set the login state
          if (context?.setIsLoggined) {
            context.setIsLoggined(true);
          }

          // Then fetch user data
          axios
            .post(`${API}/users`, {
              language: context?.defaultLanguage,
              token: res.data.token,
            })
            .then((userRes) => {
              console.log("User Data Response:", userRes.data);

              if (
                userRes.data &&
                userRes.data.userData &&
                userRes.data.userData[0]
              ) {
                // Update user info
                if (context?.setUserInfo) {
                  context.setUserInfo(userRes.data.userData[0]);
                }
                // Update notifications
                if (context?.setNotifications) {
                  context.setNotifications(userRes.data.notifications || []);
                }
              } else {
                console.error("Invalid user data structure:", userRes.data);
              }

              // Finally navigate after a short delay
              setTimeout(() => {
                navigate("/");
              }, 300);
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
              if (context?.setIsLoggined) {
                context.setIsLoggined(false);
              }
              if (context?.setUserInfo) {
                context.setUserInfo(null);
              }
              navigate("/");
            });
        }
      })
      .catch(() => {
        setErrorMessage("სახელი/მეილი ან პაროლი არასწორია");
      });
  };

  return !forgotPassword ? (
    <div className="flex flex-col min-h-screen justify-center items-center gap-5 w-full px-4 sm:px-8">
      {errorMessage && (
        <div className="bg-bgBlackTransparent fixed inset-0 flex items-center justify-center z-[1000] p-4">
          <div className="bg-cardBgBlack p-5 rounded-lg shadow-lg relative w-full max-w-[500px] h-auto min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
            <button
              onClick={() => setErrorMessage("")}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded-full"
            >
              &times;
            </button>
            <div className="flex flex-col justify-center items-center h-full text-center">
              <p className="text-base sm:text-lg mb-3">{errorMessage}</p>
              {errorMessage !== "სახელი/მეილი ან პაროლი არასწორია" ? (
                <span className="text-sm sm:text-base">
                  დააჭირეთ{" "}
                  <Link
                    to="https://www.facebook.com/techspaceingeorgia"
                    target="blank"
                    className="text-blue-400 underline"
                  >
                    აქ
                  </Link>
                </span>
              ) : (
                <h1 className="text-sm sm:text-base">
                  გთხოვთ მიუთითოთ სწორი ინფორმაცია
                </h1>
              )}
            </div>
          </div>
        </div>
      )}

      {isUserVerified === null ? (
        <VerificationPannel SetIsUserVerified={SetIsUserVerified} />
      ) : (
        <>
          <h1 className="text-xl sm:text-2xl text-center">Offers Card</h1>
          <p className="text-sm sm:text-base text-center">
            მიუთითეთ თქვენი ინფორმაცია
          </p>

          <SignInForm
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            setForgotPassword={setForgotPassword}
            loginSubmit={loginSubmit}
            handleInput={handleInput}
            inputValues={inputValues}
          />

          <Link
            to="/register"
            className="text-yellowButtonHover hover:underline transition-all duration-300 text-sm sm:text-base"
          >
            არ გაქ აქაუნთი? გაიარე რეგისტრაცია
          </Link>
        </>
      )}
    </div>
  ) : (
    <ForgotPassword setForgotPassword={setForgotPassword} />
  );
}
