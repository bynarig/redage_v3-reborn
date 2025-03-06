import React, { useState } from 'react';
import { translateText } from '#/shared/locale';
import { executeClient } from '#/shared/api/rage';

interface ClearWantedProps {
  // You can add any props needed from parent component
}

const ClearWanted: React.FC<ClearWantedProps> = () => {
  const [value, setValue] = useState<string>('');

  const handleClearWanted = () => {
    executeClient('client:pcMenuInput', 'clearWantedLvl', value);
  };

  return (
    <div className="text-white">
      <h1 className="text-xl font-bold text-white mb-6">
        {translateText('fractions', 'Снять с розыска')}
      </h1>
      
      <div className="bg-[#2c2c2e] rounded-xl p-6">
        <p className="border-none mb-4 text-white/70">
          {translateText('fractions', 'Введите ID или имя гражданина, с которого нужно снять розыск')}
        </p>
        
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={30}
          placeholder={translateText('fractions', 'Паспорт/Имя_Фамилия')}
          className="p-3 bg-[#1c1c1e] border border-[#38383a] text-white rounded-xl w-full mb-6 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   placeholder:text-white/50"
        />
        
        <button 
          className="bg-blue-600 text-white font-medium py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
          onClick={handleClearWanted}
        >
          {translateText('fractions', 'Очистить розыск')}
        </button>
      </div>
      
      <div className="flex items-center mt-6 p-4 bg-yellow-600/20 rounded-xl">
        <span className="text-xl mr-3">⚠️</span>
        <span className="text-yellow-400 text-sm">
          {translateText('fractions', 'Внимание! Это действие будет зарегистрировано в системе.')}
        </span>
      </div>
    </div>
  );
};

export default ClearWanted;