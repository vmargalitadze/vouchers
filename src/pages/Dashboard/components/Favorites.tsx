import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../baseAPI";
import "./carousel.css";
import { Link } from "react-router-dom";

interface Voucher {
  id: number;
  type: string;
  city: string;
  object_name: string;
  discount: string;
  link: string;
  password: string;
  photos: string[];
  description: string;
}

function Favorites() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const res = await axios.get(`${API}/vouchers/top`);
        setVouchers(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
        setError("Failed to fetch vouchers");
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (vouchers.length === 0) return <div>No vouchers available</div>;

  // იკეცება 2-ჯერ ეფექტისთვის
  const duplicated = [...vouchers, ...vouchers];

  return (
    <div className="slider text-center mb-10 my-3">
      <h2 className="text-xl font-semibold py-3"> ჩვენი პარტნიორები </h2>
      <div className="slide-track">
        {duplicated.map((voucher, idx) => (
          <div className="slide" key={idx}>
            <Link
              to={`/company/${voucher.id}`}
              className="w-full flex flex-col gap-2"
            >
              <img
                src={voucher.photos[0] || "/images/default.jpg"}
                alt={voucher.object_name}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
