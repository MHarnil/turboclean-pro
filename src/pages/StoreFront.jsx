import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import productImg1 from '../assets/product1.jpg';

const StoreFront = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="bg-[#34367f] text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-wider">Welcome to E-RUUP</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Your Trusted Store for Premium Innovative Products.
        </p>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* TurboClean Pro Card */}
          <div 
            onClick={() => navigate('/product/turboclean')}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col"
          >
            <div className="relative aspect-square p-4 flex items-center justify-center bg-gray-50">
              <div className="absolute top-2 left-2 bg-[#34367f] text-white text-xs font-bold px-2 py-1 rounded z-10">
                SAVE 60%
              </div>
              <img 
                src={productImg1} 
                alt="TurboClean Pro" 
                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="p-4 flex flex-col flex-grow">
              <div className="text-xs text-gray-500 mb-1 uppercase font-bold tracking-wider">Electronics</div>
              <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2">
                Rechargeable 4-in-1 Compressed Air Duster with 91000RPM Adjustable Speed
              </h3>
              
              <div className="mt-auto pt-4 flex items-center gap-2">
                <span className="text-lg font-black text-[#34367f]">Rs. 699.00</span>
                <span className="text-xs text-gray-400 line-through">Rs. 2099.00</span>
              </div>
            </div>
          </div>
          
          {/* Empty slot placeholders (optional) 
              Leaving this as single product for now as they only have one.
          */}

        </div>
      </main>
    </div>
  );
};

export default StoreFront;
