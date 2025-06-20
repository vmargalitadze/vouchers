import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API } from "../../baseAPI";
import {
  FaFacebook,
  FaInstagram,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

type Company = {
  id: string | number;
  object_name: string;
  photos?: string[];
  insta?: string;
  fb?: string;
  sub_type?: string;
  city?: string;
  isOnline?: number;
};

function All() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubTypes, setSelectedSubTypes] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${API}/vouchers/top`)
      .then((res) => {
        setCompanies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching companies:", err);
        setLoading(false);
      });
  }, []);

  // უნიკალური sub_type-ების სია
  const subTypes = Array.from(
    new Set(
      companies
        .flatMap(
          (c) =>
            c.sub_type
              ?.split(",") // დაყოს ყველა coma-თი გამოყოფილი სიტყვა
              .map((t) => t.trim()) // მოაშოროს ცარიელი ადგილები
        )
        .filter(Boolean)
    )
  );
console.log(companies);

  // უნიკალური ქალაქების სია
  const cities = Array.from(
    new Set(
      companies
        .map((c) => {
          try {
            if (typeof c.city === "string") {
              const parsedCity = JSON.parse(c.city);
              return Array.isArray(parsedCity) ? parsedCity[0] : parsedCity;
            }
            return null;
          } catch {
            return c.city;
          }
        })
        .filter(Boolean)
    )
  );
  console.log(cities);
  // უნიკალური კატეგორიების სია
  const uniqueCategories = Array.from(new Set(subTypes));

  const handleSubTypeFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setSelectedSubTypes((prev) =>
      e.target.checked
        ? [...prev, value]
        : prev.filter((type) => type !== value)
    );
  };

  const handleCityFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedCity((prev) =>
      e.target.checked
        ? [...prev, value]
        : prev.filter((city) => city !== value)
    );
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // გაფილტრული კომპანიები
  const filteredCompanies = companies.filter((company) => {
    // კატეგორიების ფილტრაცია
    const matchesSubType =
      selectedSubTypes.length === 0 ||
      selectedSubTypes.some((selectedType) => {
        if (!company.sub_type) return false;
        const companyTypes = company.sub_type.split(",");
        return companyTypes.includes(selectedType);
      });

    // ქალაქის ფილტრაცია
    const matchesCity =
      selectedCity.length === 0 ||
      (company.city &&
        selectedCity.some((selectedCity) => {
          try {
            const parsedCity = JSON.parse(company.city || "[]");
            return Array.isArray(parsedCity)
              ? parsedCity.includes(selectedCity)
              : parsedCity === selectedCity;
          } catch {
            return company.city === selectedCity;
          }
        }));
    // Online ფილტრაცია
    const matchesOnline = !isOnline || company.isOnline === 1;

    return matchesSubType && matchesCity && matchesOnline;
  });

  if (loading) return <div className="text-center py-10">იტვირთება...</div>;

  return (
    <>
      <div className="min-h-screen text-black block sm:hidden">
        <div className="min-w-[980px] mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mt-16 mb-8 text-center text-white">
            ჩვენი პარტნიორები
          </h1>
          <div className="flex flex-row gap-8">
            <aside className="w-1/4 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-4">
                  ფილტრი
                </h2>

                <div className="mb-6">
                  <button
                    onClick={() => toggleDropdown("categories")}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-medium">კატეგორიები</span>
                    {openDropdown === "categories" ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                  {openDropdown === "categories" && (
                    <div className="mt-2 space-y-2 pl-2">
                      {uniqueCategories.map((category) => (
                        <label
                          key={category}
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            value={category}
                            checked={selectedSubTypes.includes(category || "")}
                            onChange={handleSubTypeFilterChange}
                            className="w-4 h-4 text-yellow-500 rounded border-gray-300 focus:ring-yellow-500"
                          />
                          <span className="text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <button
                    onClick={() => toggleDropdown("city")}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-medium">ქალაქი</span>
                    {openDropdown === "city" ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                  {openDropdown === "city" && (
                    <div className="mt-2 space-y-2 pl-2">
                      {cities.map((city) => (
                        <label
                          key={city}
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            value={city}
                            checked={selectedCity.includes(city)}
                            onChange={handleCityFilterChange}
                            className="w-4 h-4 text-yellow-500 rounded border-gray-300 focus:ring-yellow-500"
                          />
                          <span className="text-gray-700">{city}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isOnline}
                      onChange={(e) => setIsOnline(e.target.checked)}
                      className="w-4 h-4 text-yellow-500 rounded border-gray-300 focus:ring-yellow-500"
                    />
                    <span className="font-medium">ონლაინ მაღაზიები</span>
                  </label>
                </div>
              </div>
            </aside>

            <main className="w-3/4">
              <div className="flex flex-wrap ">
                {filteredCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="w-[20vw] sm:w-full md:w-full flex flex-col p-3"
                  >
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group">
                      <Link to={`/company/${company.id}`} className="block">
                        <img
                          src={company.photos?.[0] || "/no-image.png"}
                          alt={company.object_name}
                          className="w-full h-56 object-contain  "
                        />
                      </Link>
                      <div className="p-6">
                        <Link to={`/company/${company.id}`}>
                          <h3 className="text-lg font-semibold text-gray-800 mb-3 hover:text-yellow-600 transition-colors">
                            {company.object_name}
                          </h3>
                        </Link>
                        <div className="flex justify-center gap-4">
                          {company.fb && (
                            <Link
                              to={company.fb}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#1877F2] text-xl hover:opacity-80 transition-opacity"
                            >
                              <FaFacebook />
                            </Link>
                          )}
                          {company.insta && (
                            <Link
                              to={company.insta}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-pink-500 text-xl hover:opacity-80 transition-opacity"
                            >
                              <FaInstagram />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCompanies.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-600 text-lg">
                    ამ კატეგორიაში კომპანიები ვერ მოიძებნა
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <div className="min-h-screen hidden sm:block text-black">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-8 sm:mt-16 mb-8 text-center text-white">
            ჩვენი პარტნიორები
          </h1>

          {/* ფილტრები ზევით */}
          <div className="bg-white rounded-lg hidden sm:block shadow-lg p-4 sm:p-6 mb-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-6 text-gray-800 border-b pb-4">
              ფილტრი
            </h2>
            <div className="flex flex-wrap gap-4">
              {/* კატეგორიების ფილტრი */}
              <div className="flex-1 w-full">
                <button
                  onClick={() => toggleDropdown("categories")}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-700">კატეგორიები</span>
                  {openDropdown === "categories" ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </button>
                {openDropdown === "categories" && (
                  <div className="mt-2 space-y-2 pl-2 max-h-[200px] overflow-y-auto bg-white rounded-lg shadow-sm p-2 absolute z-10 w-[300px]">
                    {uniqueCategories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          value={category}
                          checked={selectedSubTypes.includes(category || "")}
                          onChange={handleSubTypeFilterChange}
                          className="w-4 h-4 text-yellow-500 rounded border-gray-300 focus:ring-yellow-500"
                        />
                        <span className="text-gray-700 text-sm">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* ქალაქის ფილტრი */}
              <div className="flex-1 min-w-[200px]">
                <button
                  onClick={() => toggleDropdown("city")}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-700">ქალაქი</span>
                  {openDropdown === "city" ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </button>
                {openDropdown === "city" && (
                  <div className="mt-2 space-y-2 pl-2 bg-white rounded-lg shadow-sm p-2 absolute z-10 w-[300px]">
                    {cities.map((city) => (
                      <label
                        key={city}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          value={city}
                          checked={selectedCity.includes(city)}
                          onChange={handleCityFilterChange}
                          className="w-4 h-4 text-yellow-500 rounded border-gray-300 focus:ring-yellow-500"
                        />
                        <span className="text-gray-700 text-sm">{city}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Online ჩექბოქსი */}
              <div className="flex-1 min-w-[200px]">
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer h-full">
                  <input
                    type="checkbox"
                    checked={isOnline}
                    onChange={(e) => setIsOnline(e.target.checked)}
                    className="w-4 h-4 text-yellow-500 rounded border-gray-300 focus:ring-yellow-500"
                  />
                  <span className="font-medium text-gray-700">
                    ონლაინ მაღაზიები
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* კომპანიების კარტები ქვევით */}
          <div className="flex flex-wrap gap-6 pb-4 items-stretch">
            {filteredCompanies.map((company) => (
              <div key={company.id} className="w-full   flex">
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col flex-grow w-full">
                  <Link to={`/company/${company.id}`} className="block">
                    <div className="relative bg-gray-50 rounded-t-lg overflow-hidden">
                      <img
                        src={company.photos?.[0] || "/no-image.png"}
                        alt={company.object_name}
                        className="w-full h-48 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <div className="p-4 flex flex-col flex-grow">
                    <Link to={`/company/${company.id}`}>
                      <h3 className="text-base font-semibold text-gray-800 mb-3 hover:text-yellow-600 transition-colors line-clamp-2">
                        {company.object_name}
                      </h3>
                    </Link>
                    <div className="flex  gap-4 mt-auto pt-4">
                      {company.fb && (
                        <Link
                          to={company.fb}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1877F2] text-xl hover:opacity-80 transition-opacity"
                        >
                          <FaFacebook />
                        </Link>
                      )}
                      {company.insta && (
                        <Link
                          to={company.insta}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-500 text-xl hover:opacity-80 transition-opacity"
                        >
                          <FaInstagram />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredCompanies.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-lg mt-6">
              <p className="text-gray-600 text-lg">
                ამ კატეგორიაში კომპანიები ვერ მოიძებნა
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default All;
