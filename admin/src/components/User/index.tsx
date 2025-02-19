import React from "react";

const productData: any = [
  {
    userid: "HD47827",
    name: "Rohit Rana",
    email: "rohit@gmail.com",
    role: "Sales",
    create: "-",
    update: "-",
  },
  {
    userid: "HD47827",
    name: "Rohit Rana",
    email: "rohit@gmail.com",
    role: "Sales",
    create: "-",
    update: "-",
  },
  {
    userid: "HD47827",
    name: "Rohit Rana",
    email: "rohit@gmail.com",
    role: "Sales",
    create: "-",
    update: "-",
  },
  {
    userid: "HD47827",
    name: "Rohit Rana",
    email: "rohit@gmail.com",
    role: "Sales",
    create: "-",
    update: "-",
  },
  {
    userid: "HD47827",
    name: "Rohit Rana",
    email: "rohit@gmail.com",
    role: "Sales",
    create: "-",
    update: "-",
  },
];
const User = () => {
  return (
    <div>
      <table className="w-full border-collapse border border-stroke dark:border-strokedark">
        <thead>
          <tr className="bg-gray-100 dark:bg-strokedark">
            <th className="border border-stroke px-4 py-2 dark:border-strokedark">
              User ID
            </th>
            <th className="border border-stroke px-4 py-2 dark:border-strokedark">
              Name
            </th>
            <th className="border border-stroke px-4 py-2 dark:border-strokedark">
              Email
            </th>
            <th className="border border-stroke px-4 py-2 dark:border-strokedark">
              Role
            </th>
            <th className="border border-stroke px-4 py-2 dark:border-strokedark">
              Created At
            </th>
            <th className="border border-stroke px-4 py-2 dark:border-strokedark">
              Updated At
            </th>
            <th className="border border-stroke px-4 py-2 dark:border-strokedark">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product, key) => (
            <tr key={key} className="hover:bg-gray-50 dark:hover:bg-strokedark">
              <td className="border border-stroke px-4 py-2 dark:border-strokedark">
                {product.userid}
              </td>
              <td className="border border-stroke px-4 py-2 dark:border-strokedark">
                {product.name}
              </td>
              <td className="border border-stroke px-4 py-2 dark:border-strokedark">
                {product.email}
              </td>
              <td className="border border-stroke px-4 py-2 dark:border-strokedark">
                {product.role}
              </td>
              <td className="border border-stroke px-4 py-2 dark:border-strokedark">
                {product.create}
              </td>
              <td className="border border-stroke px-4 py-2 dark:border-strokedark">
                {product.update}
              </td>
              <td className="space-y-5 border border-stroke px-4 py-2 text-center dark:border-strokedark">
                <button className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
