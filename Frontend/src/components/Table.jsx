import React from 'react';

const Table = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Screen</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RAM</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((laptop, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{laptop.Company}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{laptop.Product}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{laptop.TypeName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{laptop.Screen}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{laptop.ram} GB</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€{laptop.price_euros}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
