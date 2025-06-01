import React from 'react';

interface OrderLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderLimitModal: React.FC<OrderLimitModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-black p-6 rounded-lg w-11/12 md:w-96 relative border border-yellow-500">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white hover:text-yellow-500"
        >
          <i className="fa-solid fa-x"></i>
        </button>

        <div className="text-center">
          <h2 className="text-xl text-yellow-500 font-bold mb-4">
            შეტყობინება
          </h2>
          <p className="text-white mb-6">
            თქვენი ლიმიტი ამოწურულია. 
          </p>
          <button
            onClick={onClose}
            className="bg-yellow-500 text-black px-6 py-2 rounded-md hover:bg-yellow-600 transition-colors"
          >
            დახურვა
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderLimitModal; 