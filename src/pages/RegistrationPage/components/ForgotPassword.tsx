/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import {  useState } from "react";
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
          message: 'ვერიფიკაციის კოდი არასწორია',
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
    <div className="flex flex-col  justify-center items-center gap-5 md:w-full">
      <h1 className="text-2xl">პაროლის აღდგენა</h1>
      <p>მიუთითეთ თქვენი ინფორმაცია</p>
      {mailVisible ? (
        <input
          name="password"
          placeholder="Enter Email"
          value={emailAdress}
          onChange={(e) => setEmailAdress(e.target.value)}
          className="w-[470px] md:!w-full  h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent"
        />
      ) : (
        ""
      )}
      {isEmailIncorrect && (
        <InputMessageComp
          message={"მეილი არასწორია"}
          boolean={!isEmailIncorrect}
        />
      )}
      {isEmailCorrect && (
        <>
          <div className="w-full flex flex-col items-center ">
            <p className="text-xs"> მიუთითეთ ვერიფიკაციის კოდი</p>{" "}
            <input
              placeholder={"მიუთითეთ ვერიფიკაციის კოდი"}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-[470px] md:!w-full h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent"
            />
          </div>
          <div className="relative md:w-full text-center">
            <div className="w-full">
              <p className="text-xs">მიუთითეთ ახალი პაროლი</p>
              <input
                value={newPassword}
                placeholder={"მიუთითეთ ახალი პაროლი"}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-[470px] md:!w-full h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent"
                name="password"
                type={showPassword ? "text" : "password"}
              />
            </div>
            {showPassword ? (
              <FaEye
                className="cursor-pointer text-md absolute right-3 top-1/2 transform  -translate-y-1/2"
                onClick={() => setShowPassword((current) => !current)}
              />
            ) : (
              <FaEyeSlash
                className="cursor-pointer text-lg absolute right-3 top-1/2 transform  -translate-y-1/2"
                onClick={() => setShowPassword((current) => !current)}
              />
            )}
          </div>
        </>
      )}
      <h1
        className="cursor-pointer w-full "
        onClick={() => props.setForgotPassword(false)}
      >
        მთავარ გვერდზე დაბრუნება
      </h1>

      <InputMessageComp
        boolean={inputMessage.messageColor}
        message={inputMessage.message}
      />
      <button
        className={`w-[470px] md:w-full py-5 bg-yellowButton rounded-md shadow-yellowShadow  hover:bg-yellowButtonHover transition-all ${
          buttonClickTimeout ? "cursor-not-allowed " : ""
        }`}
        onClick={isEmailCorrect ? submitNewPassword : submitEmail}
      >
        პაროლის არდგენა
      </button>

    </div>
  );
}
