import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      console.log("Order failed with ID:", orderId);

      const timer = setTimeout(() => {
        navigate("/Dashboard");
      }, 3000); // 3 წამი

      return () => clearTimeout(timer); // Cleanup, თუ კომპონენტი დაიშლება მანამდე
    }
  }, [orderId, navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-semibold text-red-600">
        ❌ გადახდა ვერ შესრულდა. გთხოვთ, სცადოთ ისევ.
      </h1>
      <p className="text-lg text-gray-600 mt-4">
        თუ პრობლემა გრძელდება, ჩვენთან უნდა დაგვიკავშირდეთ დახმარებისთვის.
      </p>
      <p className="text-sm text-gray-400 mt-2">
        გადამისამართება მიმდინარეობს...
      </p>
    </div>
  );
}

export default PaymentFailed;
