import { createContext, useState } from "react";
export const MyContext = createContext<ContextInterface | undefined>(undefined);

interface ContextInterface {
  userInfo?: userInterface | any;
  language?: string;
  isLoggedin?: boolean;
  hideNavbar?: boolean;
  setHideNavbar?: any;
  setIsLoggined?: any;
  setUserInfo?: any;
  setLanguage?: Function;
  defaultLanguage?: string;
  setDefaultLanguage?: any;
  notifications?: any;
  setNotifications?: any;
  notifyModal?: boolean;
  setNotifModal?: any;
  notifModal?: boolean;
  isLoggined?: boolean;
}

interface userInterface {
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
  voucher_code:any;
  balance: number
}

export const MyContextProvider = ({ children }: any) => {
  const [defaultLanguage, setDefaultLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );

  const [hideNavbar, setHideNavbar] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState<null | userInterface>(null);
  const [language, setLanguage] = useState<string>("GE");
  const [isLoggined, setIsLoggined] = useState<boolean>(
    localStorage.getItem("Token") ? true : false
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
