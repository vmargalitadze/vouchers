import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../baseAPI";

interface Item {
  id: string;
  object_name: string;
  discount:string
  description: string;
  photo_path: string;
}

const CompanyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(id);
  console.log("CompanyPage Loaded");
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const [itemsResponse ] = await Promise.all([
          axios.get(`${API}/vouchers/getfrommodal/${id}`),
        ]);

        const itemsData = itemsResponse.data;
        
        
        const parsedItems = Array.isArray(itemsData.data)
          ? itemsData.data
          : Array.isArray(itemsData)
          ? itemsData
          : [];

        setItems(parsedItems);
      } catch (error) {
        console.error("Error fetching company items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompanyData();
    }
  }, [id]);


  return (
    <div className="p-6 max-w-6xl mx-auto">

      {loading ? (
        <p className="text-center text-gray-500">იტვირთება...</p>
      ) : (
        <>
          <h2 className="mt-[120px] text-2xl  text-yellow-500 text-center">
            offerscard-ის მომხმარებლებისთვის გარანტირებული ფასდაკლება
           </h2>
        
        <div className="mt-24 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-2 mb-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={item.photo_path}
                  alt={item.object_name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">
                  {item.object_name}
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  {item.discount}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        </>
        
      )}
    </div>
  );
};

export default CompanyPage;
