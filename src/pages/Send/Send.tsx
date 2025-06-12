/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../baseAPI";

interface OrderItem {
  name: string;
  photo: string;
}

interface LocationState {
  items?: OrderItem[];
  userId?: string | number;
  objId?: string | number;
}

interface FormData {
  name: string;
  surname: string;
  address: string;
  phone: string;
}

const Send: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState || {};
  const items = state.items || [];
  const userId = state.userId ?? "N/A";
  const objId = state.objId ?? "N/A";

  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
   
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "გთხოვთ შეავსოთ სახელი";
      isValid = false;
    }

    if (!formData.surname.trim()) {
      newErrors.surname = "გთხოვთ შეავსოთ გვარი";
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "გთხოვთ შეავსოთ მისამართი";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "გთხოვთ შეავსოთ ტელეფონის ნომერი";
      isValid = false;
    } else if (!/^[0-9]{9}$/.test(formData.phone.trim())) {
      newErrors.phone = "ტელეფონის ნომერი უნდა შეიცავდეს 9 ციფრს";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const submitData = {
      objId,
      name: formData.name,
      surname: formData.surname,
      address: formData.address,
      items: items,
      phone: formData.phone.trim(),
      userId
    };

    try {
      const response = await axios.post(`${API}/vouchers/send-info`, submitData);
      console.log("API Response:", response.data);

      if (response.data) {
        navigate("/");
      }
    } catch (error: any) {
      console.error("Error details:", error.response || error);
      setError(error.response?.data?.error || "დაფიქსირდა შეცდომა, სცადეთ თავიდან");
    } finally {
      setLoading(false);
    }
  };

  if (!location.state || (!state.userId && !state.objId)) {
    return (
      <div className="p-4">
        <p className="text-red-500">
          მომხმარებლის ID და ობიექტის ID არ არის მითითებული. გთხოვთ გაიაროთ სწორი პროცედურა.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl h-screen mt-40 mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">შეკვეთის გაგზავნა</h2>
      
      {/* Display selected items */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">არჩეული პროდუქტები:</h3>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item, index) => (
            <div key={index} className="border rounded-lg p-2">
              <img src={item.photo} alt={item.name} className="w-full h-32 object-contain rounded mb-2" />
              <p className="text-sm font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
     
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">სახელი</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full p-2 border text-black rounded ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="surname" className="block mb-1">გვარი</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            className={`w-full p-2 border text-black rounded ${errors.surname ? 'border-red-500' : ''}`}
          />
          {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
        </div>

        <div>
          <label htmlFor="address" className="block mb-1">მისამართი</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={`w-full p-2 border text-black rounded ${errors.address ? 'border-red-500' : ''}`}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block mb-1">ტელეფონი</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="5XXXXXXXX"
            className={`w-full p-2 border text-black rounded ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {error && (
          <div className="text-red-500 py-2">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 disabled:bg-gray-400"
        >
          {loading ? "იგზავნება..." : "გაგზავნა"}
        </button>
      </form>
    </div>
  );
};

export default Send;
