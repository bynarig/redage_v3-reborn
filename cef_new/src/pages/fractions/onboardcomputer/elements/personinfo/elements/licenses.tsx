import React from 'react';
import { translateText } from '#/shared/locale';
import { ENVIRONMENT } from '#/env';

interface LicensesProps {
  licenses?: {
    motorcycle?: boolean;
    car?: boolean;
    truck?: boolean;
    boat?: boolean;
    helicopter?: boolean;
    drone?: boolean;
    gun?: boolean;
    medical?: boolean;
    health?: boolean;
  };
}

// Mock data for development
const mockLicenses = {
  motorcycle: true,
  car: true,
  truck: false,
  boat: true,
  helicopter: false,
  drone: false,
  gun: false,
  medical: true,
  health: true
};

const Licenses: React.FC<LicensesProps> = ({ licenses = {} }) => {
  // Use mock data in development mode
  const licensesToShow = ENVIRONMENT === 'development' ? mockLicenses : licenses;

  // Helper function to render a license with the appropriate styling
  const renderLicense = (type: string, active: boolean, label: string) => (
    <div className="flex flex-col items-center">
      <div 
        className={`w-16 h-16 rounded-lg flex items-center justify-center mb-2 ${
          active 
            ? 'bg-primary/20 border-2 border-primary' 
            : 'bg-base-200 border-2 border-base-300'
        }`}
      >
        <div className={`w-10 h-10 ${type} bg-contain bg-center bg-no-repeat`}></div>
      </div>
      <div className="text-xs text-center">
        {label}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 p-4 bg-base-100 rounded-lg">
      {renderLicense(
        'bg-license-motorcycle', 
        !!licensesToShow.motorcycle, 
        translateText('fractions', 'Мотоцикл')
      )}
      {renderLicense(
        'bg-license-car', 
        !!licensesToShow.car, 
        translateText('fractions', 'Автомобиль')
      )}
      {renderLicense(
        'bg-license-truck', 
        !!licensesToShow.truck, 
        translateText('fractions', 'Грузовик')
      )}
      {renderLicense(
        'bg-license-boat', 
        !!licensesToShow.boat, 
        translateText('fractions', 'Лодка')
      )}
      {renderLicense(
        'bg-license-helicopter', 
        !!licensesToShow.helicopter, 
        translateText('fractions', 'Вертолет')
      )}
      {renderLicense(
        'bg-license-drone', 
        !!licensesToShow.drone, 
        translateText('fractions', 'Дрон')
      )}
      {renderLicense(
        'bg-license-gun', 
        !!licensesToShow.gun, 
        translateText('fractions', 'Оружие')
      )}
      {renderLicense(
        'bg-license-medical', 
        !!licensesToShow.medical, 
        translateText('fractions', 'Медицина')
      )}
      {renderLicense(
        'bg-license-health', 
        !!licensesToShow.health, 
        translateText('fractions', 'Здоровье')
      )}
    </div>
  );
};

export default Licenses;