import React, { useEffect, useState } from 'react';
import { translateText } from '#/shared/locale';
import { useSelector } from 'react-redux';
import { RootState } from '#/shared/store';
import { format } from '#/shared/api/formatter';
import { executeClient } from '#/shared/api/rage';
import { motion, AnimatePresence } from 'framer-motion';
import { selectCharMoney, selectCharVip, selectCharLVL } from '#/shared/store/chars';
import { ENVIRONMENT } from '#/env';
import { mockAirVehicles } from '#/shared/data/mock/shops/air';


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
  const [hourValue, setHourValue] = useState<number>(0);
  const [selectVehicle, setSelectVehicle] = useState<number>(-1);
  
  // Use mock data in development, real data in production
  const useDevMockData = ENVIRONMENT === 'development';
  const vehicleArray: VehicleItem[] = useDevMockData ? mockAirVehicles : JSON.parse(viewData);
  
  const charMoney = useSelector(selectCharMoney);
  const charVip = useSelector(selectCharVip);
  const charLVL = useSelector(selectCharLVL);

  const onAction = (number: string, func: string) => {
    executeClient("client.vehicle.action", number, func);
    onExit();
  };

  const onExit = () => {
    executeClient('client.vehicleair.exit');
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { keyCode } = event;
      if (keyCode !== 27) return;

      if (selectVehicle !== -1) setSelectVehicle(-1);
      else onExit();
    };

    window.addEventListener('keyup', handleKeyDown);
    return () => window.removeEventListener('keyup', handleKeyDown);
  }, [selectVehicle]);

  // The rest of your component remains the same...
  return (
    <div className="w-full h-full bg-base-100 bg-opacity-80" id="air-page">
      <div className={`p-4 ${selectVehicle !== -1 ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-primary">
              {translateText('vehicle', 'Покупка воздушного транспорта')}
            </h2>
            <p className="text-sm text-base-content">
              {translateText('vehicle', 'Приехали за своим личным воздушным транспортным средством? Как ни странно - вы по адресу! Если Вы владеете личным вертолетом или самолетом - вы можете заспавнить его тут.')}
            </p>
          </div>
          <button 
            onClick={onExit}
            className="btn btn-circle btn-ghost text-xl"
          >
            ×
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicleArray.map((item, index) => (
            <div key={index} className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title">{item.Model}</h3>
                {item.IsSpawn && <div className="badge badge-primary">Вызван</div>}
                <div 
                  className="h-40 bg-center bg-no-repeat bg-contain my-2" 
                  style={{backgroundImage: `url(${document.cloud}inventoryItems/vehicle/${item.Model.toLowerCase()}.png)`}}
                />
                <button 
                  className="btn btn-primary w-full" 
                  onClick={() => setSelectVehicle(index)}
                >
                  {translateText('vehicle', 'Действие')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The modal part remains unchanged */}
      <AnimatePresence>
        {selectVehicle !== -1 && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{translateText('vehicle', 'Действие')}</h2>
                <p>{vehicleArray[selectVehicle].Model}</p>
                
                <div 
                  className="h-40 bg-center bg-no-repeat bg-contain my-4" 
                  style={{backgroundImage: `url(${document.cloud}inventoryItems/vehicle/${vehicleArray[selectVehicle].Model.toLowerCase()}.png)`}}
                />
                
                {!vehicleArray[selectVehicle].IsSpawn ? (
                  <button 
                    className="btn btn-primary w-full mb-2"
                    onClick={() => onAction(vehicleArray[selectVehicle].Number, "spawn")}
                  >
                    {translateText('vehicle', 'Вызвать')}
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary w-full mb-2"
                    onClick={() => onAction(vehicleArray[selectVehicle].Number, "tune")}
                  >
                    {translateText('vehicle', 'Тюнинговать')}
                  </button>
                )}
                
                <button 
                  className="btn btn-secondary w-full mb-2"
                  onClick={() => onAction(vehicleArray[selectVehicle].Number, "sell")}
                >
                  <div className="flex flex-col items-center">
                    <span>{translateText('vehicle', 'Продать')}</span>
                    <span className="text-xs">${format("money", vehicleArray[selectVehicle].Price)}</span>
                  </div>
                </button>
                
                <button 
                  className="btn btn-ghost w-full"
                  onClick={() => setSelectVehicle(-1)}
                >
                  Закрыть
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AirPage;