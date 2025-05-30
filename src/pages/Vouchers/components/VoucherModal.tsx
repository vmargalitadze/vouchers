/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";

export default function VoucherModal({
  vouchers,
  setOpenModal,
  selectedType,
}: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-30">
      <div className="bg-black p-10 rounded-lg w-11/12 md:w-3/4 lg:w-2/3 max-h-screen overflow-y-auto relative">
        <i
          className="fa-solid fa-x absolute right-4 top-4 cursor-pointer text-white"
          onClick={() => {
            setOpenModal(false);
          }}
        ></i>

        <div className="mb-6">
          <h2 className="text-white text-2xl font-semibold">{selectedType}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {vouchers.map((voucher: any) => (
            <div
              key={voucher.id}
              className="bg-neutral-900 border border-yellow-500 p-4 rounded-xl shadow-lg flex flex-col justify-between"
            >
              <div className="mb-4">
                <h3 className="text-white text-lg font-bold mb-2">
                  {voucher.object_name}
                </h3>
                <p className="text-yellow-400 text-md">{voucher.discount}</p>
              </div>
              <Link
                to={voucher.link}
                className="text-center bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition duration-300"
              >
                დეტალურად
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
