import React, { useEffect, useState } from "react";
import { ReactComponent as EditIcon } from "../assets/editicon.svg";
import { ReactComponent as DeleteIcon } from "../assets/deleteicon.svg";
import { ReactComponent as PlusIcon } from "../assets/plusicon.svg";
import UserModal from "../components/UserModal";
import { getAllUser } from "../service/UserApi";

const UserPage = () => {
  const [userData, setuserData] = useState([]);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    getUsers();
  }, []);

  let getUsers = async () => {
    const response = await getAllUser();
    if (response.status === 200) {
      setuserData(response.data);
    }
  };

  const getTime = (userData) => {
    return new Date(userData.start_date).toLocaleDateString();
  };

  return (
    <div className="min-h-screen w-full relative lg:ml-56 pb-36 md:pb-24  ">
      <main>
        <div className="pt-4 px-4">
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-8 mt-4 mb-4 ">
            <UserModal close={closeModal} open={isOpen} />

            <div className="mb-4 flex items-center justify-between border-b py-2">
              <div>
                <h3 className="text-xl font-bold text-sky-900 mb-2">
                  Users List
                </h3>
              </div>
              <div className="flex space-x-4">
                <button
                  className="text-sm font-medium text-white hover:bg-sky-800 rounded-lg px-4 py-2 bg-sky-900 flex"
                  onClick={openModal}
                >
                  <span>
                    <PlusIcon />
                  </span>
                  <span>New</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col mt-8">
              <div className="overflow-x-auto rounded-lg">
                <div className="align-middle inline-block min-w-full">
                  <div className="shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            SN
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            User Name
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            First Name
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Date & Time
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Phone
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Role
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {userData.map((users, index) => (
                          <tr key={index}>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                              <span className="font-semibold">{`${
                                index + 1
                              }`}</span>
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                              <span className="font-semibold">
                                {users.user_name}
                              </span>
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500 border-gray-200 border-b">
                              {users.first_name}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 border-gray-200 border-b">
                              {getTime(users)}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 border-gray-200 border-b">
                              {users.phone}
                            </td>

                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 border-gray-200 border-b">
                              {users.email}
                            </td>

                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 border-gray-200 border-b">
                              {users.role}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 border-gray-200 border-b">
                              {users.is_active ? (
                                <span className="bg-green-400 rounded text-white px-2 py-1 text-center items-center justify-center ">
                                  active
                                </span>
                              ) : (
                                <span className="bg-red-500 rounded text-white px-2 py-1 text-center item-center justify-center">
                                  inactive
                                </span>
                              )}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 border-gray-200 border-b flex">
                              <EditIcon />
                              <DeleteIcon />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserPage;
