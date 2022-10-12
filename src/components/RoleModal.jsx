import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { axiosInstance } from "../axiosInstance";
import { isAuthenticated } from "../utils/auth";

export default function Modal({ close, open }) {
  const [productData, setProductData] = useState([]);

  const naviagate = useNavigate();

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // let formData = new FormData();
    // formData.append("name", productData.title);
    // formData.append("descriptions", productData.descriptions);
    // formData.append("selling_price", productData.selling_price);
    // formData.append("buying_price", productData.buying_price);
    // formData.append("stock", productData.stock);
    // formData.append("shops", productData.shops);
    // formData.append("categories", productData.categories);

    // const config = {
    //   headers: { "content-Type": "multipart/form-data" },
    // };

    // axiosInstance.post("product/", formData, {
    //   headers: {
    //     "content-Type": "multipart/form-data",
    //     Authorization: `Bearer ${isAuthenticated()}`,
    //   },
    // });
    // window.location.reload();
  };

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 overflow-y-auto "
          onClose={close}
        >
          <div className="min-h-screen px-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-10" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-xl p-6 my-8 mt-24 overflow-y-auto text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Roles
                </Dialog.Title>
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center space-x-6"
                >
                  <div className="block px-1 py-5 w-full">
                    <div className="block">
                      <label className="mb-2 font-semibold text-gray-700">
                        UserName:
                        <input
                          type="text"
                          name="title"
                          value={productData.title || ""}
                          placeholder="product name"
                          className="p-2 mb-5 bg-white border border-gray-200 rounded shadow-sm block w-full"
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="mb-2 font-semibold text-gray-700">
                        FirstName:
                        <input
                          type="text"
                          name="descriptions"
                          value={productData.descriptions || ""}
                          placeholder="Description"
                          className="p-2 mb-5 bg-white border border-gray-200 rounded shadow-sm block w-full"
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="mb-2 font-semibold text-gray-700">
                        Phone Number:
                        <input
                          type="number"
                          value={productData.buying_price || ""}
                          name="buying_price"
                          className="p-2 mb-5 bg-white border border-gray-200 rounded shadow-sm block w-full"
                          onChange={handleChange}
                        />
                      </label>
                    </div>

                    <div>
                      <label className="mb-2 font-semibold text-gray-700">
                        Email:
                        <input
                          type="email"
                          value={productData.selling_price || ""}
                          name="selling_price"
                          className="p-2 mb-5 bg-white border border-gray-200 rounded shadow-sm block w-full"
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="mb-2 font-semibold text-gray-700">
                        Role:
                        <input
                          type="number"
                          name="stock"
                          value={productData.stock || ""}
                          className="p-2 mb-5 bg-white border border-gray-200 rounded shadow-sm block w-full"
                          onChange={handleChange}
                        />
                      </label>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={close}
                      >
                        Cancel
                      </button>
                      <button className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
