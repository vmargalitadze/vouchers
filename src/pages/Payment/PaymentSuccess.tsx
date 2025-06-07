import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyPayment } from "../../services/payment";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const verifyPaymentStatus = async () => {
      if (!orderId) {
        setError("გადახდის ID ვერ მოიძებნა");
        setLoading(false);
        return;
      }

      try {
        await verifyPayment(orderId);
        timer = setTimeout(() => {
          navigate("/Dashboard");
        }, 3000);
      } catch (err) {
        setError("გადახდის ვერიფიკაცია ვერ მოხერხდა. გთხოვთ დაგვიკავშირდით.");
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
  }, [orderId, navigate]);

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
