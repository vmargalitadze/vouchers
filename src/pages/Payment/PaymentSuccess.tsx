import { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyPayment } from "../../services/payment";
import { MyContext } from "../../Context/myContext";
import axios from "axios";
import { API } from "../../baseAPI";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const context = useContext(MyContext);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const verifyPaymentStatus = async () => {
      if (!orderId) {
        setError("გადახდის ID ვერ მოიძებნა");
        setLoading(false);
        return;
      }

      try {
        // First verify the payment
        await verifyPayment(orderId);

        // Then verify token and update user info
        const token = localStorage.getItem("Token");
        if (!token) {
          throw new Error("ავტორიზაცია ვერ მოხერხდა");
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

        timer = setTimeout(() => {
          navigate("/Dashboard");
        }, 3000);
      } catch (err: any) {
        console.error("Error:", err);
        setError(err.message || "გადახდის ვერიფიკაცია ვერ მოხერხდა. გთხოვთ დაგვიკავშირდით.");
        localStorage.removeItem("Token"); // Remove invalid token if any
      } finally {
        setLoading(false);
      }
    };

    verifyPaymentStatus();

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [orderId, navigate, context]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent"></div>
        <p className="text-lg text-gray-500 mt-4">გადახდის ვერიფიკაცია მიმდინარეობს...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-semibold text-red-600 mb-4">
          ⚠️ {error}
        </h1>
        <button
          onClick={() => navigate("/Dashboard")}
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          მთავარ გვერდზე დაბრუნება
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-semibold text-green-600 mb-4">
        ✅ გადახდა წარმატებით შესრულდა
      </h1>
      <p className="text-lg text-gray-500">
        Dashboard-ზე გადამისამართება მიმდინარეობს...
      </p>
    </div>
  );
}

export default PaymentSuccess;
