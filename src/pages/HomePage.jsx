import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import OrderModal from '../components/OrderModal';
import { FiCheck } from 'react-icons/fi';

import productImg1 from '../assets/product1.jpg';
import productImg2 from '../assets/product2.jpg';
import productImg3 from '../assets/product3.jpg';
import imgBattery  from '../assets/img-battery.jpg';
import imgFilter   from '../assets/img-filter.jpg';
import imgCompare  from '../assets/img-comparison.jpg';
import imgBlower   from '../assets/img-blower.jpg';
import imgSize     from '../assets/img-features.jpg';

const HomePage = () => {
  const [selectedPack, setSelectedPack] = useState(1);
  const [activeImage, setActiveImage] = useState(productImg1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pricing = {
    1: 699,
    2: 999,
    3: 1399
  };

  const currentPrice = pricing[selectedPack];
  const oldPrice = currentPrice + 1400; // Simulated strike-through price

  const thumbnails = [
    productImg1, productImg2, imgBlower, imgCompare, productImg3
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Section: Product Gallery & Details */}
        <div className="flex flex-col md:flex-row gap-8 mb-16 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          
          {/* Left: Gallery */}
          <div className="w-full md:w-1/2">
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-4 bg-white flex justify-center items-center p-4 h-[400px]">
              <img src={activeImage} alt="Compressed Air Duster" className="max-h-full object-contain" />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {thumbnails.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(img)}
                  className={`flex-shrink-0 border-2 rounded overflow-hidden w-20 h-20 ${activeImage === img ? 'border-[#34367f]' : 'border-gray-200 opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx+1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="inline-block border-2 border-black font-bold text-xs uppercase px-2 py-1 mb-4 w-max">
              Hot Product | Low Stock
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-tight">
              Rechargeable 4-in-1 Compressed Air Duster with 91000RPM Adjustable Speed and 6000mAh Power
            </h1>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl font-bold">Rs. {currentPrice}.00</span>
              <span className="text-gray-400 line-through text-sm">Rs. {oldPrice}.00</span>
              <span className="bg-[#34367f] text-white text-xs font-bold px-2 py-1 rounded">SAVE 60%</span>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Style</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => setSelectedPack(1)}
                  className={`pack-btn ${selectedPack === 1 ? 'active' : ''}`}
                >
                  Pack of 1 @ 699₹
                </button>
                <button 
                  onClick={() => setSelectedPack(2)}
                  className={`pack-btn ${selectedPack === 2 ? 'active' : ''}`}
                >
                  Pack of 2 @ 999₹
                </button>
                <button 
                  onClick={() => setSelectedPack(3)}
                  className={`pack-btn ${selectedPack === 3 ? 'active' : ''}`}
                >
                  Pack of 3 @ 1399₹
                </button>
              </div>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary mb-4 py-4 text-xl"
            >
              Order Now – Cash on Delivery
            </button>

            <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
              <FiCheck className="text-green-500" />
              <span>Get it between <strong>Monday, June 22nd</strong> and <strong>Wednesday, June 26th</strong></span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Scrolling Features */}
        <div className="max-w-3xl mx-auto space-y-16">
          
          <div className="text-center">
            <h2 className="text-2xl font-black mb-4 uppercase">Superior Blowing Power</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The <strong>4-in-1 Powerful Compressed Air Duster</strong> is an innovative and versatile tool designed to meet all your cleaning needs. Equipped with a <strong>high-speed motor</strong>, this air duster delivers a powerful blast of air to remove dust, debris, and other contaminants from any surface.
            </p>
            <img src={imgBlower} alt="Blowing Power" className="w-full rounded-lg shadow-sm" />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-black mb-4 uppercase">Powerful Suction</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              In addition to blowing air, this device also functions as a <strong>vacuum cleaner</strong>. Its strong suction capability efficiently captures <strong>dust, dirt, and small debris</strong>, making it perfect for cleaning surfaces and crevices where dust tends to accumulate.
            </p>
            <img src={productImg1} alt="Powerful Suction" className="w-full rounded-lg shadow-sm" />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-black mb-4 uppercase">Versatile Nozzles</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The vacuum function comes with a <strong>variety of nozzle attachments</strong>, designed to tackle different cleaning scenarios.
            </p>
            <img src={productImg2} alt="Versatile Nozzles" className="w-full rounded-lg shadow-sm" />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-black mb-4 uppercase">Integrated LED Light</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              For added convenience, the air duster is equipped with a <strong>built-in LED flashlight</strong>. This feature illuminates dark and hard-to-see areas, making it easier to clean those hidden spots.
            </p>
            <img src={productImg3} alt="LED Light" className="w-full rounded-lg shadow-sm" />
          </div>

        </div>
      </main>

      <OrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPack={selectedPack} 
        price={currentPrice} 
      />
    </div>
  );
};

export default HomePage;
