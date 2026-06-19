import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StoreFront from './pages/StoreFront';
import ProductPage from './pages/ProductPage';
import OrderPage from './pages/OrderPage'; // Keeping original route just in case

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<StoreFront />} />
        <Route path="/product/turboclean" element={<ProductPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
