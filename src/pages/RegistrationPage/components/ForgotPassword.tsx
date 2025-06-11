/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputMessageComp from "../../../components/InputMessage";
import { API } from "../../../baseAPI";
export default function ForgotPassword(props: { setForgotPassword: Function }) {
  const [emailAdress, setEmailAdress] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>(""); /// ვერიფიკაციის კოდის ველიუ აქ ინახება
  const [newPassword, setNewPassword] = useState<string>(""); // newPassword ის ველიუ აქ ინახება
  const [showPassword, setShowPassword] = useState<boolean>(false); // ინფათზე NewPassword არის ღილაკი საიდანაც შეგიძლია გააკეთო Show/Hide Password
  const [mailVisible, setMailVisible] = useState<boolean>(true); // თუ თრუა მაშინ მეილი გამოჩენილი იქნება თაურადა მარტო ვერიფიკაციის ველები
  const [isEmailCorrect, setIsEmailCorrect] = useState<boolean>(false); // თუ არის თრუ გამოიტანს ვერიფიკაციის და ახალი პასვორდის ინფათებს თუარადა დაწერს რო არასწორიაო
  const [isEmailIncorrect, setIsEmailInCorrect] = useState<boolean>(false);
  const [buttonClickTimeout, setButtonClickTimeout] = useState(false); // button roar gaispamos click ebit
  interface inputMessageTypes {
    message: string;
    messageColor: boolean;
  }
  const [inputMessage, setInputMessage] = useState<inputMessageTypes>({
    message: "",
    messageColor: false,
  });
  const passwordChanged = () => {
    setInputMessage({
      message: "Password Changed Succesfully",
      messageColor: true,
    });
    setTimeout(() => {
      setEmailAdress("");
      setVerificationCode("");
      setNewPassword("");
      setIsEmailCorrect(false);
      setMailVisible(true);
      setInputMessage({
        message: "",
        messageColor: false,
      });
      props.setForgotPassword(false);
    }, 2500);
  };

  const submitEmail = (e: any) => {
    e.preventDefault();
    setButtonClickTimeout(true);

    axios
      .post(`${API}/auth/forgotpassword`, {
        email: emailAdress,
      })
      .then((res) => {
        setIsEmailCorrect(res.data ? true : false);
        setButtonClickTimeout(false);
        setMailVisible(false);
      })
      .catch(() => {
        setIsEmailCorrect(false);
        setIsEmailInCorrect(true);
        setButtonClickTimeout(false);
        setTimeout(() => {
          setIsEmailInCorrect(false);
        }, 4000);
      });
  };
  const submitNewPassword = (e: any) => {
    e.preventDefault();

    axios
      .put(`${API}/auth/forgotpassword`, {
        verificationCode,
        newPassword,
      })
      .then(() => passwordChanged())
      .catch(() => {
        setInputMessage({
          message: "ვერიფიკაციის კოდი არასწორია",
          messageColor: false,
        });
        setTimeout(() => {
          setInputMessage({
            message: "",
            messageColor: false,
          });
        }, 2500);
      });
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-5 px-4">
      <h1 className="text-2xl text-center">პაროლის აღდგენა</h1>
      <p className="text-center">მიუთითეთ თქვენი ინფორმაცია</p>

      {mailVisible && (
        <input
          name="password"
          placeholder="Enter Email"
          value={emailAdress}
          onChange={(e) => setEmailAdress(e.target.value)}
          className="w-full max-w-md h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent"
        />
      )}

      {isEmailIncorrect && (
        <InputMessageComp
          message={"მეილი არასწორია"}
          boolean={!isEmailIncorrect}
        />
      )}

      {isEmailCorrect && (
        <>
          <div className="w-full flex flex-col items-center">
            <p className="text-xs text-center">მიუთითეთ ვერიფიკაციის კოდი</p>
            <input
              placeholder="მიუთითეთ ვერიფიკაციის კოდი"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full max-w-md h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent"
            />
          </div>

          <div className="relative w-full max-w-md text-center">
            <p className="text-xs text-left">მიუთითეთ ახალი პაროლი</p>
            <input
              value={newPassword}
              placeholder="მიუთითეთ ახალი პაროლი"
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent"
              name="password"
              type={showPassword ? "text" : "password"}
            />
            {showPassword ? (
              <FaEye
                className="cursor-pointer text-md absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword((current) => !current)}
              />
            ) : (
              <FaEyeSlash
                className="cursor-pointer text-lg absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword((current) => !current)}
              />
            )}
          </div>
        </>
      )}

      <InputMessageComp
        boolean={inputMessage.messageColor}
        message={inputMessage.message}
      />

      <h1
        className="cursor-pointer text-center mb-5 text-yellowButtonHover hover:underline transition-all duration-300 text-sm sm:text-base"
        onClick={() => props.setForgotPassword(false)}
      >
        მთავარ გვერდზე დაბრუნება
      </h1>

      <button
        className={`w-full max-w-md py-5 bg-yellowButton rounded-md shadow-yellowShadow hover:bg-yellowButtonHover transition-all ${
          buttonClickTimeout ? "cursor-not-allowed" : ""
        }`}
        onClick={isEmailCorrect ? submitNewPassword : submitEmail}
      >
        პაროლის აღდგენა
      </button>
    </div>
  );
}
