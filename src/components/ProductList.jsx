import React from "react";
import { ReactComponent as EditIcon } from "../assets/editicon.svg";
import { ReactComponent as DeleteIcon } from "../assets/deleteicon.svg";
import { toast } from "react-toastify";
import { productDelete } from "../service/ProductApi";

const ProductList = ({ items }) => {
  const deleteProduct = async (code) => {
    let response = await productDelete(code);

    if (response.status === 200) {
      // setTimeout(() => setisLoading(false), 2000);
      toast.success("Item Deleted Successfull!", {
        className: "success-toast",
        position: toast.POSITION.TOP_RIGHT,
      });

    }
    window.location.reload();
  };

  const getTime = (items) => {
    return new Date(items.created_at).toLocaleDateString();
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
              Product Name
            </th>
            <th
              scope="col"
              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
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
              Stock
            </th>
            <th
              scope="col"
              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Shop Name
            </th>
            <th
              scope="col"
              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Selling Price
            </th>
            <th
              scope="col"
              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Buying Price
            </th>
            <th
              scope="col"
              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white table-auto border-collapse">
          {items.length > 0 ? (
            items.map((items, index) => (
              <tr key={index} className="odd:bg-white even:bg-slate-100">
                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                  <span className="font-semibold">{`${index + 1}`}</span>
                </td>
                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                  <span className="font-semibold">{items.name}</span>
                </td>
                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500 border-gray-200 border-b">
                  {items.descriptions}
                </td>
                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 border-gray-200 border-b">
                  {getTime(items)}
                </td>
                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 border-gray-200 border-b">
                  {items.stock}
                </td>

                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 border-gray-200 border-b">
                  {items.shops}
                </td>

                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 border-gray-200 border-b">
                  {items.selling_price}
                </td>
                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 border-gray-200 border-b">
                  {items.buying_price}
                </td>
                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 border-gray-200 border-b flex">
                  <EditIcon />
                  <DeleteIcon onClick={() => deleteProduct(items.code)} />
                </td>
              </tr>
            ))
          ) : (
            <td className="flex items-center justify-center pt-4">No item</td>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
