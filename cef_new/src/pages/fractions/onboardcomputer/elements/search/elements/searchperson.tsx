import React, { useState, useEffect } from 'react';
import { translateText } from '#/shared/locale';
import { ENVIRONMENT } from '#/env';

interface RecentArrest {
  id: number;
  name: string;
  criminalCode?: string;
  adminCode?: string;
}

interface SearchResult {
  name: string;
  passport: string;
  phoneNumber: string;
  isWanted: boolean;
}

// Mock data for development
const mockRecentArrests: RecentArrest[] = Array(4).fill(null).map(() => ({
  id: 43332,
  name: "Vitaliy Zdobich",
  criminalCode: "12.6, 13.4",
  adminCode: "12.6, 13.4",
}));

const mockSearchResults: SearchResult[] = Array(20).fill(null).map(() => ({
  name: "Vitaliy Zdobich",
  passport: "1233332",
  phoneNumber: "144232321",
  isWanted: true,
}));

const SearchPerson: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  
  // Keyboard event handler for Enter key
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
      // In a real app, we would call the API to search here
      console.log("Search submitted:", inputValue);
    }
  };
  
  // Set up event listener for key presses
  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [inputValue]);
  
  // Use mock data in development mode
  const recentArrests = ENVIRONMENT === 'development' ? mockRecentArrests : [];
  const searchResults = ENVIRONMENT === 'development' ? mockSearchResults : [];
  
  return (
    <div>
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <i className="bortovoiicon-loop"></i>
        </div>
        <input 
          placeholder={translateText('fractions', 'Введите ключевые слова')}
          className="input input-bordered w-full pl-10"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          maxLength={50}
        />
      </div>
      
      {inputValue.length === 0 ? (
        <>
          <div className="text-base-content/80 mb-6">
            {translateText('fractions', 'Введите имя и фамилию гражданина, его номер паспорта или номер телефона для просмотра дополнительной информации о нем.')}
          </div>
          
          <div className="flex items-center mb-2">
            <i className="bortovoiicon-info mr-2"></i>
            <div className="font-bold">
              {translateText('fractions', 'Помощь по работе с Бортовым Компьютером')}
            </div>
          </div>
          
          <div className="bg-base-200 p-4 rounded-lg mb-8">
            {translateText('fractions', 'Для оформления Data Base введите в поиск информацию о задержанном. Если хотите объявить гражданина или Т/С в розыск, то воспользуйтесь кнопкой "Объявить в розыск" и заполните информацию.')}
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="text-xl font-medium">
              {translateText('fractions', 'Список последних задержанных')}:
            </div>
            <div className="text-lg text-primary cursor-pointer hover:underline">
              {translateText('fractions', 'Перейти в Датабейз')} &gt;
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5">
            {recentArrests.map((arrest, index) => (
              <div key={index} className="bg-base-200 p-4 rounded-lg">
                <div className="h-24 bg-base-300 rounded-lg mb-2"></div>
                <div className="text-sm text-base-content/70">
                  {translateText('fractions', 'Досье')} №{arrest.id}
                </div>
                <div className="font-medium text-lg mb-1">{arrest.name}</div>
                <div className="text-xs">
                  УК <span className="text-white">{arrest.criminalCode}</span> АК <span className="text-white">{arrest.adminCode}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mb-4">
            {translateText('fractions', 'По запросу')} "{inputValue}" {translateText('fractions', 'найдено')}:
          </div>
          
          <div className="grid grid-cols-12 gap-2 bg-base-200 p-3 rounded-t-lg text-sm font-medium">
            <div className="col-span-3">{translateText('fractions', 'Имя')}:</div>
            <div className="col-span-2">{translateText('fractions', 'Паспорт')}:</div>
            <div className="col-span-3">{translateText('fractions', 'Номер телефона')}:</div>
            <div className="col-span-2">{translateText('fractions', 'Статус')}:</div>
            <div className="col-span-2"></div>
          </div>
          
          <div className="bg-base-100 rounded-b-lg overflow-y-auto max-h-[500px]">
            {searchResults.map((result, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-12 gap-2 p-3 ${
                  index !== searchResults.length - 1 ? 'border-b border-base-200' : ''
                }`}
              >
                <div className="col-span-3">{result.name}</div>
                <div className="col-span-2">{result.passport}</div>
                <div className="col-span-3">{result.phoneNumber}</div>
                <div className={`col-span-2 ${result.isWanted ? 'text-error font-medium' : 'text-success font-medium'}`}>
                  {result.isWanted 
                    ? translateText('fractions', 'В розыске') 
                    : translateText('fractions', 'Не в розыске')
                  }
                </div>
                <div className="col-span-2 text-primary hover:underline cursor-pointer">
                  {translateText('fractions', 'Инфо')} &gt;
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPerson;