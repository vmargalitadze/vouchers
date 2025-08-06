import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../baseAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import Loader from "../../../components/Loader";
import მაღაზიები from "../../../assets/photos/3.webp";
import ესთეტიკა from "../../../assets/photos/2.webp";
import მედიკამენტები from "../../../assets/photos/1.webp";
import კვება from "../../../assets/photos/4.webp";
import ავტომობილი from "../../../assets/photos/5.webp";
import ბავშვთა_გასართობი_ცენტრი from "../../../assets/photos/6.png";
import რემონტი from "../../../assets/photos/7.png";
import მოგზაურობა from "../../../assets/photos/8.png";
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
  onTop?: number;
}

export default function DashboardTop() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [topVouchers, setTopVouchers] = useState<Voucher[]>([]);
  const [voucherTypes, setVoucherTypes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const images: { [key: string]: string } = {
    მაღაზიები,
    ესთეტიკა,
    მედიკამენტები,
    კვება,
    ავტომობილი,
    გართობა: ბავშვთა_გასართობი_ცენტრი,
    რემონტი,
    მოგზაურობა,
  };

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const [topResponse, voucherResponse] = await Promise.all([
          axios.get(`${API}/vouchers/top`),
          axios.get(`${API}/vouchers`),
        ]);

        const allTopVouchers = topResponse.data as Voucher[];

        // ფილტრაცია onTop === 1
        const filteredOnTop = allTopVouchers
          .filter((voucher) => voucher.onTop === 1)
          .slice(0, 3);

        setTopVouchers(filteredOnTop);
        setVouchers(allTopVouchers.slice(0, 20));
        setVoucherTypes(voucherResponse.data.slice(0, 20));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
        setError("Failed to fetch vouchers");
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);
  console.log(vouchers);

  return (
    <>
      <Helmet>
        <title>Offers Card | მთავარი გვერდი</title>
        <meta
          name="keywords"
          content="vouchers,ფასდაკლება,ფასდაკლებები Tbilisi, offers-card ,offers,cards,discount, discounts, special offers,discount,offers,ვაუჩერები,ფასდაკლებები,ვაუჩერი,ფასდაკლება,შეთავაზება,ბარათები, შეთავაზებები"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="w-full mt-24 flex justify-center items-center mx-auto">
        {voucherTypes.length > 0 && (
          <Swiper
            slidesPerView={3}
            spaceBetween={8}
            freeMode={false}
            autoplay={{ delay: 900, disableOnInteraction: false }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="mySwiper max-w-md w-full" // მაქსიმალურად ვაპატარავებთ კონტეინერს
            breakpoints={{
              320: { slidesPerView: 3, spaceBetween: 6 },
              480: { slidesPerView: 3, spaceBetween: 8 },
              768: { slidesPerView: 3, spaceBetween: 10 },
              1024: { slidesPerView: 3, spaceBetween: 12 },
            }}
          >
            {voucherTypes.map((type) => (
              <SwiperSlide key={type}>
                <Link
                  to={`/cards/${type}`}
                  className="theme-card theme-border py-2 px-2 rounded-md shadow-sm flex flex-col items-center text-center hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors w-full max-w-[60px] mx-auto"
                >
                  <div
                    className="w-5 h-6 mb-1 rounded-full"
                    style={{
                      backgroundImage: `url(${
                        images[type] || images["მაღაზიები"]
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  <h2 className="text-[8px] font-medium leading-tight theme-text">
                    {type}
                  </h2>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="theme-text text-center px-1 lg:py-2 w-full">
        <i className="fa-solid fa-star text-yellow-500"></i>
        {/* ✅ ON TOP Companies Section */}
        {loading ? (
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-6 h-6 bg-yellow-500 rounded-full animate-pulse"></div>
              <div className="w-48 h-8 bg-gray-700 dark:bg-gray-600 rounded animate-pulse"></div>
              <div className="w-6 h-6 bg-yellow-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-wrap  justify-center gap-4 max-w-6xl mx-auto px-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex-1 min-w-[280px] max-w-[320px] theme-card theme-border border-yellow-500/50 rounded-xl overflow-hidden animate-pulse"
                >
                  <div className="w-full h-32 bg-gray-700 dark:bg-gray-600"></div>
                  <div className="p-4 space-y-2">
                    <div className="w-3/4 h-6 bg-gray-700 dark:bg-gray-600 rounded"></div>
                    <div className="flex justify-between">
                      <div className="w-1/3 h-4 bg-gray-700 dark:bg-gray-600 rounded"></div>
                      <div className="w-1/3 h-4 bg-gray-700 dark:bg-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : topVouchers.length > 0 ? (
          <div className="mb-8">
            <div className="flex md:hidden  flex-wrap  md:flex-col justify-center gap-4 max-w-6xl mx-auto px-4">
              {topVouchers.map((voucher) => (
                <Link
                  to={`/company/${voucher.id}`}
                  key={voucher.id}
                  className="flex-1 min-w-[280px] max-w-[320px] group relative theme-card theme-border border-yellow-500/50 rounded-xl theme-text hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  {/* Background Image */}
                  <div
                    className="w-full h-40 bg-gray-700 dark:bg-gray-600 relative overflow-hidden"
                    style={{
                      backgroundImage: `url(${voucher.photos?.[0] || ""})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    {/* Top Badge */}
                    <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <i className="fa-solid fa-crown"></i>
                      TOP
                    </div>

                    {/* Discount Badge */}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-yellow-400 transition-colors line-clamp-1">
                      {voucher.object_name}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-map-marker-alt text-yellow-500"></i>
                        {JSON.parse(voucher.city || "[]")[0] || "უცნობი"}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-tag text-yellow-500"></i>
                        {voucher.type}
                      </span>
                    </div>

                    {/* Hover Effect Indicator */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </Link>
              ))}
            </div>

            {topVouchers.length > 0 && (
              <div className=" hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 max-w-6xl mx-auto mb-6">
                {topVouchers.map((voucher) => (
                  <Link
                    to={`/company/${voucher.id}`}
                    key={voucher.id}
                    className="group relative theme-card theme-border border-yellow-500/50 rounded-xl theme-text hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Background Image */}
                    <div
                      className="w-full h-40 bg-gray-700 dark:bg-gray-600 relative overflow-hidden"
                      style={{
                        backgroundImage: `url(${voucher.photos?.[0] || ""})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                      {/* Top Badge */}
                      <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <i className="fa-solid fa-crown"></i>
                        TOP
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-yellow-400 transition-colors line-clamp-1">
                        {voucher.object_name}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <span className="flex items-center gap-1">
                          <i className="fa-solid fa-map-marker-alt text-yellow-500"></i>
                          {JSON.parse(voucher.city || "[]")[0] || "უცნობი"}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="fa-solid fa-tag text-yellow-500"></i>
                          {voucher.type}
                        </span>
                      </div>

                      {/* Hover Effect Indicator */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <i className="fa-solid fa-star text-yellow-500 text-xl"></i>
              <h2 className="text-2xl font-bold theme-text sm:text-xl">
                პოპულარული კომპანიები
              </h2>
              <i className="fa-solid fa-star text-yellow-500 text-xl"></i>
            </div>
            <div className="bg-gray-800 border border-yellow-500/50 rounded-xl p-8 max-w-md mx-auto">
              <i className="fa-solid fa-info-circle text-yellow-500 text-4xl mb-4"></i>
              <p className="text-gray-300 mb-4">
                ამ მომენტში პოპულარული კომპანიები არ არის
              </p>
              <Link
                to="/all"
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 text-black rounded-lg hover:bg-yellow-500 transition-colors"
              >
                <i className="fa-solid fa-arrow-right"></i>
                ყველა კომპანიის ნახვა
              </Link>
            </div>
          </div>
        )}

        {/* 🔥 Favorites Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold my-4 sm:text-[16px]">ფავორიტები</h2>
          <Link
            to="/all"
            className="px-4 py-2 bg-yellow-600 rounded-lg text-black transition-colors shadow-sm"
          >
            ყველა კომპანია -&gt;
          </Link>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <Loader width="50px" />
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            freeMode={true}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="mySwiper"
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 15 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
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
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px",
                    }}
                  ></div>
                  <h2 className="object-name text-2xl sm:text-[16px] font-bold mb-2">
                    {voucher.object_name}
                  </h2>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
}
