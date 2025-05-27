/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/myContext";

export default function Notifmodal() {
  const context = useContext(MyContext);
  const notifications = context?.notifications || [];
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Disable background scroll when modal is active
  useEffect(() => {
    if (context?.notifModal) {
      document.body.style.overflow = "hidden";
      // Simulate loading time or until notifications are fetched
      setTimeout(() => setIsLoading(false), 1000); // Adjust timeout as needed
    } else {
      document.body.style.overflow = "auto";
      setIsLoading(true); // Reset loading state when modal closes
    }

    // Clean up the effect when the component is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [context?.notifModal]);

  return (
    <>
      {context?.notifModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 overflow-auto">
          <div className="bg-black rounded-lg p-6 w-11/12 max-w-md mx-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                შეტყობინებები
              </h2>
              <i
                className="fa-solid fa-x text-xl"
                onClick={() => context?.setNotifModal(false)}
              ></i>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center h-24">
                <div className="loader">Loading...</div>{" "}
                {/* Replace with your loader component */}
              </div>
            ) : (
              <div>
                {notifications.length > 0 ? (
                  notifications.map((notification: any, index: number) => (
                    <div
                      key={index}
                      className="mb-4 border border-yellow-500 p-2"
                    >
                      <p>
                        შეტყობინება :{" "}
                        {notification.notification}
                      </p>
                      <p>
                        თარიღი :{" "}
                        {notification.date}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No notifications available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
