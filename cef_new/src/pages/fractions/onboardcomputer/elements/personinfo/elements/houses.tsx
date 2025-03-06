import React from 'react';
import { translateText } from '#/shared/locale';
import { ENVIRONMENT } from '#/env';

interface House {
  id: number;
  garageSpaces: number;
  owner: string;
  class: string;
  location: string;
}

// Mock data for development
const mockHouses: House[] = [
  {
    id: 228,
    garageSpaces: 24,
    owner: "Vitaliy Zdobich",
    class: "Люкс +",
    location: "Vinewood Hills"
  },
  {
    id: 342,
    garageSpaces: 16,
    owner: "Vitaliy Zdobich",
    class: "Премиум",
    location: "Rockford Hills"
  }
];

interface HousesProps {
  houses?: House[];
}

const Houses: React.FC<HousesProps> = ({ houses = [] }) => {
  // Use mock data in development mode
  const housesToShow = ENVIRONMENT === 'development' ? mockHouses : houses;

  const handleShowInGPS = (houseId: number) => {
    console.log(`Setting GPS for house #${houseId}`);
    // In a real app, we would call the native client here to set GPS
  };
  
  return (
    <div className="space-y-1">
      {/* Header row */}
      <div className="grid grid-cols-12 gap-2 bg-base-200 p-3 rounded-t-lg font-medium text-base-content/80">
        <div className="col-span-2">{translateText('fractions', 'Номер дома')}:</div>
        <div className="col-span-2">{translateText('fractions', 'Гараж')}:</div>
        <div className="col-span-3">{translateText('fractions', 'Владелец')}:</div>
        <div className="col-span-2">{translateText('fractions', 'Класс')}:</div>
        <div className="col-span-3">{translateText('fractions', 'Местоположение')}:</div>
      </div>
      
      {/* Data rows */}
      <div className="bg-base-100 rounded-b-lg">
        {housesToShow.map((house, index) => (
          <div 
            key={index} 
            className={`grid grid-cols-12 gap-2 p-3 ${
              index !== housesToShow.length - 1 ? 'border-b border-base-200' : ''
            }`}
          >
            <div className="col-span-2 text-sm">№ {house.id}</div>
            <div className="col-span-2 text-sm">{house.garageSpaces} {translateText('fractions', 'места')}</div>
            <div className="col-span-3 text-sm">{house.owner}</div>
            <div className="col-span-2 text-sm">{house.class}</div>
            <div 
              className="col-span-3 text-sm text-primary hover:underline cursor-pointer"
              onClick={() => handleShowInGPS(house.id)}
            >
              {translateText('fractions', 'Указать в GPS')}
            </div>
          </div>
        ))}
        
        {housesToShow.length === 0 && (
          <div className="text-center py-4 text-base-content/60">
            {translateText('fractions', 'Нет домов в собственности')}
          </div>
        )}
      </div>
    </div>
  );
};

export default Houses;