import React, { useEffect, useState } from 'react';
import { translateText } from '#/shared/locale';
import { useSelector } from 'react-redux';
import { format } from '#/shared/api/formatter';
import { executeClient } from '#/shared/api/rage';
import { selectCharMoney, selectCharVip, selectCharLVL } from '#/shared/store/chars';
import { ENVIRONMENT } from '#/env';
import { mockAirVehicles } from '#/shared/data/mock/shops/air';

// Import shared UI components
import Button from '#/shared/ui/Button';
import Badge from '#/shared/ui/Badge';
import Modal from '#/shared/ui/Modal';
import Input from '#/shared/ui/Input';
import VehicleGrid from '#/shared/ui/VehicleGrid';
import EmptyState from '#/shared/ui/EmptyState';
import PageContainer from '#/shared/ui/PageContainer';

interface VehicleItem {
  Model: string;
  Number: string;
  Price: number;
  IsSpawn: boolean;
}

interface AirPageProps {
  viewData?: string;
}

const AirPage: React.FC<AirPageProps> = ({ viewData = '[]' }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use mock data in development, real data in production
  const useDevMockData = ENVIRONMENT === 'development';
  const allVehicles: VehicleItem[] = useDevMockData ? mockAirVehicles : JSON.parse(viewData);
  
  // Filter vehicles based on search query
  const vehicles = allVehicles.filter(vehicle => 
    vehicle.Model.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const charMoney = useSelector(selectCharMoney);
  const charVip = useSelector(selectCharVip);
  const charLVL = useSelector(selectCharLVL);

  const handleAction = (number: string, action: string) => {
    executeClient("client.vehicle.action", number, action);
    handleExit();
  };

  const handleExit = () => {
    executeClient('client.vehicleair.exit');
  };

  // Handle ESC key
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (selectedVehicle) {
          setSelectedVehicle(null);
        } else {
          handleExit();
        }
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [selectedVehicle]);

  return (
    <PageContainer
      title={translateText('vehicle', 'Воздушный транспорт')}
      onClose={handleExit}
    >
      <div className="mb-6">
        <Input
          placeholder={translateText('general', 'Поиск техники...')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startIcon={<i className="fas fa-search"></i>}
          endIcon={
            searchQuery ? (
              <button 
                className="btn btn-ghost btn-circle btn-sm" 
                onClick={() => setSearchQuery('')}
              >
                <i className="fas fa-times"></i>
              </button>
            ) : undefined
          }
          fullWidth
        />
      </div>

      {vehicles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {vehicles.map((vehicle) => (
            <div 
              key={vehicle.Number}
              className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <figure>
                <img 
                  src="https://www.piesandtacos.com/wp-content/uploads/2021/03/spring-macarons-500x500.jpg"
                  alt={vehicle.Model}
                  className="h-40 w-full object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <div className="flex justify-between items-center">
                  <h3 className="card-title text-base">{vehicle.Model}</h3>
                  {vehicle.IsSpawn && (
                    <Badge color="success">
                      {translateText('vehicle', 'Вызван')}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-5xl opacity-20 mb-4">
            <i className="fas fa-search"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">
            {translateText('vehicle', 'Техника не найдена')}
          </h3>
          <p className="text-base-content opacity-60">
            {translateText('vehicle', 'Попробуйте изменить параметры поиска')}
          </p>
        </div>
      )}

      <Modal
        isOpen={!!selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        title={selectedVehicle?.Model}
      >
        {selectedVehicle && (
          <div className="flex flex-col gap-4">
            <img 
              src="https://www.piesandtacos.com/wp-content/uploads/2021/03/spring-macarons-500x500.jpg"
              alt={selectedVehicle.Model}
              className="w-full rounded-lg"
            />
            
            <div className="grid grid-cols-1 gap-2">
              {!selectedVehicle.IsSpawn ? (
                <Button
                  color="primary"
                  fullWidth
                  onClick={() => handleAction(selectedVehicle.Number, "spawn")}
                >
                  {translateText('vehicle', 'Вызвать')}
                </Button>
              ) : (
                <Button
                  color="primary"
                  fullWidth
                  onClick={() => handleAction(selectedVehicle.Number, "tune")}
                >
                  {translateText('vehicle', 'Тюнинговать')}
                </Button>
              )}
              
              <Button
                color="secondary"
                fullWidth
                onClick={() => handleAction(selectedVehicle.Number, "sell")}
              >
                {translateText('vehicle', 'Продать')} - ${format("money", selectedVehicle.Price)}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </PageContainer>
  );
};

export default AirPage;