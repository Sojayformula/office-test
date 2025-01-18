import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './component/login';
import Transaction from './component/Transaction';
import FeePay from './component/FeePay';
//import { HashRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <Router>
        <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/feePay" element={<FeePay />} />
        </Routes>
      </Router>
       </QueryClientProvider>
      
  );
}

export default App;
