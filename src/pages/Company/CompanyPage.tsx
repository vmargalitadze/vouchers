import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../baseAPI";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../Context/myContext";
import "swiper/css/navigation";
import "swiper/css";

import OrderLimitModal from "../../components/OrderLimitModal";

interface Item {
  id: string;
  object_name: string;
  discount: string;
  description: string;
  photo_path: string;
  isOnline?: number;
}

interface Voucher {
  id: number;
  type: string;
  isOnline?: number;
  city: string;
  object_name: string;
  discount: string;
  link: string;
  password: string;
  photos: string[];
  description: string;
  adress?: string;
  fb?: string;
  insta?: string;
}

const CompanyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [showLimitModal, setShowLimitModal] = useState<boolean>(false);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    company: Voucher | null;
    items: Item[];
  }>({
    company: null,
    items: [],
  });

  useEffect(() => {
    const savedOrderCount = localStorage.getItem("dailyOrderCount");
    const savedDate = localStorage.getItem("orderCountDate");
    const today = new Date().toDateString();

    if (savedDate === today && savedOrderCount) {
      setOrderCount(parseInt(savedOrderCount));
    } else {
      // Reset count if it's a new day
      localStorage.setItem("orderCountDate", today);
      localStorage.setItem("dailyOrderCount", "0");
      setOrderCount(0);
    }
  }, []);

  const handleOrder = () => {
    if (orderCount >= 5) {
      setShowLimitModal(true);
      return;
    }

    const newCount = orderCount + 1;
    setOrderCount(newCount);
    localStorage.setItem("dailyOrderCount", newCount.toString());

    // Navigate to send page if under limit
    navigate("/send", {
      state: {
        objId: data.company?.id,
        items: data.items,
        userId: context?.userInfo?.id,
      },
    });
  };

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const [itemsResponse, vouchersResponse] = await Promise.all([
          axios.get(`${API}/vouchers/getfrommodal/${id}`),
          axios.get(`${API}/vouchers/top`),
        ]);

        const itemsData = Array.isArray(itemsResponse.data)
          ? itemsResponse.data
          : [];

        const companyData: Voucher | undefined = vouchersResponse.data.find(
          (voucher: Voucher) => String(voucher.id) === id
        );

        setData({
          company: companyData || null,
          items: itemsData,
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompanyData();
    }
  }, [id]);
  console.log(context?.userInfo);

  return (
    <div className="p-6  max-w-6xl mx-auto">
      <OrderLimitModal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
      />
      {loading ? (
        <p className="text-center text-gray-500">იტვირთება...</p>
      ) : (
        <>
          {data.company && (
            <div className="container mb-10 mx-auto  mt-16">
              <div className="mb-5 flex items-start">
                <button
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 bg-yellow-600  rounded-lg text-black transition-colors shadow-sm"
                >
                  ← უკან დაბრუნება
                </button>
              </div>
              <div className="flex flex-col items-center gap-6">
                <div className="w-full">
                  <img
                    alt="Company"
                    src={data.company.photos[0]}
                    className="w-full h-72 sm:h-80 md:h-[400px] object-cover rounded-xl shadow-lg"
                  />
                </div>

                <div className="w-full text-yellow-600 flex flex-col gap-4 text-start">
                  <h1 className="text-xl sm:text-[20px] md:text-2xl font-bold">
                    {data.company.object_name}
                  </h1>

                  <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                    {data.company.description}
                  </p>
                  <p className="text-sm flex sm:text-base font-medium">
                    <span className="font-semibold text-yellow-600">
                      სოციალური ქსელები:
                    </span>{" "}
                    <div className="flex">
                      <Link
                        to={data.company.fb || ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mx-2 text-white text-2xl bg-[#1877F2]"
                      >
                        <FaFacebook />
                      </Link>
                      {data.company.insta && (
                        <Link
                          to={data.company.insta}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mx-2 text-white text-2xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"
                        >
                          <FaInstagram />
                        </Link>
                      )}
                    </div>
                  </p>

                  <p className="text-sm sm:text-base font-medium">
                    <span className="font-semibold text-yellow-600">
                      ქალაქი:
                    </span>{" "}
                    {JSON.parse(data.company.city || "[]")[0] || "უცნობი"}
                  </p>

                  <p className="text-sm sm:text-base font-medium">
                    <span className="font-semibold text-yellow-600">
                      მისამართი:
                    </span>{" "}
                    {data.company.adress}
                  </p>

                  {data.company.discount && (
                    <p className="text-sm sm:text-base font-medium text-green-600">
                      ფასდაკლება: {data.company.discount}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <h2 className="text-2xl text-yellow-500 text-center mb-6">
            კომპანიის პროდუქტები
          </h2>

          <div className="grid  grid-cols-4 sm:gap-y-7 gap-5 sm:grid-cols-1  mb-6">
            {data.items.map((item) => (
              <div
                key={item.id}
                className="w-full rounded-2xl shadow-lg overflow-hidden group bg-white flex flex-col"
              >
                {/* Product image */}
                <div className="w-full h-[40vh] overflow-hidden">
                  <img
                    src={item.photo_path}
                    alt={item.object_name}
                    className="w-full h-full object-cover sm:object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Bottom content */}
                <div className="p-4 flex flex-col items-center text-center gap-2 bg-white">
                  {item.discount && (
                    <p className="text-yellow-500 text-sm">{item.discount}</p>
                  )}

                  {data.company?.isOnline === 1 && (
                    <>
                      {context?.isLoggined ? (
                        context?.userInfo?.subscription === 1 ? (
                          <button
                            onClick={handleOrder}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition w-full max-w-xs"
                          >
                            შეკვეთა
                          </button>
                        ) : (
                          <Link
                            to="/profile"
                            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition w-full max-w-xs"
                          >
                            ჩართე გამოწერა
                          </Link>
                        )
                      ) : (
                        <Link
                          to="/login"
                          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition w-full max-w-xs"
                        >
                          შესვლა
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyPage;
