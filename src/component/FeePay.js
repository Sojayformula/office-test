import React, {useState, useEffect, use } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { useNavigate } from "react-router";
import fetchProductData from './api';
import axios from 'axios';


const FeePay = () => {
       

      const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
      const [activeLink, setActiveLink] = useState('')
      const [products, setProducts] = useState([]); 
      const [loading, setLoading] = useState(true); 
      const [error, setError] = useState(null);
      const [nameFilter, setNameFilter] = useState('');
       const navigator = useNavigate();
      const [isLoggedIn, setIsLoggedIn] = useState(false)
      const [storedUser, setStoredUser] = useState("")
      const [showMore, setShowMore] = useState(true);

      const handleShowMore = () => {
        setShowMore(!showMore);
    };

      const handleClearFilter = () => {
        setNameFilter('');
        setSelectedAcademicYear('');
    };

             const handleAcademicYearChange = (event) => {
              setSelectedAcademicYear(event.target.value);
            };

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

            const fetchData = async () => {
            const url = 'https://sandbox-api.xcelapp.com/upsa/v1/product/getProducts?state=APPROVED' 
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NWI3NDYyY2M1Y2ZmNjE5MGE2ODllNzIiLCJtZXJjaGFudElkIjoicDg3cDZndWplIiwicm9sZXMiOlt7Il9pZCI6IjY1YmZmYzM3MWI4MWNkNGFiNWJhOGQxMiIsIm5hbWUiOiJTVVBFUiBST0xFIiwicGVybWlzc2lvbnMiOlsiQ1JFQVRFX1NUQUZGIiwiQVBQUk9WRV9DUkVBVEVfQUNBREVNSUNfWUVBUiIsIkFQUFJPVkVfQ1JFQVRFX1NUQUZGIiwiQ1JFQVRFX0FDQURFTUlDX1lFQVIiLCJDUkVBVEVfUk9MRSIsIkFTU0lHTl9ST0xFIiwiQkxPQ0tfVVNFUiIsIlVOQkxPQ0tfVVNFUiIsIkVESVRfU1RBRkYiLCJFRElUX0ZFRSIsIkFVVEhPUklaRV9DUkVBVEVfRkVFIiwiVklFV19UUkFOU0FDVElPTlMiLCJQQVlfVE9fQkFOSyIsIkFVVEhPUklaRV9QQVlfVE9fQkFOSyIsIkVESVRfVVNFUiIsIkRFTEVURV9VU0VSIiwiVklFV19SRVBPUlRTIiwiVklFV19BVURJVF9UUkFJTCIsIkNSRUFURV9QUk9HUkFNIiwiQVBQUk9WRV9DUkVBVEVfUFJPR1JBTSIsIkNSRUFURV9ESVNCVVJTRU1FTlRfQUNDVCIsIkFQUFJPVkVfQVNTSUdOX1dBTExFVCIsIkFQUFJPVkVfVVBEQVRFX0ZFRSIsIkFQUFJPVkVfVVBEQVRFX0ZFRV9QQVlNRU5UIiwiQ1JFQVRFX1dBTExFVCIsIkNSRUFURV9GRUUiLCJCSUxMX1NUVURFTlQiLCJWSUVXX1NUVURFTlQiLCJNT0RJRllfU1RVREVOVF9GRUUiLCJSRVZFUlNFX1RSQU5TQUNUSU9OIiwiQVBQUk9WRV9UUkFOU0FDVElPTl9SRVZFUlNBTCJdLCJtZXJjaGFudElkIjoicDg3cDZndWplIiwiY3JlYXRlZEF0IjoiMjAyNC0wMi0wNFQyMTowNTo1OS4xNzVaIiwidXBkYXRlZEF0IjoiMjAyNS0wMS0xN1QxMzowNjo0My43MDFaIiwiX192IjowLCJkZXNjcmlwdGlvbiI6IlNhbXBsZSBSb2xlIn0seyJfaWQiOiI2NWI4Y2E4NjAzNTRlMGQzYzYzOWM4YmUiLCJuYW1lIjoiU3VwZXIgQWRtaW4iLCJwZXJtaXNzaW9ucyI6WyJWSUVXX0FVRElUX1RSQUlMIiwiVklFV19UUkFOU0FDVElPTlMiXSwibWVyY2hhbnRJZCI6InA4N3A2Z3VqZSIsImNyZWF0ZWRBdCI6IjIwMjQtMDEtMzBUMTA6MDg6MDYuNjI4WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDQtMDNUMjI6MTc6MzAuNTQzWiIsIl9fdiI6MCwiZGVzY3JpcHRpb24iOm51bGx9XSwiaWF0IjoxNzM4MTgwMzQyLCJleHAiOjE3MzgyNjY3NDJ9.9EYlo-H9z22fObywkI_znAn2xaOn_llqKyPlnsE6DB8'
          try {
            const response = await axios.get(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setProducts(response.data.product);
            console.log('Full API Response:', response.data.product)
            console.log('token:', token)
            setLoading(false); 
          } catch (error) {
            setError(error.message); 
          }
        }
        

        useEffect(() => {
          fetchData(); 
        }, []);

        const filteredProducts = products.filter((product) => {
          const nameMatches = product.name.toLowerCase().includes(nameFilter.toLowerCase());
          const academicYearMatches =
          !selectedAcademicYear || product.academicYear?._id === selectedAcademicYear;
          return nameMatches && academicYearMatches;
        });

        const displayedProducts = showMore ? filteredProducts : filteredProducts.slice(0, 6);

        if (loading) {
          return <div>Loading...</div>;
        }

        if (error) {
          return <div>Error: {error}</div>;
        };  
        
  

  return (
    <div className="overflow-x-hidden">
         <div  className=" mt-10 bg-blue-800 text-white h-[10rem] lg:mx-2">
              <div className='flex justify-between relative top-10 space-x-4'>

              {/* <div  className="ml-20 relative top-[-0.6rem]">
           <span className='text-red-800 text-4xl'>e</span><span className='text-4xl'>tranzact</span>
           </div> */}

          <div className="lg:ml-20 relative top-[-0.4rem] lg:top-[-0.6rem]">
            <span className="text-red-800 text-2xl lg:text-4xl">e</span>
            <span className="text-lg lg:text-4xl">tranzact</span>
          </div>

             <div className='lg:space-x-6 space-x-4 flex'>
              <div>
            <Link to="/transaction"
                  onClick={() => handleClick('/transaction')}
                  className={`${currentPath === '/transaction' ? 'underline' : ''}
                  underline-offset-4 hover:underline decoration-blue-500 decoration-4 px-2 font-semibold
                lg:text-lg`}
                 >
                  Transaction
                   </Link>
                   </div>

                  <div>
           <Link to="/feePay "
                 onClick={() => handleClick('/feePay')}
                 className={`${currentPath === '/feePay' ? 'underline' : ''}
                 underline-offset-4 hover:underline decoration-blue-500 decoration-4 px-2 font-semibold
               lg:text-lg`}
                 >
                  Fee payment
                   </Link> 
                   </div>
                  
            </div>
          <div className='mx-2'>
          <button onClick={handleButtonClick} className="flex justify-center mr-2 lg:mr-20 bg-orange-600 rounded-full w-16 h-8">
            Logout
          </button>
          </div>
      
            </div>
            </div>

           <div className='mt-10 flex justify-center'> 
         <div className="lg:flex mt- justify-cente space-x-2">
         <input
          type="text"
          placeholder="Search by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="border p-2 lg:mr-4 w-[10rem] lg:w-auto"
        />

        <select id="academicYear" value={selectedAcademicYear} onChange={handleAcademicYearChange} className='border p-2 w-[10rem] lg:w-auto'>
          <option value="">Select Academic Year</option>
          {products.map((product) =>
            product.academicYear ? (
              <option key={product.academicYear._id} value={product.academicYear._id}>
                {product.academicYear.name}
              </option>
            ) : null
          )}
        </select>

         <div className='relative left-10 lg:left-0'>
        <button onClick={handleClearFilter} className="ml-4 p-2 bg-gray-500 text-white rounded mt-10 lg:mt-0 content-center">
                    Clear Search
                </button>
               
        <button onClick={handleShowMore} className="ml-4 p-2 bg-blue-500 text-white rounded">
                    {showMore ? 'Show Less' : 'Show More'}
                </button>
                </div>

         </div>
        </div> 


        <div className='lg:mx-10 p-4 overflow-x-auto'>
        <table className="items-center table-auto min-w-full border-collapse mt-10">
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
          {displayedProducts  && products.length > 0 ? (
             displayedProducts.map((product) => {
              return<tr key={product._id}>
                <td className="border p-2">{product._id}</td>
                <td className="border p-2">{product.productCode}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.category}</td>
                <td className="border p-2">{product.academicYear?.name}</td> 
                <td className="border p-2">{product.amount}</td>
                <td className="border p-2">{product.active ? 'Yes' : 'No'}</td>
              </tr>
            })
           ) : (
             <tr>
               <td colSpan="7" className="border p-2 text-center">No Products Found</td>
             </tr>
           )}
        </tbody>
      </table>
    </div>
    </div>
    
  );
}

export default FeePay; 


// // https://sandbox-api.xcelapp.com/upsa/v1/product/getProducts?state=ALL  filteredProducts

