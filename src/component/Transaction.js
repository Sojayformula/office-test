import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router";
import axios from 'axios';

            const FeePay = () => {

              const [activeLink, setActiveLink] = useState('');
              const [transactions, setTransactions] = useState([]);
              const [loading, setLoading] = useState(true);
              const [error, setError] = useState(null);
              const [typeFilter, setTypeFilter] = useState('');
              const navigator = useNavigate();
              const location = useLocation();
              const currentPath = location.pathname;
              const [isLoggedIn, setIsLoggedIn] = useState(false)
              const [storedUser, setStoredUser] = useState("")
              const [showMore, setShowMore] = useState(true);

              const handleClick = (Link) => {
                setActiveLink(Link);
              };

              const handleShowMore = () => {
                setShowMore(!showMore);
            };

              const handleClearFilter = () => {
                setTypeFilter('');
                //setSelectedAcademicYear('');
            };

                useEffect(() => {
                const data = localStorage.getItem('user');  
                if (data){ 
                  try {
                    setStoredUser(JSON.parse(data));
                  } catch (error) {
                    console.error('Error parsing user data:', error);
                  }
                }
              }, []);
            
               const handleButtonClick = () => {
                localStorage.setItem('user', "");
                 if (isLoggedIn) {
                   localStorage.setItem('isLoggedIn', 'false');
                   setIsLoggedIn(false);
                   navigator("/")
                } else {
              localStorage.setItem('isLoggedIn', 'true');
                   setIsLoggedIn(true);
                 }
               };

  const fetchTransactions = async () => {
    const url = `https://sandbox-api.xcelapp.com/upsa/v1/transactions`;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NWI3NDYyY2M1Y2ZmNjE5MGE2ODllNzIiLCJtZXJjaGFudElkIjoicDg3cDZndWplIiwicm9sZXMiOlt7Il9pZCI6IjY1YmZmYzM3MWI4MWNkNGFiNWJhOGQxMiIsIm5hbWUiOiJTVVBFUiBST0xFIiwicGVybWlzc2lvbnMiOlsiQ1JFQVRFX1NUQUZGIiwiQVBQUk9WRV9DUkVBVEVfQUNBREVNSUNfWUVBUiIsIkFQUFJPVkVfQ1JFQVRFX1NUQUZGIiwiQ1JFQVRFX0FDQURFTUlDX1lFQVIiLCJDUkVBVEVfUk9MRSIsIkFTU0lHTl9ST0xFIiwiQkxPQ0tfVVNFUiIsIlVOQkxPQ0tfVVNFUiIsIkVESVRfU1RBRkYiLCJFRElUX0ZFRSIsIkFVVEhPUklaRV9DUkVBVEVfRkVFIiwiVklFV19UUkFOU0FDVElPTlMiLCJQQVlfVE9fQkFOSyIsIkFVVEhPUklaRV9QQVlfVE9fQkFOSyIsIkVESVRfVVNFUiIsIkRFTEVURV9VU0VSIiwiVklFV19SRVBPUlRTIiwiVklFV19BVURJVF9UUkFJTCIsIkNSRUFURV9QUk9HUkFNIiwiQVBQUk9WRV9DUkVBVEVfUFJPR1JBTSIsIkNSRUFURV9ESVNCVVJTRU1FTlRfQUNDVCIsIkFQUFJPVkVfQVNTSUdOX1dBTExFVCIsIkFQUFJPVkVfVVBEQVRFX0ZFRSIsIkFQUFJPVkVfVVBEQVRFX0ZFRV9QQVlNRU5UIiwiQ1JFQVRFX1dBTExFVCIsIkNSRUFURV9GRUUiLCJCSUxMX1NUVURFTlQiLCJWSUVXX1NUVURFTlQiLCJNT0RJRllfU1RVREVOVF9GRUUiLCJSRVZFUlNFX1RSQU5TQUNUSU9OIiwiQVBQUk9WRV9UUkFOU0FDVElPTl9SRVZFUlNBTCJdLCJtZXJjaGFudElkIjoicDg3cDZndWplIiwiY3JlYXRlZEF0IjoiMjAyNC0wMi0wNFQyMTowNTo1OS4xNzVaIiwidXBkYXRlZEF0IjoiMjAyNS0wMS0xN1QxMzowNjo0My43MDFaIiwiX192IjowLCJkZXNjcmlwdGlvbiI6IlNhbXBsZSBSb2xlIn0seyJfaWQiOiI2NWI4Y2E4NjAzNTRlMGQzYzYzOWM4YmUiLCJuYW1lIjoiU3VwZXIgQWRtaW4iLCJwZXJtaXNzaW9ucyI6WyJWSUVXX0FVRElUX1RSQUlMIiwiVklFV19UUkFOU0FDVElPTlMiXSwibWVyY2hhbnRJZCI6InA4N3A2Z3VqZSIsImNyZWF0ZWRBdCI6IjIwMjQtMDEtMzBUMTA6MDg6MDYuNjI4WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDQtMDNUMjI6MTc6MzAuNTQzWiIsIl9fdiI6MCwiZGVzY3JpcHRpb24iOm51bGx9XSwiaWF0IjoxNzM4MTgwMzQyLCJleHAiOjE3MzgyNjY3NDJ9.9EYlo-H9z22fObywkI_znAn2xaOn_llqKyPlnsE6DB8'
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const transactions = response.data.transactions; 
      setTransactions(transactions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    const typeMatches = transaction.type.toLowerCase().includes(typeFilter.toLowerCase());
    return typeMatches ;
  });

  const displayedProducts = showMore ? filteredTransactions : filteredTransactions.slice(0, 6);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
     <div className=" overflow-x-hidden">
      <div className="mt-10 bg-blue-800 text-white h-[10rem] lg:mx-2">
        <div className="flex justify-between relative top-10 space-x-4">

        <div className="relative top-[-0.4rem] lg:ml-20 relativ lg:top-[-0.6rem]">
            <span className="text-red-800 text-2xl lg:text-4xl">e</span>
            <span className="text-lg lg:text-4xl">tranzact</span>
          </div>

          <div className="lg:space-x-6 space-x-4 flex">
            <div>
            <Link to="/transaction"
              onClick={() => handleClick('/transaction')}
              className={`${currentPath === '/transaction' ? 'underline' : ''} underline-offset-4 hover:underline decoration-blue-500 decoration-4 px-2 font-semibold lg:text-lg`}
            >
              Transaction
            </Link>
            </div>
           
           <div>
            <Link to="/feePay"
              onClick={() => handleClick('/feePay')}
              className={`${currentPath === '/feePay' ? 'underline' : ''} underline-offset-4 hover:underline decoration-blue-500 decoration-4 px-2 font-semibold lg:text-lg`}
            >
              Fee payment
            </Link>
            </div>
          </div>

          <div className='mx-2'>
          <button onClick={handleButtonClick} className="flex justify-center items-center mr-20 bg-orange-600 rounded-full w-16 h-8 text-lg">
            Logout
          </button>
          </div>

        </div>
        </div>
      
      <div className='flex justify-center flex-col lg:flex-row mt-10 mx-20'>
        <div className="ml-4">
          <input
            type="text"
            placeholder="Search by type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border p-2 lg:mr-4"
          />
          

          </div>
            <div className='mt-4 lg:mt-0 flex w-[20rem]'>
             <button onClick={handleClearFilter} className="ml-4 mx-4 lg:h-10 text-sm lg:text-lg p-2 bg-gray-500 text-white rounded">
                    Clear Search
                </button>

                <button onClick={handleShowMore} className="text-center lg:ml-4 lg:h-10 text-sm lg:text-lg p-2 bg-blue-500 text-white rounded">
                    {showMore ? 'Show Less' : 'Show More'}
                </button> 
                </div>
                </div>
                
         
      <div className='lg:mx-10  p-4 overflow-x-auto'>
      <table className="items-center table-auto min-w-full border-collapse mt-10 ">
        <thead>
          <tr>
            <th className="border p-2">Transaction ID</th>
            <th className="border p-2">Fee Payment</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Created At</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {displayedProducts && filteredTransactions.length > 0 ? (
            displayedProducts.map((transaction) => (
              <tr key={transaction._id}>
                <td className="border p-2">{transaction._id}</td>
                <td className="border p-2">{transaction.feepayment}</td>
                <td className="border p-2">{transaction.amount}</td>
                <td className="border p-2">{transaction.type}</td>
                <td className="border p-2">{transaction.createdAt}</td>
                <td className="border p-2">{transaction.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border p-2 text-center">No Transactions Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default FeePay;

// filteredTransactions

