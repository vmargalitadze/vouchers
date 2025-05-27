import { useContext, useEffect, useState } from "react";
import logout from "../assets/logout.svg";
import { MyContext } from "../Context/myContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

import test from "../../public/logo.png";
import { useMemo } from "react";

export default function Navbar() {
  const context = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  const links = useMemo(
    () => [
      {
        title: "მთავარი",
        linkTo: "/Dashboard",
        icon: "fa-home",
      },
      {
        title: "შეთავაზებები",
        linkTo: "/cards",
        icon: "fa-gift",
      },
      {
        title: "ხშირად დასმული კითხვები",
        linkTo: "/FAQ",
        icon: "fa-question-circle",
      },
    ],
    []
  );
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [pathname, links]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (loading) {
    return (
      <div className="flex justify-center items-center ">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  const isGuest = localStorage.getItem("Token") === "guest";
  return (
    <header
      className={`fixed  top-0 left-0 right-0 z-50 bg-black transition-transform duration-300 ${
        context?.hideNavbar ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-black backdrop-blur-sm border-b border-yellow-500/20">
        <div className="max-w-7xl bg-black mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img
              src={test}
              className="w-8 h-8 object-contain"
              alt="Offers Card"
            />
            <span className="text-white font-medium">Offers Card</span>
          </Link>

          <div className="flex items-center gap-4">
            {isGuest ? (
              <button
                onClick={() => navigate("/login")}
                className="text-yellow-500 hover:text-yellow-600 transition-colors duration-200 text-sm"
              >
                შესვლა/რეგისტრაცია
              </button>
            ) : (
              <>
                <Link
                  to="/Profile"
                  className="flex items-center gap-2 text-gray-300 hover:text-yellow-500 transition-colors duration-200"
                >
                  <i className="fa-regular fa-user text-yellow-500"></i>
                  <span className="text-sm">{context?.userInfo?.username}</span>
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("Token");
                    navigate("/login");
                  }}
                  className="text-gray-300 hover:text-yellow-500 transition-colors duration-200"
                >
                  <img src={logout} alt="logout" className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-yellow-500 transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-yellow-500 transition-all duration-300 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-yellow-500 transition-all duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        <div
          className={`fixed inset-0 backdrop-blur-sm transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ top: "62px" }}
        >
          <div className="">
            <div className="flex bg-black h-screen flex-col items-center justify-center space-y-4">
              {!isGuest && (
                <Link
                  to="/Profile"
                  className="flex items-center gap-2 text-gray-300 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <i className="fa-regular fa-user text-yellow-500"></i>
                  <span>{context?.userInfo?.username}</span>
                </Link>
              )}
              {links.map((link, i) => (
                <Link
                  key={i}
                  to={link.linkTo}
                  className="text-gray-300 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <i className={`fas ${link.icon} mr-2`}></i>
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
