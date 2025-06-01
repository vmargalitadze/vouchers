import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API } from "../../baseAPI";

import { FaFacebook, FaInstagram } from "react-icons/fa";
type Company = {
  id: string | number;
  object_name: string;
  photos?: string;
  insta?: string;
  fb?: string;
};

function All() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(companies);

  useEffect(() => {
    axios
      .get(`${API}/vouchers/top`)
      .then((res) => {
        setCompanies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching companies:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10">იტვირთება...</div>;

  return (
    <div className="w-7xl mx-auto mt-24 ">
      <h1 className="text-3xl font-bold mb-6 text-center">ჩვენი კომპანიები</h1>
      <div className="flex flex-wrap  justify-center">
        {companies.map((company) => (
          <div
            key={company.id}
            className="w-[20vw] sm:w-full md:w-full flex flex-col p-3"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
              <div
                className="bg-cover h-48"
                style={{
                  backgroundImage: `url(${company.photos})`,
                }}
              ></div>
              <div className="p-4 justify-center text-center flex flex-col">
                <div className="flex justify-center mb-4">
                  <Link
                    to={company.fb || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-2 text-white text-2xl bg-[#1877F2]"
                  >
                    <FaFacebook />
                  </Link>
                  {company.insta && (
                    <Link
                      to={company.insta}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mx-2 text-white text-2xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"
                    >
                      <FaInstagram />
                    </Link>
                  )}
                </div>
                <Link
                  to={`/company/${company.id}`}
                  className="text-yellow-600 hover:underline mb-2"
                >
                  <h3 className="text-black text-xl">{company.object_name}</h3>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default All;
