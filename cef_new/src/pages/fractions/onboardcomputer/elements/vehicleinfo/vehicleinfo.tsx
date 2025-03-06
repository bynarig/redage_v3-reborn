import React from 'react';
import { translateText } from '#/shared/locale';
import { ENVIRONMENT } from '#/env';

interface VehicleInfoProps {
  onBack?: () => void;
}

interface VehicleFine {
  date: string;
  officerName: string;
  criminalCode?: string;
  trafficCode?: string;
  amount: string;
}

// Mock data for development
const mockVehicle = {
  model: "Lambo 770",
  licensePlate: "LV33223SA",
  status: "Нет нарушений",
  owner: "Vitaliy Zdobich"
};

const mockFines: VehicleFine[] = [
  {
    date: "12.05.20 15:56",
    officerName: "Vitaliy Zdobich",
    criminalCode: "23,1",
    trafficCode: "23,1",
    amount: "5000$"
  }
];

const VehicleInfo: React.FC<VehicleInfoProps> = ({ onBack = () => {} }) => {
  // In development mode, use mock data
  const vehicle = ENVIRONMENT === 'development' ? mockVehicle : undefined;
  const fines = ENVIRONMENT === 'development' ? mockFines : [];

  const handleDeclareWanted = () => {
    console.log('Declaring vehicle wanted:', vehicle?.licensePlate);
    // In a real app, we would call the native client here
  };

  const handleViewOwnerProfile = () => {
    console.log('Viewing owner profile:', vehicle?.owner);
    // In a real app, we would call the native client here
  };

  if (!vehicle) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <>
      <div 
        className="text-primary hover:underline cursor-pointer flex items-center"
        onClick={onBack}
      >
        &#x2190; {translateText('fractions', 'Вернуться в поиск')}
      </div>
      
      <div className="flex justify-between items-center mt-5">
        <div className="text-2xl font-bold">{vehicle.model}</div>
        <div className="flex">
          <button 
            className="btn btn-primary"
            onClick={handleDeclareWanted}
          >
            {translateText('fractions', 'Объявить ТС в розыск')}
          </button>
        </div>
      </div>
      
      <div className="flex justify-between my-10">
        <div className="w-48 h-48 bg-base-300 rounded-lg"></div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 flex-1 ml-6">
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">{translateText('fractions', 'Модель')}:</div>
            <div className="font-medium">{vehicle.model}</div>
          </div>
          
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">{translateText('fractions', 'Номер')}:</div>
            <div className="font-medium">{vehicle.licensePlate}</div>
          </div>
          
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">{translateText('fractions', 'Статус')}:</div>
            <div className="font-medium">{vehicle.status}</div>
          </div>
          
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">{translateText('fractions', 'Владелец')}:</div>
            <div className="flex items-center">
              <div className="font-medium mr-4">{vehicle.owner}</div>
              <div 
                className="text-primary hover:underline cursor-pointer"
                onClick={handleViewOwnerProfile}
              >
                {translateText('fractions', 'Изучить досье')} &gt;
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-xl font-medium mb-4 mt-9">
        {translateText('fractions', 'Список штрафов')}
      </div>
      
      <div className="grid grid-cols-12 gap-2 bg-base-200 p-3 rounded-t-lg text-sm font-medium">
        <div className="col-span-3">{translateText('fractions', 'Дата')}:</div>
        <div className="col-span-3">{translateText('fractions', 'Сотрудник')}:</div>
        <div className="col-span-3">{translateText('fractions', 'Статьи')}:</div>
        <div className="col-span-3">{translateText('fractions', 'Сумма штрафа')}:</div>
      </div>
      
      <div className="bg-base-100 rounded-b-lg">
        {fines.map((fine, index) => (
          <div 
            key={index} 
            className={`grid grid-cols-12 gap-2 p-3 ${
              index !== fines.length - 1 ? 'border-b border-base-200' : ''
            }`}
          >
            <div className="col-span-3 text-sm">{fine.date}</div>
            <div className="col-span-3 text-sm">{fine.officerName}</div>
            <div className="col-span-3 text-sm">
              {fine.criminalCode && (
                <><span className="text-base-content/60">УК:</span> {fine.criminalCode} </>
              )}
              {fine.trafficCode && (
                <><span className="text-base-content/60">ТК:</span> {fine.trafficCode}</>
              )}
            </div>
            <div className="col-span-3 text-sm hover:underline cursor-pointer">{fine.amount}</div>
          </div>
        ))}
        
        {fines.length === 0 && (
          <div className="text-center py-4 text-base-content/60">
            {translateText('fractions', 'Штрафов не найдено')}
          </div>
        )}
      </div>
    </>
  );
};

export default VehicleInfo;