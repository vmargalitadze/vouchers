import { Link } from "react-router-dom";
import partner from "../../../assets/08459840-8a7d-4d5f-9e05-8fa4f47353cd.png";
import VideoThumbnail from "../../../components/VideoThumbnail";
import test from "../../../../public/logo.png";
export default function MiddleTopCards() {
  return (
    <div className="flex flex-col items-center p-6  rounded-xl shadow-lg gap-5 w-full md:basis-1/2 text-center text-white ">
      <VideoThumbnail
        thumbnailUrl="/offerscard.jpg"
        videoUrl="/Offerscard.mp4"
      />
      {/* Card 1: Become a Partner */}
      <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow-lg gap-5 w-full md:basis-1/2 text-center text-white transition-shadow hover:shadow-yellow-500/50">
        <img
          src={partner}
          alt="Become our partner illustration"
          className="w-24 sm:w-32  h-full mb-3"
        />
        <h2 className="text-xl font-semibold">გახდი ჩვენი პარტნიორი</h2>
        <p className="text-sm text-gray-400">
          მოიზიდე მეტი მომხმარებელი და გაზარდე შენი შემოსავლები ჩვენთან ერთად.
        </p>
        <Link
          to={"https://www.facebook.com/techspaceingeorgia"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-lg transition-colors">
            მოგვწერე
          </button>
        </Link>
      </div>

      <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow-lg gap-5 w-full md:basis-1/2 text-center text-white transition-shadow hover:shadow-yellow-500/50">
        <img
          src={test}
          alt="Offers Card logo"
          className="w-20 sm:w-24 h-auto mb-3"
        />
        <h2 className="text-xl font-semibold">რა არის Offers Card?</h2>
        <p className="text-sm text-gray-400">
          Offers Card არის საიტი, რომელიც მომხმარებლებს სთავაზობს ექსკლუზიურ
          შეთავაზებებს რესტორნებში, ბარებში, კაფეებში, სასტუმროებში, სილამაზისა
          და გასართობ ობიექტებში და სხვა სერვისებში. ჩვენი ბარათის საშუალებით
          თქვენ შეგიძლიათ მიიღოთ, როგორც 1+1 შეთავაზება, ასევე პროცენტული
          დანაზოგები ან სხვა სახის ბენეფიტები. გახდით Offers Card-ის
          მომხმარებელი და დაზოგეთ თქვენი ფინანსები.
        </p>
        <div className="mt-4 pt-4 border-t border-gray-700 w-full">
          <h3 className="text-lg font-semibold text-yellow-500 mb-2">
            ჩვენი მიზანია
          </h3>
          <p className="text-sm text-gray-400">
            გავხადოთ ხელმისაწვდომი და სასიამოვნო თქვენი ყოველდღიური სურვილები.
          </p>
        </div>
      </div>
    </div>
  );
}
