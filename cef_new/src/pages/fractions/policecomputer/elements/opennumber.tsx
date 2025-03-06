import React, { useState } from 'react';
import { translateText } from '#/shared/locale';
import { executeClient } from '#/shared/api/rage';

interface OpenNumberProps {
  model?: string;
  owner?: string;
}

const OpenNumber: React.FC<OpenNumberProps> = ({ model = '', owner = '' }) => {
  const [value, setValue] = useState<string>('');

  const handleCheck = () => {
    executeClient('client:pcMenuInput', 'checkNumber', value);
  };

  return (
    <div className="text-white">
      <h1 className="text-xl font-bold text-white mb-6">
        {translateText('fractions', 'База номеров')}
      </h1>
      
      <div className="bg-[#2c2c2e] rounded-xl p-6 mb-6">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={8}
          placeholder={translateText('fractions', 'Номер')}
          className="p-3 bg-[#1c1c1e] border border-[#38383a] text-white rounded-xl w-full mb-4 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   placeholder:text-white/50"
        />
        <button 
          className="bg-blue-600 text-white font-medium py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
          onClick={handleCheck}
        >
          {translateText('fractions', 'Пробить')}
        </button>
      </div>
      
      {model && (
        <div className="bg-[#2c2c2e] rounded-xl overflow-hidden">
          <div className="p-4 bg-blue-600/20 flex items-center border-b border-[#38383a]">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">🚗</span>
            </div>
            <div>
              <div className="text-lg font-bold">{model}</div>
              <div className="text-sm text-white/70">{value || 'License Plate: Unknown'}</div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1c1c1e] p-4 rounded-xl">
                <div className="text-sm text-white/50 mb-1">{translateText('fractions', 'МАРКА')}</div>
                <div className="font-medium">{model}</div>
              </div>
              
              <div className="bg-[#1c1c1e] p-4 rounded-xl">
                <div className="text-sm text-white/50 mb-1">{translateText('fractions', 'ВЛАДЕЛЕЦ')}</div>
                <div className="font-medium">{owner}</div>
              </div>
            </div>
          </div>
          
          <div className="flex p-4 border-t border-[#38383a]">
            <button className="bg-blue-600 text-white font-medium py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors mr-3">
              {translateText('fractions', 'Подробнее о владельце')}
            </button>
            <button className="bg-red-600 text-white font-medium py-2 px-4 rounded-xl hover:bg-red-700 transition-colors">
              {translateText('fractions', 'Объявить в розыск')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenNumber;