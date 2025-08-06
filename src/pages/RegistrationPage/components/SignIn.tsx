/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import VerificationPannel from "./VerificationPannel";
import ForgotPassword from "./ForgotPassword";
import SignInForm from "./SignInForm";
import { MyContext } from "../../../Context/myContext";
import { useContext } from "react";
import { API } from "../../../baseAPI";

interface loginTypes {
  userEmail: string;
}

export default function SignIn() {
  const context = useContext(MyContext);

  const [userTOKEN, setUserTOKEN] = useState("");
  const [isUserVerified, SetIsUserVerified] = useState<null | undefined | true>(
    undefined
  );

  const [inputValues, setInputValues] = useState({
    usernameOrEmail: "",
    password: "",
  });

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
        language: context?.defaultLanguage,
      })
      .then((res) => {
        if (
          res.data.status === "თქვენ არ გაქვთ ვერიფიკაცია გავლილი"
        ) {
          setLoginInfo({ userEmail: res.data.email });
          SetIsUserVerified(null);
        } else {
          setUserTOKEN(res.data.token);
          if (context?.setIsLoggined) {
            context.setIsLoggined(true);
          }
          localStorage.setItem("Token", res.data.token);
          window.location.reload();
        }
      })
      .catch(() => {
        setErrorMessage("სახელი/მეილი ან პაროლი არასწორია");
      });
  };

  return !forgotPassword ? (
    <div className="flex flex-col justify-center items-center gap-5 xl:w-full ">
      {errorMessage && (
        <div className="bg-bgBlackTransparent w-full h-screen fixed left-0 top-0 flex items-center justify-center z-[1000]">
          <div className="theme-card p-5 rounded-lg shadow-lg relative h-[300px] w-[500px] lg:w-[80%] lg:h-[40%]">
            <button
              onClick={() => setErrorMessage("")}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              &times;
            </button>
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-center text-[17px] mb-3 theme-text">{errorMessage}</p>
              {errorMessage !== "სახელი/მეილი ან პაროლი არასწორია" ? (
                <span className="theme-text">
                  დააჭირეთ {""}
                  <a
                    href="https://www.facebook.com/techspaceingeorgia"
                    target="blank"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    აქ
                  </a>
                </span>
              ) : (
                <h1 className="text-center theme-text">
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
          <h1 className="text-2xl theme-text">Offers Card</h1>
     
          <p className="theme-text-secondary">მიუთითეთ თქვენი ინფორმაცია</p>
          <SignInForm
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            setForgotPassword={setForgotPassword}
            loginSubmit={loginSubmit}
            handleInput={handleInput}
            inputValues={inputValues}
          />
        </>
      )}
    </div>
  ) : (
    <ForgotPassword setForgotPassword={setForgotPassword} />
  );
}
