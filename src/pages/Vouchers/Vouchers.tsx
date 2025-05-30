/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { API } from "../../baseAPI";
import მაღაზიები from "../../assets/photos/3.webp";
import ესთეტიკა from "../../assets/photos/2.webp";
import მედიკამენტები from "../../assets/photos/1.webp";
import კვება from "../../assets/photos/4.webp";
import { MyContext } from "../../Context/myContext";
import { Link } from "react-router-dom";
import { default as QRCode } from "qrcode.react";
import { Helmet } from "react-helmet-async";
import card from "../../assets/card.jpg";

const images: { [key: string]: string } = {
  მაღაზიები,
  ესთეტიკა,
  მედიკამენტები,
  კვება,
};

export default function Vouchers() {
  const [voucherTypes, setVoucherTypes] = useState<string[]>([]);
  const context = useContext(MyContext);
  const [focused, setFocused] = useState("buy");

  useEffect(() => {
    axios.get(`${API}/vouchers`).then((response) => {
      setVoucherTypes(response.data);
    });
  }, []);

  const handleRedirect = async () => {
    try {
      if (!context?.userInfo) {
        console.error("User info is not available.");
        return;
      }
      const payload = {
        userId: context.userInfo.id,
        discount: context.userInfo.discount,
        successUrl: "http://offerscard.ge/#/PaymentSuccess",
        failUrl: "http://offerscard.ge/#/PaymentFailed",
      };



      const res = await axios.post(`${API}/users/bog-token`, payload, {
        withCredentials: true,
      });



      if (res.data.redirect?.href) {
        const redirectUrl = res.data.redirect.href;


        // URL Parsing to extract order_id
        const urlParams = new URLSearchParams(new URL(redirectUrl).search);
        const orderId = urlParams.get("order_id");

        if (orderId) {
    
          // Redirect user with order_id in URL
          window.location.href = redirectUrl;
        } else {
          console.error("order_id not found in redirect URL:", redirectUrl);
        }
      } else {
        console.error("Redirect URL not found in response", res.data);
      }
    } catch (error: any) {
      console.error("Error during redirect:", error);
      if (error.response) {
        console.error("Error response from backend:", error.response.data);
      }
    }
  };

  return (
    <div className="p-3 rounded-xl">
      <Helmet>
        <title>Offers Card | შეთავაზებები</title>
        <meta
          name="description"
          content="დაათავლიერეთ კატალოგი, სადაც შეგიძლიათ გამოიყენოთ ჩვენი ფასდაკლების ბარათი"
        />
        <meta
          name="keywords"
          content="voucher,cards, discounts, redeem, retail, OffersCard, salons, medications, food,vouchers,card,sale,categories,ვაუჩერი,ვაუჩერები,ფასდაკლება,ფასდაკლების ვაუჩერი,ფასდაკლების ვაუჩერები,კატეგორიები"
        />
        <meta property="og:title" content="Vouchers - Explore and Redeem" />
        <meta
          property="og:description"
          content="Find the best vouchers and redeem them in various categories including retail, salons, medications, and food."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://offerscard.ge/cards" />
        <meta
          property="og:image"
          content="https://offerscard.ge/path-to-card-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vouchers - Explore and Redeem" />
        <meta
          name="twitter:description"
          content="Explore and redeem vouchers from multiple categories and save on services, food, and more."
        />
        <meta
          name="twitter:image"
          content="https://offerscard.ge/path-to-voucher-image.jpg"
        />
      </Helmet>

      <div className="border mt-24 border-yellow-500 flex w-[97%] m-auto rounded-xl">
        <div
          className={`w-1/2 text-center cursor-pointer rounded-xl p-3 ${
            focused === "buy" && "border-b-4 border-yellow-500 focused"
          }`}
          onClick={() => setFocused("buy")}
        >
          სერვისები
        </div>
        <div
          className={`w-1/2 text-center cursor-pointer rounded-xl p-3 ${
            focused === "see" && "border-b-4 border-yellow-500 focused"
          }`}
          onClick={() => setFocused("see")}
        >
          თქვენი ბარათი
        </div>
      </div>

      {focused === "buy" ? (
        <div className="p-5 flex flex-wrap justify-center gap-10">
          {voucherTypes.map((type) => (
            <div
              key={type}
              className="w-1/3 sm:w-full bg-cardBgBlack rounded-md flex flex-col py-5 items-center"
            >
              <h1>{type}</h1>
              <img
                src={images[type] || images.default}
                className="max-w-full object-cover icon"
                alt={type}
              />
              <div className="gap-5 flex justify-between">
                <Link to={`/cards/${type}`}>
                  <button className="border border-yellow-600 rounded p-2">
                    კატალოგის ნახვა
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-20 text-center sm:py-5">
          <div className="p-5 rounded-lg flex flex-col items-center gap-4">
            {context?.userInfo?.voucher_code &&
            context?.userInfo?.subscription === 1 ? (
              <>
                <div className="text-yellow-500 tracking-wider text-2xl font-bold">
                  {context?.userInfo?.voucher_code}
                </div>

                <div className="relative w-full max-w-sm h-auto aspect-[3/2] rounded-lg overflow-hidden">
                  <img
                    src={card}
                    alt="Offers card Background"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-16 right-10 p-[2px] rounded-sm test">
                    <QRCode
                      size={90}
                      value={`https://card.check.com.offerscard.ge/?code=${context.userInfo.voucher_code}`}
                      bgColor="transparent"
                    />
                  </div>
                </div>
              </>
            ) : (
              <p className="text-white mt-20 text-2xl">
                {context?.isLoggined ? (
                  <div className="flex flex-col gap-5 items-center">
                    <h2>თქვენ არ გაქვთ აქტიური გამოწერა</h2>
                    <button
                      className="p-2 bg-yellow-500 mt-3 rounded-2xl"
                      onClick={handleRedirect}
                    >
                      გამოწერა
                    </button>
                  </div>
                ) : (
                  "თქვენ არ ხართ შესული ანგარიშში, შექმენით ან დალოგინდით ვაუჩერის მისაღებად"
                )}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
