/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { API } from "../../baseAPI";
import InputMessageComp from "../../components/InputMessage";
import { Checkbox } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  interface SubmitInfoInterface {
    messageColorBoolean: boolean | undefined;
    message: string;
  }

  const [submitInfo, setSubmitInfo] = useState<SubmitInfoInterface>({
    messageColorBoolean: undefined,
    message: "",
  });

  const [formValue, setFormValue] = useState({
    username: "",
    referralCode: "",
    email: "",
    password: "",
    promoCode: "",
  });
  const navigate = useNavigate();
  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    axios
      .post(`${API}/auth/register`, {
        username: formValue.username,
        password: formValue.password,
        email: formValue.email,
        referralCode: formValue.referralCode || null,
        promo_code: formValue.promoCode || "",
        language: "GE",
      })
      .then((res: any) => {
        setSubmitInfo({
          messageColorBoolean: true,
          message: res.data.message,
        });
        navigate("/login");
      })
      .catch((err: any) => {
        const errorMessage =
          err.response?.data || "დაფიქსირდა შეცდომა, გთხოვთ სცადოთ თავიდან";

        setSubmitInfo({
          messageColorBoolean: false,
          message: errorMessage,
        });

        console.error("Registration error:", err); //
      });
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen text-black mt-7 mb-7 py-10 px-4 sm:px-6 lg:px-8 justify-center items-center">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl text-white font-semibold">რეგისტრაცია</h1>
          <p className="text-sm text-white mt-1">
            მიუთითეთ თქვენი ინფორმაცია
          </p>
        </div>

        <form className="flex  flex-col gap-5" onSubmit={handleFormSubmit}>
          <label>
            <p className="mb-1 text-white">სახელი</p>
            <input
              name="username"
              type="text"
              className="w-full h-[50px] rounded-md border border-gray-300 focus:border-yellow-400 outline-none px-3 text-sm bg-white dark:bg-transparent"
              onChange={handleInput}
              value={formValue.username}
              required
            />
          </label>

          <label>
            <p className="mb-1 text-white">მეილი</p>
            <input
              name="email"
              type="email"
              className="w-full h-[50px] rounded-md border border-gray-300 focus:border-yellow-400 outline-none px-3 text-sm bg-white dark:bg-transparent"
              onChange={handleInput}
              value={formValue.email}
              required
            />
          </label>

          <label>
            <p className="mb-1 text-white">პაროლი</p>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full h-[50px] rounded-md border border-gray-300 focus:border-yellow-400 pr-10 outline-none px-3 text-sm bg-white dark:bg-transparent"
                onChange={handleInput}
                value={formValue.password}
                required
                min={5}
              />
              {showPassword ? (
                <FaEye
                  className="cursor-pointer text-md absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword((current) => !current)}
                />
              ) : (
                <FaEyeSlash
                  className="cursor-pointer text-md absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword((current) => !current)}
                />
              )}
            </div>
          </label>

          <label>
            <p className="mb-1 text-white">მოსაწვევი კოდი (არასავალდებულო)</p>
            <input
              name="referralCode"
              type="text"
              className="w-full h-[50px] rounded-md border border-gray-300 focus:border-yellow-400 outline-none px-3 text-sm bg-white dark:bg-transparent"
              onChange={handleInput}
              value={formValue.referralCode}
            />
          </label>

          <label>
            <p className="mb-1 text-white">პრომო კოდი (არასავალდებულო)</p>
            <input
              name="promoCode"
              type="text"
              className="w-full h-[50px] rounded-md border border-gray-300 focus:border-yellow-400 outline-none px-3 text-sm bg-white dark:bg-transparent"
              onChange={handleInput}
              value={formValue.promoCode}
            />
          </label>

          {submitInfo.messageColorBoolean !== undefined && (
            <InputMessageComp
              boolean={submitInfo.messageColorBoolean}
              message={submitInfo.message}
            />
          )}

          <div className="flex flex-col gap-2">
            <label className="flex  items-start gap-2 text-sm">
            <Checkbox required className="white-checkbox mt-1" />
              <span className="text-white">
                ვეთანხმები{" "}
                <Link to="/rules" className="underline text-yellow-500">
                  წესებს და პირობებს
                </Link>
              </span>
            </label>

            <label className="flex items-start gap-2 text-sm">
               <Checkbox required className="white-checkbox mt-1" />
              <span className="text-white">
                ვეთანხმები{" "}
                <Link to="/politic" className="underline text-yellow-500">
                  მონაცემთა დაცვის პოლიტიკას
                </Link>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-yellowButton text-black font-medium rounded-md shadow-yellowShadow hover:bg-yellowButtonHover transition-all"
          >
            რეგისტრაცია
          </button>
        </form>
      </div>
    </div>
  );
}
