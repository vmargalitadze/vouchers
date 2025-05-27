import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { API } from "../../../baseAPI";
import InputMessageComp from "../../../components/InputMessage";
import { Checkbox } from "@mui/material";
import image1 from'../../../assets/rules/rules-images-0.jpg'
import image2 from "../../../assets/rules/rules-images-1.jpg";
import image3 from "../../../assets/rules/rules-images-2.jpg";
import image4 from "../../../assets/rules/rules-images-3.jpg";
import image5 from "../../../assets/rules/rules-images-4.jpg";
import image6 from "../../../assets/rules/rules-images-5.jpg";
import image7 from'../../../assets/rules/rules-images-6.jpg'
import image8 from "../../../assets/rules/rules-images-7.jpg";
import image9 from "../../../assets/rules/rules-images-8.jpg";
import image10 from "../../../assets/rules/rules-images-9.jpg";
import image11 from'../../../assets/rules/rules-images-10.jpg'
import image12 from'../../../assets/rules/rules-images-11.jpg'

import anotherImage1 from '../../../assets/rules/პერსონალურ_მონაცემთა_დაცვის_პოლიტიკა_250305_003740-images-0.jpg'
import anotherImage2 from "../../../assets/rules/პერსონალურ_მონაცემთა_დაცვის_პოლიტიკა_250305_003740-images-1.jpg";
import anotherImage3 from "../../../assets/rules/პერსონალურ_მონაცემთა_დაცვის_პოლიტიკა_250305_003740-images-2.jpg";
import anotherImage4 from "../../../assets/rules/პერსონალურ_მონაცემთა_დაცვის_პოლიტიკა_250305_003740-images-3.jpg";
import anotherImage5 from "../../../assets/rules/პერსონალურ_მონაცემთა_დაცვის_პოლიტიკა_250305_003740-images-4.jpg";
import anotherImage6 from "../../../assets/rules/პერსონალურ_მონაცემთა_დაცვის_პოლიტიკა_250305_003740-images-5.jpg";
import anotherImage7 from "../../../assets/rules/პერსონალურ_მონაცემთა_დაცვის_პოლიტიკა_250305_003740-images-6.jpg";
import anotherImage8 from "../../../assets/rules/პერსონალურ_მონაცემთა_დაცვის_პოლიტიკა_250305_003740-images-7.jpg";
import anotherImage9 from "../../../assets/rules/პერსონალურ_მონაცემთა_დაცვის_პოლიტიკა_250305_003740-images-8.jpg";
import anotherImage10 from "../../../assets/rules/პერსონალურ_მონაცემთა_დაცვის_პოლიტიკა_250305_003740-images-9.jpg";
import anotherImage11 from "../../../assets/rules/პერსონალურ_მონაცემთა_დაცვის_პოლიტიკა_250305_003740-images-10.jpg";
import anotherImage12 from "../../../assets/rules/პერსონალურ_მონაცემთა_დაცვის_პოლიტიკა_250305_003740-images-11.jpg";
import anotherImage13 from "../../../assets/rules/პერსონალურ_მონაცემთა_დაცვის_პოლიტიკა_250305_003740-images-12.jpg";
import anotherImage14 from "../../../assets/rules/პერსონალურ_მონაცემთა_დაცვის_პოლიტიკა_250305_003740-images-13.jpg";
import anotherImage15 from "../../../assets/rules/პერსონალურ_მონაცემთა_დაცვის_პოლიტიკა_250305_003740-images-14.jpg";




export default function SignUp(props: { setIsLogging: Function }) {
  interface SubmitInfoInterface {
    messageColorBoolean: boolean | undefined;
    message: string;
  }

  const anotherImages = [
    anotherImage1,
    anotherImage2,
    anotherImage3,
    anotherImage4,
    anotherImage5,
    anotherImage6,
    anotherImage7,
    anotherImage8,
    anotherImage9,
    anotherImage10,
    anotherImage11,
    anotherImage12,
    anotherImage13,
    anotherImage14,
    anotherImage15,
  ];

  const [isAnotherModalOpen, setIsAnotherModalOpen] = useState(false);
const rulesImages = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
];

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
        setTimeout(() => {
          props.setIsLogging(true);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        // Handle error message here
      });
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPdfOpen, setIsPdfOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-center items-center gap-5 xl:w-full">
      <h1 className="text-2xl">რეგისტრაცია</h1>
      <p>მიუთითეთ თქვენი ინფორმაცია</p>
      <form
        className="flex flex-col gap-5 lg:w-full"
        onSubmit={handleFormSubmit}
      >
        <label>
          <p className="mb-2 mx-0.5">სახელი</p>
          <input
            name="username"
            type="text"
            className="w-[470px] lg:w-[100%] h-[50px] rounded-md border border-gray-600 outline-none px-3 text-sm bg-transparent"
            onChange={handleInput}
            value={formValue.username}
            required
          />
        </label>

        <label>
          <p className="mb-2 mx-0.5">მეილი</p>
          <input
            name="email"
            type="text"
            className="w-[470px] lg:w-[100%] h-[50px] rounded-md border border-gray-600 outline-none px-3 text-sm bg-transparent"
            onChange={handleInput}
            value={formValue.email}
            required
          />
        </label>

        <label>
          <p className="mb-2 mx-0.5">პაროლი</p>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="w-[470px] lg:w-[100%] h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent"
              onChange={handleInput}
              value={formValue.password}
              required
              min={5}
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
        </label>

        <label>
          <p className="mb-2 mx-0.5">მოსაწვევი კოდი (არასავალდებულო)</p>
          <input
            name="referralCode"
            type="text"
            className="w-[470px] lg:w-[100%] h-[50px] rounded-md border border-gray-600 outline-none px-3 text-sm bg-transparent"
            onChange={handleInput}
            value={formValue.referralCode}
          />
        </label>

        <label>
          <p className="mb-2 mx-0.5">პრომო კოდი (არრასავალდებულო)</p>
          <input
            name="promoCode"
            type="text"
            className="w-[470px] lg:w-[100%] h-[50px] rounded-md border border-gray-600 outline-none px-3 text-sm bg-transparent"
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

        <div className="flex items-center flex-col">
          <div className="flex items-center">
            <Checkbox required className="ckeck border !border-yellow-300" />
            <p className="flex gap-1">
              ვეთანხმები
              <span
                className="underline text-yellow-500 cursor-pointer"
                onClick={() => setIsPdfOpen(true)}
              >
                პირობებს
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <Checkbox required className="ckeck border !border-yellow-300" />
            <p className="flex gap-1">
              ვეთანხმები
              <span
                className="underline text-yellow-500 cursor-pointer"
                onClick={() => setIsAnotherModalOpen(true)}
              >
                მონაცემთა დაცვის პოლიტიკას
              </span>
            </p>
          </div>
        </div>

        <input
          className="w-[470px] lg:w-[100%] py-5 bg-yellowButton rounded-md shadow-yellowShadow mt-5 outline-none cursor-pointer hover:bg-yellowButtonHover transition-all"
          value={"რეგისტრაცია"}
          type="submit"
        />
      </form>

      {isPdfOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className=" w-full h-full overflow-auto relative z-10">
            <button
              onClick={() => setIsPdfOpen(false)}
              className="absolute top-5 right-5 text-white px-3 py-1 rounded z-20"
            >
              დახურვა
            </button>
            <h2 className="text-lg font-semibold text-center mt-6 mb-4">
              წესები და პირობები
            </h2>
            <div className="space-y-5 px-5 pb-10">
              {rulesImages.map((imageSrc, index) => (
                <img
                  key={index}
                  src={imageSrc}
                  alt={`წესები გვერდი ${index + 1}`}
                  className="w-full h-auto object-scale-down"
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {isAnotherModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-full h-full overflow-auto relative z-10">
            <button
              onClick={() => setIsAnotherModalOpen(false)}
              className="absolute top-5 right-5 text-white px-3 py-1 rounded z-20"
            >
              დახურვა
            </button>
            <h2 className="text-lg font-semibold text-center mt-6 mb-4">
              დამატებითი ინფორმაცია
            </h2>
            <div className="space-y-5 px-5 pb-10">
              {anotherImages.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`დამატებითი გვერდი ${index + 1}`}
                  className="w-full h-auto object-scale-down"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
} 

