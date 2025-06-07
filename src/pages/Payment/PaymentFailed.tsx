import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { MyContext } from "../../Context/myContext";
import axios from "axios";
import { API } from "../../baseAPI";

function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [redirecting, setRedirecting] = useState(false);
  const context = useContext(MyContext);

  useEffect(() => {
    const verifyAuthAndRedirect = async () => {
      try {
        const token = localStorage.getItem("Token");
        if (!token) {
          window.location.href = "/#/Dashboard";
          return;
        }

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
        
        window.location.href = "/#/Dashboard";
      } catch (err) {
        console.error("Error:", err);
        window.location.href = "/#/Dashboard";
      }
    };

    if (orderId) {
      setRedirecting(true);
      const redirectTimeout = setTimeout(() => {
        verifyAuthAndRedirect();
      }, 2000);

      return () => clearTimeout(redirectTimeout);
    } else {
      window.location.href = "/#/Dashboard";
    }
  }, [orderId, context]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white/5 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold text-red-600 mb-4">
          ❌ გადახდა ვერ შესრულდა
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          გთხოვთ, სცადოთ ისევ. თუ პრობლემა გრძელდება, ჩვენთან უნდა დაგვიკავშირდეთ დახმარებისთვის.
        </p>
        {redirecting && (
          <p className="text-sm text-gray-400 animate-pulse">
            გადამისამართება მიმდინარეობს...
          </p>
        )}
      </div>
    </div>
  );
}

export default PaymentFailed;
