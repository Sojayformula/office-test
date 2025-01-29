import React, { useState } from 'react';
import image from '../asset/sidepic2.jpg';
import { useNavigate } from "react-router";
import axios from "axios"
import { Link } from 'react-router';

const Login = () => {

    const [errormessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [networkError, setNetworkError] = useState('');
   
     const navigator = useNavigate()

    const [inputData, setInputData] = useState({
        username: "",
        password: "",
    });


    const [errorinputData, setErrorFormData] = useState({
        username: "",
        password: "",
    });

    const [errorInput, setErrorInput] = useState()

    //    const handleError = () => {
    //     if(!errorInput){
    //         setErrorInput("")
    //     }
    //    }

    const handleChange = (e) => {
        setInputData({
            ... inputData, [e.target.name]: e.target.value
    })
    };

    const errorHandler = ()=>{
        console.log('DATA', inputData)

        let errorData = errorinputData;

        if(inputData.username.length === 0){
            console.log('Error found email', errorinputData)
            errorData.email = 'Please enter user name'
            
        }

        if(inputData.password.length === 0){
            console.log('Error found password', errorinputData)
            errorData.password = 'Please enter password'
            
        }
        setErrorFormData({
            ...errorData
    })
}



    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true); 
        setErrorMessage(''); 


        let isError =  errorHandler();

        console.log('errorinputData', errorinputData);

        if( isError !== true){
            
            // const response = await axios.post('https://sandbox-api.xcelapp.com/upsa/v1/auth/login ', {...inputData})
            //     .then(function (response){
            //     console.log(response)  
            //     navigator('/transaction')             
            //     localStorage.setItem('token', JSON.stringify(response.data.token));
            //     localStorage.setItem('user', JSON.stringify(response.data.user));
            //     console.log('token', response.data.token);
            //     })
            //     .catch(function(error) {
            //         console.log(error);
            //         if (error.response && error.response.status === 401) {
            //             setErrorMessage("Invalid username or password");
            //             }else{
            //          console.log('Error found')
            //         } 
    
            //     })

               
            try{
                const response = await axios.post('https://sandbox-api.xcelapp.com/upsa/v1/auth/login ', {...inputData})
                console.log(response)
                navigator('/transaction') 
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('user', JSON.stringify(response.data.user));
                console.log('token', response.data.token);
                setIsLoading(false)
              }catch(error){
                console.log('respone error', error.message)
                if(error.response && error.response.status === 401){
                  setErrorMessage('Invalid user name or password')
                } else if (error.message === 'Network Error') {
                  setNetworkError('Network error. Please check your connection.');
                }else {
                  setErrorMessage('An unexpected error occurred. Please try again.');
                  console.log('Unexpected error:', error.message);
                }
                  setIsLoading(false)
        
            }

              }}

     
    const bgStyle = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '33rem'
      };

    return (
         <>
            <div className='md:flex justify-center items-center md:mt-6 overflow-x-hidden'>
                <div className='bg-gray-900 '>
                <div className='md:flex bg-gray-800 rounded-lg mx-1 md:mx-20 md:my-20'>
                <div className=' md:w-[20rem] invisible md:visible' style={bgStyle}>
                    <div className='mx-6 mt-6 flex justify-between '>
                    <div className='text-white text-4xl'> 
                </div>
               
                </div>
                </div>
              
                <div className='mt-[-30rem] md:mt-0'>
              <div className='flex flex-col items-center mx-6  md:mt-10 mb-4 md:mb-0'>
            
              {isLoading && <p className='text-white'>Loading...</p>}
              {errormessage && <p className='text-red-600 text-lg'>{errormessage}</p>}
              {networkError && <p className='text-red-600 relative top-[-2rem] text-lg'>{networkError}</p>}
              <div className='relative top-[-2rem]'>
              {errormessage &&<p className="text-red-600 text-2xl">{errormessage}</p>}
              </div>

                <h1 className='text-4xl font-bold text-white'>Hello Again</h1>
                <p className='text-gray-400'>You Welcome back</p>
              </div>
             
                <form onSubmit={handleSubmit}>
                <div className='mx-6 md:mt-20 space-y-10'>
                    <div>
                <input 
                type='text'
                name='username'
                value={inputData.username}
                placeholder='username'
                onChange={handleChange}
                className='border border-gray-600 hover:border-purple-600 rounded-lg py-2 w-full placeholder:px-2 text-white bg-gray-600 px-4'
                />
                <span className='text-red-600 text-sm'>{errorinputData.email}</span>
                </div>
                <div>
                 <input 
                type='text'
                name="password"
                value={inputData.password}
                placeholder='Password'
                onChange={handleChange}
                className='border border-gray-600 hover:border-purple-600 rounded-lg py-2 w-full placeholder:px-2 text-white bg-gray-600 px-4'
                />
                    <span className='text-red-600 text-sm'>{errorinputData.password}</span>
                </div>
                </div>

                <div className='flex justify-center mx-10 mt-16 bg-purple-600 py-2  md:text-2xl rounded-lg'>
                <button className='bg-purple-600 text-white'>Login</button>
                </div> 
                <div className='mt-2 mb-4'>
                <Link to="/register" className='mx-6 md:mx-8 text-gray-400 text-sm'>Don't have an account? <span className='text-purple-600 underline'>Create Account</span></Link>
                </div>
                
                </form> 

                <div className='relative top-[-9rem] flex justify-between mx-6 space-x-2 mt-4'>
                <div></div>
                <div className='text-left'>
                <button className='text-gray-200 text-sm '>Forgot password?</button>
                </div>
                </div>
                
            </div> 
            </div>
            </div>
            
            </div>
         </>
    );
}

export default Login;