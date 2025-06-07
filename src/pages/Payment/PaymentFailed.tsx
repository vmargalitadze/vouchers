import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (orderId) {
      setRedirecting(true);
      timer = setTimeout(() => {
        navigate("/Dashboard");
      }, 3000);
    } else {
      navigate("/Dashboard");
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [orderId, navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white/5 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold text-red-600 mb-4">
          ❌ გადახდა ვერ შესრულდა
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          გთხოვთ, სცადოთ ხელახლა. თუ პრობლემა გრძელდება, დაგვიკავშირდით.
        </p>
        {redirecting ? (
          <p className="text-sm text-gray-400 animate-pulse">
            მთავარ გვერდზე გადამისამართება მიმდინარეობს...
          </p>
        ) : (
          <button
            onClick={() => navigate("/Dashboard")}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            მთავარ გვერდზე დაბრუნება
          </button>
        )}
      </div>
    </div>
  );
}

export default PaymentFailed;
