import React from "react";
import { ReactComponent as PreviewIcon } from "../assets/previewicon.svg";
import { Link } from "react-router-dom";

const ReportList = ({ reports }) => {
  const getTime = (day_items) => {
    const mon = new Date(day_items.day).toDateString();
    return mon;
  };

  return (
    <div>
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
              Date
            </th>
            <th
              scope="col"
              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              quantity
            </th>
            <th
              scope="col"
              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Amount
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
          {reports.day_items && reports.day_items.length > 0 ? (
            reports.day_items.map((report, index) => (
              <tr key={index}>
                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                  <span className="font-semibold">{`${index + 1}`}</span>
                </td>
                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                  <span className="font-semibold">{getTime(report)}</span>
                </td>

                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-500 border-gray-200 border-b">
                  {report.quantity}
                </td>
                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-700 border-gray-200 border-b">
                  {report.total}
                </td>

                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 border-gray-200 border-b flex">
                  <Link
                    to="/all-salles"
                    className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg px-2 py-2"
                  >
                    View All
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="flex items-center justify-center pt-4">No item</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportList;
