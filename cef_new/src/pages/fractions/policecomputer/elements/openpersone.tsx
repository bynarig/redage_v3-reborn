import React, { useState } from 'react';
import { translateText } from '#/shared/locale';
import { executeClient } from '#/shared/api/rage';

interface OpenPersoneProps {
  fname?: string;
  lname?: string;
  pass?: string;
  fraction_name?: string;
  phonenumber?: string;
  gender?: string;
  lvl?: string;
  lic?: string;
  houseInfo?: string;
}

const OpenPersone: React.FC<OpenPersoneProps> = ({
  fname = '',
  lname = '',
  pass = '',
  fraction_name = '',
  phonenumber = '',
  gender = '',
  lvl = '',
  lic = '',
  houseInfo = ''
}) => {
  const [value, setValue] = useState<string>('');

  const handleCheck = () => {
    executeClient('client:pcMenuInput', 'checkPerson', value);
  };

  return (
    <div className="text-white">
      <h1 className="text-xl font-bold text-white mb-6">
        {translateText('fractions', 'База данных')}
      </h1>
      
      <div className="bg-[#2c2c2e] rounded-xl p-6 mb-6">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={30}
          placeholder={translateText('fractions', 'Паспорт/Имя_Фамилия')}
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
      
      {(fname || lname) && (
        <div className="bg-[#2c2c2e] rounded-xl overflow-hidden">
          <div className="p-4 bg-blue-600/20 flex items-center border-b border-[#38383a]">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">👤</span>
            </div>
            <div>
              <div className="text-lg font-bold">{fname} {lname}</div>
              <div className="text-sm text-white/70">ID: {pass}</div>
            </div>
            
            <div className={`ml-auto px-3 py-1 rounded-full text-sm ${
              Number(lvl) > 0 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
            }`}>
              {Number(lvl) > 0 ? `${translateText('fractions', 'Розыск')}: ${lvl}⭐` : translateText('fractions', 'Не разыскивается')}
            </div>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1c1c1e] p-4 rounded-xl">
                <div className="text-sm text-white/50 mb-1">{translateText('fractions', 'Номер телефона')}</div>
                <div className="font-medium">{phonenumber || 'N/A'}</div>
              </div>
              
              <div className="bg-[#1c1c1e] p-4 rounded-xl">
                <div className="text-sm text-white/50 mb-1">{translateText('fractions', 'Фракция')}</div>
                <div className="font-medium">{fraction_name || translateText('fractions', 'Гражданский')}</div>
              </div>
              
              <div className="bg-[#1c1c1e] p-4 rounded-xl">
                <div className="text-sm text-white/50 mb-1">{translateText('fractions', 'Пол')}</div>
                <div className="font-medium">{gender || 'N/A'}</div>
              </div>
              
              <div className="bg-[#1c1c1e] p-4 rounded-xl">
                <div className="text-sm text-white/50 mb-1">{translateText('fractions', 'Дом')}</div>
                <div className="font-medium">{houseInfo || translateText('fractions', 'Отсутствует')}</div>
              </div>
            </div>
            
            <div className="mt-4 bg-[#1c1c1e] p-4 rounded-xl">
              <div className="text-sm text-white/50 mb-2">{translateText('fractions', 'Лицензии')}</div>
              <div className="flex flex-wrap gap-2">
                {lic ? lic.split(', ').map((license, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                    {license}
                  </span>
                )) : (
                  <span className="text-white/50">{translateText('fractions', 'Отсутствуют')}</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex p-4 border-t border-[#38383a]">
            <button className="bg-blue-600 text-white font-medium py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors mr-3">
              {translateText('fractions', 'История нарушений')}
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

export default OpenPersone;