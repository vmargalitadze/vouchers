/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../baseAPI";

export default function SeeModal({ voucher, setSeeModal }: any) {
  const [offerData, setOfferData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVoucherId = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API}/vouchers/getfrommodal/${voucher.id}`
        );
        setOfferData(response.data); // ველით, რომ response.data არის array
  
      } catch (error) {
        console.error("Error fetching voucher data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (voucher.id) {
      fetchVoucherId();
    }

    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [voucher.id]);

  return (
    <div className="modal blurred-background p-6 flex items-end overflow-y-auto max-h-full h-[100vh]">
      <h2 className="absolute top-12 text-yellow-500 text-center">
        {voucher.discount}
      </h2>
   

      {loading ? (
        <p className="text-white text-center mt-10">იტვირთება...</p>
      ) : (
        <div className="flex flex-col gap-4 h-[80%] overflow-y-auto w-full max-w-md mx-auto">
          {offerData.map((offer, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center w-full h-fit"
            >
              <img
                src={offer.photo_path}
                alt="offer"
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <p className="text-gray-800 text-center">{offer.discount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
