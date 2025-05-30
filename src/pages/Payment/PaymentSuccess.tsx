import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../baseAPI";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      axios
        .post(`${API}/users/verify-bog-payment`, { orderId })
        .then(() => {
       

          const timer = setTimeout(() => {
            navigate("/Dashboard");
          }, 3000); // 3 წამში გადამისამართება

          return () => clearTimeout(timer); // Cleanup
        })
        .catch((err) => {
          console.error("Payment verification failed:", err);
        });
    }
  }, [orderId, navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-semibold text-green-600">
        ✅ გადახდა წარმატებით შესრულდა
      </h1>
      <p className="text-sm text-gray-500 mt-2">
        დashboard-ზე გადამისამართება მიმდინარეობს...
      </p>
    </div>
  );
}

export default PaymentSuccess;
