 import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';

const FeePay = () => { 
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [selectedStartingYear, setSelectedStartingYear] = useState('');
  const [selectedClosingYear, setSelectedClosingYear] = useState('');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nameFilter, setNameFilter] = useState('');

  const navigator = useNavigate();

  const handleAcademicYearChange = (event) => {
    setSelectedAcademicYear(event.target.value);
  };

  const handleStartingYearChange = (event) => {
    setSelectedStartingYear(event.target.value);
  };

  const handleClosingYearChange = (event) => {
    setSelectedClosingYear(event.target.value);
  };

  const fetchData = async () => {
    const url = 'https://sandbox-api.xcelapp.com/upsa/v1/product/getProducts?state=APPROVED';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NWI3NDYyY2M1Y2ZmNjE5MGE2ODllNzIiLCJtZXJjaGFudElkIjoicDg3cDZndWplIiwicm9sZXMiOlt7Il9pZCI6IjY1YmZmYzM3MWI4MWNkNGFiNWJhOGQxMiIsIm5hbWUiOiJTVVBFUiBST0xFIiwicGVybWlzc2lvbnMiOlsiQ1JFQVRFX1NUQUZGIiwiQVBQUk9WRV9DUkVBVEVfQUNBREVNSUNfWUVBUiIsIkFQUFJPVkVfQ1JFQVRFX1NUQUZGIiwiQ1JFQVRFX0FDQURFTUlDX1lFQVIiLCJDUkVBVEVfUk9MRSIsIkFTU0lHTl9ST0xFIiwiQkxPQ0tfVVNFUiIsIlVOQkxPQ0tfVVNFUiIsIkVESVRfU1RBRkYiLCJFRElUX0ZFRSIsIkFVVEhPUklaRV9DUkVBVEVfRkVFIiwiVklFV19UUkFOU0FDVElPTlMiLCJQQVlfVE9fQkFOSyIsIkFVVEhPUklaRV9QQVlfVE9fQkFOSyIsIkVESVRfVVNFUiIsIkRFTEVURV9VU0VSIiwiVklFV19SRVBPUlRTIiwiVklFV19BVURJVF9UUkFJTCIsIkNSRUFURV9QUk9HUkFNIiwiQVBQUk9WRV9DUkVBVEVfUFJPR1JBTSIsIkNSRUFURV9ESVNCVVJTRU1FTlRfQUNDVCIsIkFQUFJPVkVfQVNTSUdOX1dBTExFVCIsIkFQUFJPVkVfVVBEQVRFX0ZFRSIsIkFQUFJPVkVfVVBEQVRFX0ZFRV9QQVlNRU5UIiwiQ1JFQVRFX1dBTExFVCIsIkNSRUFURV9GRUUiLCJCSUxMX1NUVURFTlQiLCJWSUVXX1NUVURFTlQiLCJNT0RJRllfU1RVREVOVF9GRUUiLCJSRVZFUlNFX1RSQU5TQUNUSU9OIiwiQVBQUk9WRV9UUkFOU0FDVElPTl9SRVZFUlNBTCJdLCJtZXJjaGFudElkIjoicDg3cDZndWplIiwiY3JlYXRlZEF0IjoiMjAyNC0wMi0wNFQyMTowNTo1OS4xNzVaIiwidXBkYXRlZEF0IjoiMjAyNS0wMS0xN1QxMzowNjo0My43MDFaIiwiX192IjowLCJkZXNjcmlwdGlvbiI6IlNhbXBsZSBSb2xlIn0seyJfaWQiOiI2NWI4Y2E4NjAzNTRlMGQzYzYzOWM4YmUiLCJuYW1lIjoiU3VwZXIgQWRtaW4iLCJwZXJtaXNzaW9ucyI6WyJWSUVXX0FVRElUX1RSQUlMIiwiVklFV19UUkFOU0FDVElPTlMiXSwibWVyY2hhbnRJZCI6InA4N3A2Z3VqZSIsImNyZWF0ZWRBdCI6IjIwMjQtMDEtMzBUMTA6MDg6MDYuNjI4WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDQtMDNUMjI6MTc6MzAuNTQzWiIsIl9fdiI6MCwiZGVzY3JpcHRpb24iOm51bGx9XSwiaWF0IjoxNzM3NzA5ODIzLCJleHAiOjE3Mzc3OTYyMjN9.lWpqlqIidnDaFiJNIWB9kKWc1_whpqU-zUc1Xi7Z_Ik'; // Replace with your actual token

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.product);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const nameMatches = product.name.toLowerCase().includes(nameFilter.toLowerCase());
    const academicYearMatches =
      !selectedAcademicYear || product.academicYear?._id === selectedAcademicYear;
    const startingYearMatches =
      !selectedStartingYear || product.startingAcademicYear?._id === selectedStartingYear;
    const closingYearMatches =
      !selectedClosingYear || product.closingAcademicYear?._id === selectedClosingYear;

    return nameMatches && academicYearMatches && startingYearMatches && closingYearMatches;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Filters Section */}
      <div className="filters">
        <label htmlFor="academicYear">Academic Year:</label>
        <select id="academicYear" value={selectedAcademicYear} onChange={handleAcademicYearChange}>
          <option value="">Select Academic Year</option>
          {products.map((product) =>
            product.academicYear ? (
              <option key={product.academicYear._id} value={product.academicYear._id}>
                {product.academicYear.name}
              </option>
            ) : null
          )}
        </select>

        <label htmlFor="startingAcademicYear">Starting Academic Year:</label>
        <select id="startingAcademicYear" value={selectedStartingYear} onChange={handleStartingYearChange}>
          <option value="">Select Starting Academic Year</option>
          {products.map((product) =>
            product.startingAcademicYear ? (
              <option key={product.startingAcademicYear._id} value={product.startingAcademicYear._id}>
                {product.startingAcademicYear.name}
              </option>
            ) : null
          
          )}
        </select>

        <label htmlFor="closingAcademicYear">Closing Academic Year:</label>
        <select id="closingAcademicYear" value={selectedClosingYear} onChange={handleClosingYearChange}>
          <option value="">Select Closing Academic Year</option>
          {products.map((product) =>
            product.closingAcademicYear ? (
              <option key={product.closingAcademicYear._id} value={product.closingAcademicYear._id}>
                {product.closingAcademicYear.name}
              </option>
            ) : null
          )}
        </select>
      </div>

      {/* Table Section */}
      <table className="table-auto w-full border-collapse mt-10">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Product Code</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Academic Year</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Active</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product._id}>
                <td className="border p-2">{product._id}</td>
                <td className="border p-2">{product.productCode}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.category}</td>
                <td className="border p-2">{product.academicYear?.name}</td>
                <td className="border p-2">{product.amount}</td>
                <td className="border p-2">{product.active ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="border p-2 text-center">
                No Products Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FeePay;
