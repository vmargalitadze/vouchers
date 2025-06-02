import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { API } from "../../../baseAPI";
import { Helmet } from "react-helmet";

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
  obj_desc: string;
}

export default function Voucher() {
  const { id } = useParams<{ id: string }>();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(`${API}/vouchers/check`, { type: id })
      .then((res) => {
        const citiesData = Array.isArray(res.data) ? res.data : [];
        setCities(citiesData);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  }, [id]);

  useEffect(() => {
    if (selectedCity) {
      axios
        .post(`${API}/vouchers/vouchers`, { type: id, city: selectedCity })
        .then((res) => {
          setVouchers(res.data);
        })
        .catch((error) => {
          console.error("Error fetching vouchers:", error);
        });
    }
  }, [selectedCity, id]);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
    setSearchQuery(""); // reset search on city change
  };

  const filteredVouchers = vouchers.filter((voucher) =>
    voucher.object_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="text-white p-4">
      <Helmet>
        <title>{`Vouchers in ${id}`}</title>
        <meta
          name="description"
          content={`Browse the available vouchers for ${id}.`}
        />
        <meta name="keywords" content={`vouchers, ${id}, offers`} />
      </Helmet>

      <h1 className="text-2xl font-bold mb-4">კატეგორია : {id}</h1>
      <div className="h-screen">
        <select
          className="bg-white text-black mt-12 p-2 rounded-lg mb-4 w-full"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <option value="" disabled>
            აირჩიეთ ქალაქი
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      {selectedCity && (
        <input
          type="text"
          placeholder="ძიება..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white text-black  p-2 rounded-lg mb-4 w-full"
        />
      )}
      <div className="card-grid">
        {filteredVouchers.map((voucher) => (
          <div key={voucher.id}>
            <button
              className="voucher-card"
              onClick={() => navigate(`/company/${voucher.id}`)}
              style={{ backgroundImage: `url(${voucher.photos[0]})` }}
            ></button>
            <div className="voucher-text">
              <h2>{voucher.object_name}</h2>
            </div>
          </div>
        ))}
        {filteredVouchers.length === 0 && selectedCity && (
          <p className="text-center text-gray-400 mt-4">
            ვაუჩერები ვერ მოიძებნა
          </p>
        )}
      </div>
      </div>


    </div>
  );
}
