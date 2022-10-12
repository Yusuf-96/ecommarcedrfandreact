import React from "react";

const SaleDetaiilsList = ({ details }) => {
  const getTime = (details) => {
    return new Date(details.sales_date).toDateString();
  };
  return (
    <div>
      {" "}
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
              User
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
              Product Name
            </th>
            <th
              scope="col"
              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Quantity
            </th>
            <th
              scope="col"
              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {details.map((details, index) => (
            <tr key={index}>
              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                <span className="font-semibold">{`${index + 1}`}</span>
              </td>
              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                <span className="font-semibold">{details.user.user_name}</span>
              </td>

              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                <span className="font-semibold">{getTime(details)}</span>
              </td>
              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                {details.sale.map((sale, index) => (
                  <span className="font-semibold" key={index}>
                    {sale.items.map((item) => item.item.name)}
                  </span>
                ))}
              </td>
              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                {details.sale && details.sale.length > 0 ? (
                  details.sale.map((sale, index) => (
                    <span className="font-semibold" key={index}>
                      {sale.items.map((item) => item.quantity)}
                    </span>
                  ))
                ) : (
                  <span className="font-semibold">no quantity</span>
                )}
              </td>
              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                <span className="font-semibold">{details.amount}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaleDetaiilsList;
