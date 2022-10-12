import React, { useState } from "react";
import { axiosInstance } from "../axiosInstance";
import { isAuthenticated } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const ProductUpload = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [isFilePicked, setIsFilePicke] = useState(false);

  const navigate = useNavigate()

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicke(!isFilePicked);
  };

  const handleFileRemove = (index) => {
    let qsdel = [selectedFile];
    if (selectedFile) {
      qsdel.splice(index, 1);
    }
    setSelectedFile(qsdel);
    setIsFilePicke(!isFilePicked);
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file_to_import", selectedFile);

    axiosInstance
      .post("csv-import/", formData, {
        headers: {
          Authorization: `Bearer ${isAuthenticated()}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => navigate("/product"))
      .catch((error) => {
        console.log("erron", error);
      });
  };

  return (
    <>
      <div className="min-h-screen w-full relative lg:ml-56 pb-36 md:pb-24  mt-4">
        <main>
          <div className="pt-4 px-4">
            <div className="bg-white p7 rounded mx-auto">
              <form onSubmit={handleSubmission}>
                <div className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded">
                  <div className="relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer">
                    <input
                      accept=".csv"
                      type="file"
                      name="file"
                      onChange={changeHandler}
                      className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                    />

                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="m-0">
                        Drag your files here or click in this area.
                      </p>
                    </div>
                  </div>
                  {isFilePicked ? (
                    <div className="relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none pt-32 mt-4 w-32">
                      <button
                        className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none"
                        type="button"
                        onClick={handleFileRemove}
                      >
                        <svg
                          className="w-4 h-4 text-gray-700"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>

                      <svg
                        className="absolute w-12 h-12 text-gray-400 transform top-1/2 -translate-y-2/3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>

                      <div className="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
                        <span className="w-full font-bold text-gray-900 truncate">
                          {selectedFile.name}
                        </span>
                        <span className="text-xs text-gray-900">
                          {selectedFile.size}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm mt-2">
                      Select a file to show details
                    </p>
                  )}

                  <div className="flex items-center justify-center p-2">
                    <button className="bg-black px-4 py-2 text-white">
                      Upload
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductUpload;
