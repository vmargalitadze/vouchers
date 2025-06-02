import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../baseAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";

import Loader from "../../../components/Loader";
import მაღაზიები from "../../../assets/photos/3.webp";
import ესთეტიკა from "../../../assets/photos/2.webp";
import მედიკამენტები from "../../../assets/photos/1.webp";
import კვება from "../../../assets/photos/4.webp";
import { Link } from "react-router-dom";
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
}

export default function DashboardTop() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [voucherTypes, setVoucherTypes] = useState<string[]>([]);

  const images: { [key: string]: string } = {
    მაღაზიები,
    ესთეტიკა,
    მედიკამენტები,
    კვება,
  };

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const [topResponse, voucherResponse] = await Promise.all([
          axios.get(`${API}/vouchers/top`),
          axios.get(`${API}/vouchers`),
        ]);

        setVouchers(topResponse.data);

        setVoucherTypes(voucherResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
        setError("Failed to fetch vouchers");
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  return (
    <>
      {/* React Helmet for Meta Tags */}
      <Helmet>
        <title>Offers Card | მთავარი გვერდი</title>
        <meta
          name="keywords"
          content="vouchers,ფასდაკლება,ფასდაკლებები Tbilisi, offers-card ,offers,cards,discount, discounts, special offers,discount,offers,ვაუჩერები,ფასდაკლებები,ვაუჩერი,ფასდაკლება,შეთავაზება,ბარათები, შეთავაზებები "
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="text-white text-center  p-4 lg:py-8 !w-full">
        <h2 className="text-2xl font-bold mb-4 sm:text-xl">სერვისები</h2>

        <div className="w-full mb-6 flex justify-center items-center mx-auto">
          {voucherTypes.length > 0 && (
            <Swiper
              slidesPerView={1} // default for small screens
              spaceBetween={10}
              freeMode={false}
              autoplay={{ delay: 1500, disableOnInteraction: false }}
              modules={[FreeMode, Pagination, Autoplay]}
              className="mySwiper max-w-3xl w-full"
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 12,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
              }}
            >
              {voucherTypes.map((type) => (
                <SwiperSlide key={type}>
                  <Link
                    to={`/cards/${type}`}
                    className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center text-center hover:bg-gray-700 transition-colors w-full max-w-[220px] mx-auto"
                  >
                    <div
                      className="w-16 h-16 mb-2 rounded-full"
                      style={{
                        backgroundImage: `url(${
                          images[type] || images["მაღაზიები"]
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                    <h2 className="text-2xl  font-semibold">
                      {type}
                    </h2>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold my-4 sm:text-[16px]">ფავორიტები</h2>
          <Link
            to="/all"
            className="px-4 py-2 bg-yellow-600  rounded-lg text-black transition-colors shadow-sm"
          >
            ყველა კომპანია-&gt;
          </Link>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <Loader width="50px" />
        ) : (
          <>
            <Swiper
              slidesPerView={1} // Default for mobile (smallest screens)
              spaceBetween={10} // Default space for mobile
              freeMode={true}
              autoplay={{ delay: 1500, disableOnInteraction: false }}
              modules={[FreeMode, Pagination, Autoplay]}
              className="mySwiper" // Removed Tailwind responsive classes for slidesPerView and spaceBetween
              breakpoints={{
                // Tailwind sm breakpoint (>= 640px)
                640: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                // Tailwind md breakpoint (>= 768px)
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                // Tailwind lg breakpoint (>= 1024px)
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {vouchers.map((voucher) => (
                <SwiperSlide key={voucher.id} className="voucher-slide">
                  <Link
                    to={`/company/${voucher.id}`}
                    className="w-full flex flex-col gap-2"
                  >
                    <div
                      className="voucher-card relative border border-yellow-500 rounded-lg p-4 text-white cursor-pointer"
                      style={{
                        backgroundImage: `url(${voucher.photos[0] || ""})`,
                      }}
                    ></div>
                    <h2 className="object-name text-2xl sm:text-[16px] font-bold mb-2">
                      {voucher.object_name}
                    </h2>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </>
  );
}
