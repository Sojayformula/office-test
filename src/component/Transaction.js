import React, {useState, useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { useNavigate } from "react-router";
import fetchProductData from './api';
import axios from 'axios';


const FeePay = () => {

      const [activeLink, setActiveLink] = useState('')
      const [products, setProducts] = useState([]); 
      const [loading, setLoading] = useState(true); 
      const [error, setError] = useState(null);
      const [nameFilter, setNameFilter] = useState('');
      const [categoryFilter, setCategoryFilter] = useState('');

      const [isOpen, setIsOpen] = useState(false);
      const [isLoggedIn, setIsLoggedIn] = useState(false)
        const [storedUser, setStoredUser] = useState()

        const [transactions, setTransactions] = useState([]);

        const navigator = useNavigate();
    

      const location = useLocation()
      const currentPath = location.pathname
    
      const handleClick = (Link) => {
        setActiveLink(Link)  
      }


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


  const fetchTransactions = async (page, pageSize, transactions) => {
    const userId = '651d34630d91a9683ceb7d04';
    const productId = '651d34630d91a9683ceb7d09';
    const indexNumber = '10084432';
    const bankFailed = false;
    const startDate = '2024-01-28';
    const endDate = '2024-02-22';
  
    const url = `https://sandbox-api.xcelapp.com/upsa/v1/transactions?page=${page}&pageSize=${pageSize}&transactionsId=${transactions}`;
    const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NWI3NDYyY2M1Y2ZmNjE5MGE2ODllNzIiLCJtZXJjaGFudElkIjoicDg3cDZndWplIiwicm9sZXMiOlt7Il9pZCI6IjY1YmZmYzM3MWI4MWNkNGFiNWJhOGQxMiIsIm5hbWUiOiJTVVBFUiBST0xFIiwicGVybWlzc2lvbnMiOlsiQ1JFQVRFX1NUQUZGIiwiQVBQUk9WRV9DUkVBVEVfQUNBREVNSUNfWUVBUiIsIkFQUFJPVkVfQ1JFQVRFX1NUQUZGIiwiQ1JFQVRFX0FDQURFTUlDX1lFQVIiLCJDUkVBVEVfUk9MRSIsIkFTU0lHTl9ST0xFIiwiQkxPQ0tfVVNFUiIsIlVOQkxPQ0tfVVNFUiIsIkVESVRfU1RBRkYiLCJFRElUX0ZFRSIsIkFVVEhPUklaRV9DUkVBVEVfRkVFIiwiVklFV19UUkFOU0FDVElPTlMiLCJQQVlfVE9fQkFOSyIsIkFVVEhPUklaRV9QQVlfVE9fQkFOSyIsIkVESVRfVVNFUiIsIkRFTEVURV9VU0VSIiwiVklFV19SRVBPUlRTIiwiVklFV19BVURJVF9UUkFJTCIsIkNSRUFURV9QUk9HUkFNIiwiQVBQUk9WRV9DUkVBVEVfUFJPR1JBTSIsIkNSRUFURV9ESVNCVVJTRU1FTlRfQUNDVCIsIkFQUFJPVkVfQVNTSUdOX1dBTExFVCIsIkFQUFJPVkVfVVBEQVRFX0ZFRSIsIkFQUFJPVkVfVVBEQVRFX0ZFRV9QQVlNRU5UIiwiQ1JFQVRFX1dBTExFVCIsIkNSRUFURV9GRUUiLCJCSUxMX1NUVURFTlQiLCJWSUVXX1NUVURFTlQiLCJNT0RJRllfU1RVREVOVF9GRUUiLCJSRVZFUlNFX1RSQU5TQUNUSU9OIl0sIm1lcmNoYW50SWQiOiJwODdwNmd1amUiLCJjcmVhdGVkQXQiOiIyMDI0LTAyLTA0VDIxOjA1OjU5LjE3NVoiLCJ1cGRhdGVkQXQiOiIyMDI1LTAxLTE3VDEzOjA2OjQzLjcwMVoiLCJfX3YiOjAsImRlc2NyaXB0aW9uIjoiU2FtcGxlIFJvbGUifSx7Il9pZCI6IjY1YjhjYTg2MDM1NGUwZDNjNjM5YzhiZSIsIm5hbWUiOiJTdXBlciBBZG1pbiIsInBlcm1pc3Npb25zIjpbIlZJRVdfQVVESVRfVFJBSUwiLCJWSUVXX1RSQU5TQUNUSU9OUyJdLCJtZXJjaGFudElkIjoicDg3cDZndWplIiwiY3JlYXRlZEF0IjoiMjAyNC0wMS0zMFQxMDowODowNi42MjhaIiwidXBkYXRlZEF0IjoiMjAyNC0wNC0wM1QyMjoxNzozMC41NDNaIiwiX192IjowLCJkZXNjcmlwdGlvbiI6bnVsbH1dLCJpYXQiOjE3MzcxOTkwMjMsImV4cCI6MTczNzI4NTQyM30.bwjAKcG7pUKslh1F32wmF62u11RxE8VRYg-uYoGKCfo'

    try {
      // const response = await axios.get(url);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const transactions = response.data.transactions; // Assuming 'transactions' is the array in the response
      
      setTransactions(transactions); // Set to state to use in rendering
      console.log('API Response:', response.data.transactions);
      console.log('token:', token)
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError(error.message); 
      setLoading(false);
    }
  };
  
  // Example usage in useEffect:
  useEffect(() => {
    const page = 1;
    const pageSize = 25;
    fetchTransactions(page, pageSize);
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  };  
     

  return (
    <div className="">
         <div  className=" mt-10 bg-blue-800 text-white h-[10rem]">
              <div className='flex justify-between relative top-10'>
              <div  className="ml-20 relative top-[-0.6rem]">
           <span className='text-red-800 text-4xl'>e</span><span className='text-4xl'>tranzact</span>
           </div>
      
            <div className='space-x-10'>

            <Link to="/transaction"
                  onClick={() => handleClick('/transaction')}
                  className={`${currentPath === '/transaction' ? 'underline' : ''}
                  underline-offset-4 hover:underline decoration-blue-500 decoration-4 px-2 font-semibold
                text-lg`}
                 >
                  Transaction
                   </Link>

           <Link to="/feePay "
                 onClick={() => handleClick('/feePay')}
                 className={`${currentPath === '/feePay' ? 'underline' : ''}
                 underline-offset-4 hover:underline decoration-blue-500 decoration-4 px-2 font-semibold
               text-lg`}
                 >
                  Fee payment
                   </Link>
              
            </div>
      
            <button onClick={handleButtonClick} className="flex justify-center mr-20 bg-orange-600 rounded-full w-20 h-8">
               Logout
            </button>
      
            </div>
            </div>

            {/* <div>
            <div className="flex mt-10 justify-center ">
        <input
          type="text"
          placeholder="Search by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="border p-2 mr-4"
        />

          <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2"
        >
          <option value="">All Categories</option>
          <option value="Category1">Category1</option>
          <option value="Category2">Category2</option>
        </select>
      </div>

            </div> */}


      <table className="table-auto w-full border-collapse mt-10">
      <thead>
        <tr>
          <th className="border p-2">Transaction ID</th>
          <th className="border p-2">Amount</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td className="border p-2">{transaction._id}</td>
              <td className="border p-2">{transaction.amount}</td>
              <td className="border p-2">{transaction.status}</td>
              <td className="border p-2">{new Date(transaction.date).toLocaleDateString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="border p-2 text-center">No Transactions Found</td>
          </tr>
        )}
      </tbody>
    </table>


    </div>
    
  );
}

export default FeePay; 

// const url = `https://sandbox-api.xcelapp.com/upsa/v1/transactions?page=${page}&pageSize=${pageSize}&userId=${userId}&productId=${productId}&indexNumber=${indexNumber}&bankFailed=${bankFailed}&startDate=${startDate}&endDate=${endDate}`;
