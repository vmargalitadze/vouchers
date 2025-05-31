import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../baseAPI";

import { useNavigate } from "react-router-dom";
import { MyContext } from "../../Context/myContext";
import "swiper/css/navigation";
import "swiper/css";
import Carousel from "./Carousel";

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
}

const CompanyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const context = useContext(MyContext);
  console.log(context?.userInfo?.subscription);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    company: Voucher | null;
    items: Item[];
  }>({
    company: null,
    items: [],
  });
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

  return (
    <div className="p-6  max-w-6xl mx-auto">
      {loading ? (
        <p className="text-center text-gray-500">იტვირთება...</p>
      ) : (
        <>
          {data.company && (
            <div className="container mb-10 mx-auto px-4 mt-16">
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
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                    {data.company.object_name}
                  </h1>

                  <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                    {data.company.description}
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
                    <p className="text-sm sm:text-base font-medium text-yellow-600">
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

          <div className="grid sm:hidden grid-cols-3 gap-2 mb-6">
            {data.items.map((item) => (
              <div
                key={item.id}
                className="bg-white h-[400px] rounded-2xl shadow-lg p-4 flex flex-col justify-between items-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-full h-60 mb-4">
                  <img
                    src={item.photo_path}
                    alt={item.object_name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="flex flex-row justify-between items-center  gap-1 text-center">
                  <p className="text-yellow-600 text-sm">{item.discount}</p>
                  {data.company?.isOnline === 1 &&
                    (context?.isLoggined ? (
                      context?.userInfo?.subscription === 1 ? (
                        <Link
                          to="/send"
                          state={{
                            objId: data.company.id,
                            items: data.items,
                            userId: context?.userInfo?.id,
                          }}
                          className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                        >
                          შეკვეთა
                        </Link>
                      ) : (
                        <Link
                          to="/profile"
                          className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                        >
                          ჩართე გამოწერა
                        </Link>
                      )
                    ) : (
                      <Link
                        to="/login"
                        className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                      >
                        შესვლა
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* დიდი ეკრანებზე swiper */}
          <div className="hidden sm:block mb-6">
            <Carousel
              slides={data.items.map((item) => ({
                id: Number(item.id), // Convert string id to number
                image: item.photo_path,
                discount: item.discount,
              }))}
              renderOverlay={(voucher) => (
                <div className=" w-full bg-white flex justify-center items-center flex-col z-24 left-0 right-0  p-4 shadow-md ">
                  <p className="text-yellow-600 text-xl font-semibold">
                    {voucher.discount}
                  </p>
                  {data.company?.isOnline === 1 &&
                    (context?.isLoggined ? (
                      context?.userInfo?.subscription === 1 ? (
                        <Link
                          to="/send"
                          state={{
                            objId: data.company.id,
                            items: data.items,
                            userId: context?.userInfo?.id,
                          }}
                          className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                        >
                          შეკვეთა
                        </Link>
                      ) : (
                        <Link
                          to="/profile"
                          className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                        >
                         ჩართე გამოწერა
                        </Link>
                      )
                    ) : (
                      <Link
                        to="/login"
                        className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                      >
                        შესვლა
                      </Link>
                    ))}
                </div>
              )}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyPage;
