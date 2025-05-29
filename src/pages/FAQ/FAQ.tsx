/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { API } from "../../baseAPI";
import { MyContext } from "../../Context/myContext";
import { Helmet } from "react-helmet-async"; // Import Helmet

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ = () => {
  const context = useContext(MyContext);
  const [FAQ_Questions, setFAQ_Questions] = useState<null | FAQItem[]>(null);

  useEffect(() => {
    axios
      .post(`${API}/faq`, { language: context?.defaultLanguage })
      .then((res: any) => setFAQ_Questions(res.data));
  }, [context?.defaultLanguage]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [delayedIndex, setDelayedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
      setDelayedIndex(null);
    } else {
      setActiveIndex(index);
      setTimeout(() => {
        setDelayedIndex(index);
      }, 200); // 200ms delay
    }
  };

  return (
    <div className="myContainer py-12 px-3">
      {/* Meta tags using Helmet */}
      <Helmet>
        <title>FAQ - ხშირად დასმული კითხვები</title>
        <meta name="description" content="ხშირად დასმული კითხვები." />
        <meta
          name="keywords"
          content="FAQ, questions, answers, support,ხშირად დასმული კითხვები,კითხვები"
        />
        <meta property="og:title" content="FAQ - ხშირად დასმული კითხვები" />
        <meta
          property="og:description"
          content="Explore answers to common questions and find support information."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/faq" />
        <meta
          property="og:image"
          content="https://yourwebsite.com/path-to-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQ - Frequently Asked Questions" />
        <meta
          name="twitter:description"
          content="Find answers to frequently asked questions on our platform."
        />
        <meta
          name="twitter:image"
          content="https://yourwebsite.com/path-to-image.jpg"
        />
      </Helmet>

      <>
      <div className="h-screen mt-10">

        {FAQ_Questions?.map((item: FAQItem, index: number) => (
          <div
            key={index}
            className="mb-7  border-b-yellowButton border-transparent border rounded-md"
          >
            <button
              className="w-full text-left p-4 font-medium text-white bg-cardBgBlack rounded-lg focus:outline-none"
              onClick={() => handleToggle(index)}
            >
              {item.question}
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index ? "max-h-screen" : "max-h-0"
              }`}
            >
              <p
                className={`p-4 text-gray-600 transition-opacity duration-500 ease-in-out ${
                  delayedIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
      </>
    </div>
  );
};

export default FAQ;
