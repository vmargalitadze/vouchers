/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API } from "../baseAPI";

export const MyContext = createContext<ContextInterface | undefined>(undefined);

interface ContextInterface {
  userInfo?: userInterface | null;
  setUserInfo?: (user: userInterface | null) => void;
  isLoggined?: boolean;
  setIsLoggined?: (val: boolean) => void;
  hideNavbar?: boolean;
  setHideNavbar?: (val: boolean) => void;
  language?: string;
  setLanguage?: (lang: string) => void;
  defaultLanguage?: string;
  setDefaultLanguage?: (lang: string) => void;
  notifications?: string[];
  setNotifications?: (val: string[]) => void;
  notifModal?: boolean;
  setNotifModal?: (val: boolean) => void;
}

interface userInterface {
  discount: any;
  auto_sub: any;
  email: string;
  help: number;
  help_with_coin: number;
  help_with_money: number;
  id: number;
  passverificationnumber: number | null;
  password: string;
  payment_status: number;
  subscription: number;
  tickets: number;
  token: string;
  username: string;
  verificationnumber: number | null;
  verified: string;
  referralCode: number;
  voucher_code: any;
  balance: number;
}

export const MyContextProvider = ({ children }: any) => {
  const [defaultLanguage, setDefaultLanguage] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("language") || "EN"
      : "EN"
  );

  const [hideNavbar, setHideNavbar] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<userInterface | null>(null);
  const [language, setLanguage] = useState<string>("GE");
  const [isLoggined, setIsLoggined] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [notifModal, setNotifModal] = useState<boolean>(false);

  // Initialize auth state and fetch user data
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("Token");
      if (!token) {
        setIsLoggined(false);
        setUserInfo(null);
        setNotifications([]);
        return;
      }

      try {
        const response = await axios.post(`${API}/users`, {
          token,
          language: defaultLanguage,
        });

        console.log('Context Init Response:', response.data);

        if (response.data && response.data.userData && response.data.userData[0]) {
          setUserInfo(response.data.userData[0]);
          setNotifications(response.data.notifications || []);
          setIsLoggined(true);
        } else {
          console.error('Invalid user data structure:', response.data);
          throw new Error('Invalid user data structure');
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        localStorage.removeItem("Token");
        localStorage.removeItem("dailyOrderCount");
        localStorage.removeItem("orderCountDate");
        setIsLoggined(false);
        setUserInfo(null);
        setNotifications([]);
      }
    };

    initializeAuth();
  }, [defaultLanguage]);

  // Fetch user data whenever isLoggined changes to true
  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggined) {
        const token = localStorage.getItem("Token");
        if (!token) return;

        try {
          const response = await axios.post(`${API}/users`, {
            token,
            language: defaultLanguage,
          });

          console.log('User Data Refresh Response:', response.data);

          if (response.data && response.data.userData && response.data.userData[0]) {
            setUserInfo(response.data.userData[0]);
            setNotifications(response.data.notifications || []);
          }
        } catch (error) {
          console.error("Failed to refresh user data:", error);
        }
      } else {
        setUserInfo(null);
        setNotifications([]);
      }
    };

    fetchUserData();
  }, [isLoggined, defaultLanguage]);

  return (
    <MyContext.Provider
      value={{
        notifModal,
        setNotifModal,
        userInfo,
        setUserInfo,
        isLoggined,
        setIsLoggined,
        hideNavbar,
        setHideNavbar,
        language,
        setLanguage,
        defaultLanguage,
        setDefaultLanguage,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
