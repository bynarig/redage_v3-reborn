import React from 'react';
import { translateText } from '#/shared/locale';
import { ENVIRONMENT } from '#/env';

interface Vehicle {
  id: number;
  model: string;
  licensePlate: string;
  isWanted: boolean;
  location: string;
}

// Mock data for development
const mockVehicles: Vehicle[] = [
  {
    id: 1,
    model: "Bugatti Chiron",
    licensePlate: "LV2281337SA",
    isWanted: true,
    location: "Vinewood Hills"
  },
  {
    id: 2,
    model: "BMW M5",
    licensePlate: "LS4453FB",
    isWanted: false,
    location: "Rockford Hills"
  },
  {
    id: 3,
    model: "Tesla Model S",
    licensePlate: "SA9945CT",
    isWanted: true,
    location: "Downtown"
  }
];

interface VehiclesProps {
  vehicles?: Vehicle[];
}

const Vehicles: React.FC<VehiclesProps> = ({ vehicles = [] }) => {
  // Use mock data in development mode
  const vehiclesToShow = ENVIRONMENT === 'development' ? mockVehicles : vehicles;

  const handleShowInGPS = (vehicle: Vehicle) => {
    console.log(`Setting GPS for vehicle ${vehicle.licensePlate}`);
    // In a real app, we would call the native client here to set GPS
  };
  
  return (
    <div className="space-y-1">
      {/* Header row */}
      <div className="grid grid-cols-12 gap-2 bg-base-200 p-3 rounded-t-lg font-medium text-base-content/80">
        <div className="col-span-3">{translateText('fractions', 'Статус')}:</div>
        <div className="col-span-3">{translateText('fractions', 'Модель')}:</div>
        <div className="col-span-3">{translateText('fractions', 'Номер машины')}:</div>
        <div className="col-span-3">{translateText('fractions', 'Местоположение')}:</div>
      </div>
      
      {/* Data rows */}
      <div className="bg-base-100 rounded-b-lg">
        {vehiclesToShow.map((vehicle, index) => (
          <div 
            key={index} 
            className={`grid grid-cols-12 gap-2 p-3 ${
              index !== vehiclesToShow.length - 1 ? 'border-b border-base-200' : ''
            }`}
          >
            <div className="col-span-3 text-sm">
              {vehicle.isWanted ? (
                <span className="text-error font-medium">
                  {translateText('fractions', 'В розыске')}
                </span>
              ) : (
                <span className="text-success font-medium">
                  {translateText('fractions', 'Чистый')}
                </span>
              )}
            </div>
            <div className="col-span-3 text-sm">{vehicle.model}</div>
            <div className="col-span-3 text-sm">{vehicle.licensePlate}</div>
            <div 
              className="col-span-3 text-sm text-primary hover:underline cursor-pointer"
              onClick={() => handleShowInGPS(vehicle)}
            >
              {translateText('fractions', 'Указать в')} GPS
            </div>
          </div>
        ))}
        
        {vehiclesToShow.length === 0 && (
          <div className="text-center py-4 text-base-content/60">
            {translateText('fractions', 'Нет транспортных средств')}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vehicles;