/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../Context/myContext";
import axios from "axios";
import { API } from "../../baseAPI";
import Loader from "../../components/Loader";
import { Helmet } from "react-helmet";

export default function Profile() {
  const handleAutoSubscribe = async () => {
    if (!context?.userInfo) {
      console.error("User info is not available.");
      return;
    }
    axios
      .post(
        `${API}/users/${
          context.userInfo.auto_sub == 1 ? "off" : "on"
        }-auto-sub`,
        { email: context.userInfo.email }
      )
      .then(() => {
        window.location.reload();
      });
  };

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

  const context = useContext(MyContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  useEffect(() => {
    if (context?.userInfo) {
      setProfileData(context.userInfo);
      setLoading(false);
    } else {
      axios
        .post(`${API}/users`, {
          token: localStorage.getItem("Token"),
        })
        .then((res) => {
     

          if (context?.setUserInfo) {
            context.setUserInfo(res.data.userData[0]);
          }
          setProfileData(res.data.userData[0]);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user info:", err);
          setError("Failed to load user profile. Please try again.");
          setLoading(false);
        });
    }
  }, [context?.userInfo]);

  const handleCopy = () => {
    if (profileData?.referralCode) {
      navigator.clipboard.writeText(profileData.referralCode).then(
        () => setCopySuccess("Copied!"),
        () => setCopySuccess("Failed to copy")
      );

      // Clear success message after 3 seconds
      setTimeout(() => setCopySuccess(null), 3000);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <>
      {/* React Helmet for Meta Tags */}
      <Helmet>
        <title>
          {profileData?.username
            ? `${profileData.username} - პროფილი`
            : "Profile"}{" "}
          | Offers Card
        </title>
        <meta
          name="description"
          content="View and manage your personal profile on Offers Card, check your balance, referral code, and subscription status."
        />
        <meta
          name="keywords"
          content="Offers Card, profile, user dashboard, subscription, referral code, balance"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="h-screen">
        {profileData ? (
          <div className="p-4 mt-10 sm:p-3">
            <div className="p-6 rounded-lg shadow-inner shadow-yellow-500 flex flex-col items-center w-full max-w-sm sm:max-w-md mx-auto mt-8 sm:p-3">
              <div className="profile-details w-full">
                <div className="flex flex-col items-center mb-6">
                  <p className=" font-bold">{profileData.username}</p>
                  <p className="text-sm sm:text-base">{profileData.email}</p>
                </div>
                <div className="grid grid-cols-1 gap-4 text-left">
                  <div className="flex justify-between">
                    <p className="text-sm sm:text-base">
                      {profileData.balance}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <p className="font-medium text-sm sm:text-base">
                        მოსაწვევი კოდი :
                      </p>
                      <p className="ml-2 text-sm sm:text-base">
                        {profileData.referralCode}
                      </p>
                    </div>
                    <button
                      onClick={handleCopy}
                      className={`border ${
                        copySuccess ? "border-green-600" : "border-yellow-500"
                      } text-white px-2 py-1 text-sm rounded-lg ml-4 flex gap-2 items-center`}
                    >
                      <i
                        className={`  text-${
                          copySuccess
                            ? "green-600 fa-check fa-solid"
                            : "yellow-500 fa-copy fa-regular"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium text-sm sm:text-base">
                      გამოწერა (subscription):
                    </p>
                    {profileData.subscription ? (
                      <p className="text-green-700 font-semibold text-sm sm:text-base">
                        აქტიურია
                      </p>
                    ) : (
                      <p className="text-red-700 font-semibold text-sm sm:text-base">
                        შეჩერებულია
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span>ავტომატური გამოწერა:</span>
                    <p>
                      {context?.userInfo?.auto_sub == 1
                        ? "ჩართულია"
                        : "გამორთულია"}
                    </p>
                    <button
                      className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition"
                      onClick={handleAutoSubscribe}
                    >
                      {context?.userInfo?.auto_sub == 1 ? "გამორთვა" : "ჩართვა"}
                    </button>
                  </div>

                  {profileData.subscription ? (
                    ""
                  ) : (
                    <button
                      className="p-2 bg-yellow-500 mt-3 rounded-2xl"
                      onClick={() => {
                        handleRedirect();
                      }}
                    >
                      გამოწერა
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
