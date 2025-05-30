/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";

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

  const [isLoggined, setIsLoggined] = useState<boolean>(
    typeof window !== "undefined" ? !!localStorage.getItem("Token") : false
  );

  const [notifications, setNotifications] = useState<string[]>([]);
  const [notifModal, setNotifModal] = useState<boolean>(false);

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
