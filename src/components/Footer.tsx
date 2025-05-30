import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import test from "../../public/logo.png";
function Footer() {
  return (
    <>
      <footer className="bg-black shadow-sm dark:bg-gray-900 relative p-4 md:py-8">
        {/* Top line with facebook logo in center */}
        <div className="flex items-center justify-center mb-6">
          {/* Left line */}
          <div className="flex-grow border-t border-gray-500"></div>
          {/* Facebook icon */}
          <Link
            to="https://www.facebook.com/techspaceingeorgia?mibextid=wwXIfr&rdid=fer4dVTf5w64MTz4&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AUWmnPD6Z%2F%3Fmibextid%3DwwXIfr#"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-4 text-white text-2xl hover:text-blue-600 transition-colors"
          >
            <FaFacebook />
          </Link>
          {/* Right line */}
          <div className="flex-grow border-t border-gray-500"></div>
        </div>

        {/* Bottom footer content */}
        <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-col items-center justify-between text-white">
          {/* Left side - logo */}
          <Link
            to="/"
            className="flex items-center gap-2 cursor-pointer mb-4 md:mb-0"
          >
            <img
              src={test}
              className="w-8 h-8 object-contain"
              alt="Offers Card"
            />
            <span className="font-medium">Offers Card</span>
          </Link>

          {/* Right side - links */}
          <ul className="flex flex-wrap justify-center gap-y-4 items-center text-sm font-medium space-x-4 md:space-x-6">
            <li>
              <Link to="/" className="hover:underline">
                მთავარი
              </Link>
            </li>
            <li>
              <Link to="/cards" className="hover:underline">
                შეთავაზებები
              </Link>
            </li>
            <li>
              <Link to="/FAQ" className="hover:underline">
                ხშირად დასმული კითხვები
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;
