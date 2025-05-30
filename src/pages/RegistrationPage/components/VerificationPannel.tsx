import { useContext, useState } from "react";
import axios from "axios";
import InputMessageComp from "../../../components/InputMessage";
import { API } from "../../../baseAPI";
import { MyContext } from "../../../Context/myContext";


export default function VerificationPannel(props: {
  SetIsUserVerified: Function;
}) {
  const [verificationCode, setVerificationCode] = useState<string>("");

  const [submitMessage, setSubmitMessage] = useState<boolean | undefined>(
    undefined
  ); // verification code ს დასაბმითბისას გამოიტანს ან სწორია და ვერიფიკაცია წარმატებით გაიარე ან ვერიფიკაციის კოდი არასწორია

  const verificationSuccess = () => {
    setSubmitMessage(true);
    setTimeout(() => {
      props.SetIsUserVerified(true);
    }, 1500);
  };
  const context = useContext(MyContext);


  const submitVerificationCode = () => {
    axios
      .put(`${API}/auth/register/verify`, {
        verificationnumber: verificationCode,
        language:context?.defaultLanguage,
      })
      .then(() => verificationSuccess())
      .catch(() => {
        setSubmitMessage(false);
        setTimeout(() => {
          setSubmitMessage(undefined);
        }, 1500);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 xl:w-full">
      <h1 className="text-2xl">გთხოვთ გაიაროთ ვერიფიკაცია</h1>
      <p>შეამოწმეთ მეილი კოდის სანახავად</p>

      <input
        value={verificationCode}
        placeholder={"მიუთითედ ვერიფიკაციის კოდი"}
        onChange={(e) => setVerificationCode(e.target.value)}
        className="w-[470px] xl:w-full  h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent"
      />
      {submitMessage !== undefined && (
        <InputMessageComp
          boolean={submitMessage}
          message={
            submitMessage
              ? "ვერიფიკაცია წარმატებით გაიარეთ"
              : "ვერიფიკაციის კოდი არასწორია"
          }
        />
      )}

      <h1
        className="cursor-pointer w-full"
        onClick={() => props.SetIsUserVerified(true)}
      >
        მთავარ გვერდზე დაბრუნება
      </h1>

      <button
        className={`w-[470px] py-5 bg-yellowButton rounded-md shadow-yellowShadow  hover:bg-yellowButtonHover transition-all xl:w-full
      
      }`}
        onClick={submitVerificationCode}
      >
        კოდის გაგზავნა
      </button>
    </div>
  );
}
