import React, { useState, useEffect } from 'react';
import { translateText } from '#/shared/locale';
import { executeClient } from '#/shared/api/rage';
import { useSelector } from 'react-redux';
import { RootState } from '#/shared/store';

// Import styles
// import 'daisyui/dist/full.css'; // Make sure to install daisyui package

interface VehicleData {
  number: string;
  model: string;
  holder: string;
}

interface TicketProps {
  viewData?: string | VehicleData;
}

const Ticket: React.FC<TicketProps> = ({ viewData }) => {
  // Process and initialize viewData
  const [vehicleData, setVehicleData] = useState<VehicleData>({
    number: "228XUI",
    model: "Bugatti",
    holder: "Vitaliy_Zdobich"
  });

  // Get router state from Redux
  const router = useSelector((state: RootState) => state.router);
  const isInput = useSelector((state: RootState) => state.isInput);
  
  // Component state
  const [ticketText, setTicketText] = useState<string>('');
  const [ticketPrice, setTicketPrice] = useState<string>('');
  const [isEvac, setIsEvac] = useState<boolean>(false);
  const [cameraMode, setCameraMode] = useState<boolean>(false);
  const [cameraLink, setCameraLink] = useState<string | boolean>(false);
  
  // Parse viewData if needed
  useEffect(() => {
    if (viewData) {
      if (typeof viewData === 'string') {
        setVehicleData(JSON.parse(viewData));
      } else {
        setVehicleData(viewData);
      }
    }
  }, [viewData]);
  
  // Set up key event listeners
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (!router.opacity) return;
      if (isInput) return;
      
      const isCamera = router.popup === "PopupCamera";
      
      if (event.keyCode === 27 && !isCamera) {
        handleExit();
      }
      
      if (event.keyCode === 89 && !isCamera) {
        handleCameraToggle();
      }
      
      if (event.keyCode === 13 && !isCamera) {
        handleSubmitTicket();
      }
    };
    
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [router, isInput, ticketText, ticketPrice, cameraLink]);
  
  const handleSubmitTicket = () => {
    const price = Number(ticketPrice);
    if (typeof price !== "number" || price < 100 || price > 500) {
      return window.notificationAdd(4, 9, translateText('fractions', 'Вы указали неверное значение. Нужна сумма от 100$ до 500$'), 5000);
    }
    if (typeof ticketText !== "string" || ticketText.length < 1 || ticketText.length >= 45) {
      return window.notificationAdd(4, 9, translateText('fractions', 'Вы ошиблись в описании нарушения. Минимум 1 символ, максимум 45 символов.'), 3000);
    }
    if (typeof cameraLink !== "string" || !cameraLink) {
      return window.notificationAdd(4, 9, translateText('fractions', 'Вы не сделали фотографию'), 3000);
    }
    
    executeClient("client.ticket.end", ticketText, price, cameraLink, isEvac);
    handleExit();
  };
  
  const handleCameraToggle = () => {
    if (cameraLink === true) {
      return window.notificationAdd(4, 9, translateText('fractions', 'Фотография загружается'), 3000);
    }
    
    executeClient("camera.open", false);
  };
  
  const handleExit = () => {
    executeClient("client.ticket.close");
  };
  
  const updateCameraLink = (link: string) => {
    setCameraLink(link);
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80">
      <div className="card w-full max-w-lg bg-gray-900 shadow-2xl border border-gray-800">
        {/* Header */}
        <div className="card-body p-0">
          <div className="bg-blue-900 text-white p-4 rounded-t-xl flex justify-between items-center border-b border-blue-800">
            <h2 className="card-title font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {translateText('fractions', 'Оформление штрафа')}
            </h2>
            <div className="badge bg-yellow-500 text-black font-mono text-md px-3 py-2">
              {vehicleData.number}
            </div>
          </div>
          
          {/* Vehicle Info */}
          <div className="p-4 border-b border-gray-800">
            <h3 className="font-bold text-gray-300 mb-3">
              {translateText('fractions', 'Информация')}
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-sm text-gray-400">
                  {translateText('fractions', 'Владелец')}:
                </div>
                <div className="font-medium text-white">{vehicleData.holder}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-400">
                  {translateText('fractions', 'Модель машины')}:
                </div>
                <div className="font-medium text-white">{vehicleData.model}</div>
              </div>
            </div>
          </div>
          
          {/* Ticket Details Form */}
          <div className="p-4 space-y-4">
            {/* Violation Description */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-300 font-medium">
                  {translateText('fractions', 'Нарушение')}
                </span>
              </label>
              <input 
                type="text" 
                value={ticketText}
                onChange={(e) => setTicketText(e.target.value)}
                placeholder={translateText('fractions', 'Описание нарушения')}
                className="input bg-gray-800 border-gray-700 text-white w-full focus:border-blue-500 placeholder-gray-500" 
                maxLength={45}
              />
            </div>
            
            {/* Ticket Amount */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-300 font-medium">
                  {translateText('fractions', 'Сумма штрафа')}
                </span>
              </label>
              <input 
                type="number" 
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
                placeholder={translateText('fractions', 'Введите сумму от 100 до 500$')}
                className="input bg-gray-800 border-gray-700 text-white w-full focus:border-blue-500 placeholder-gray-500" 
                min={100}
                max={500}
              />
            </div>
            
            {/* Tow Option */}
            <div className="form-control">
              <label className="cursor-pointer label justify-start gap-4">
                <input 
                  type="checkbox" 
                  className="toggle bg-gray-700 border-gray-600" 
                  checked={isEvac} 
                  onChange={() => setIsEvac(!isEvac)}
                />
                <span className="label-text text-gray-300">
                  {translateText('fractions', 'Поместить на эвакуатор')}
                </span> 
              </label>
            </div>
            
            {/* Photo Section */}
            <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/50">
              <div className="bg-gray-800 p-3 border-b border-gray-700">
                <span className="font-medium text-gray-300">
                  {translateText('fractions', 'Фотография нарушения')}
                </span>
              </div>
              
              <div className="p-4">
                {cameraLink && typeof cameraLink === "string" ? (
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-20 h-20 bg-cover bg-center rounded-md border border-gray-700"
                      style={{ backgroundImage: `url(${cameraLink})` }}
                    />
                    <div>
                      <div className="font-medium text-white">
                        {translateText('fractions', 'Фотография')}
                      </div>
                      <div className="text-sm text-gray-400">
                        {translateText('fractions', 'Нарушение зафиксировано')}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <button 
                      className="w-20 h-20 bg-gray-700 flex items-center justify-center rounded-md border border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors"
                      onClick={handleCameraToggle}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    <div>
                      <div className="font-medium text-white">
                        {translateText('fractions', 'Фотография')}
                      </div>
                      <div className="text-sm text-gray-400">
                        {cameraLink === true ? 
                          translateText('fractions', 'Фотография загружается') : 
                          translateText('fractions', 'Нет фотографии')
                        }
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="p-4 bg-gray-800 rounded-b-xl space-y-3 border-t border-gray-700">
            <div className="flex gap-2">
              <button 
                onClick={handleCameraToggle}
                className="btn bg-blue-900 hover:bg-blue-800 text-white border-blue-800 flex-1"
              >
                <div className="flex items-center">
                  <div className="bg-blue-700 text-blue-200 text-xs rounded px-1.5 py-0.5 mr-2">Y</div>
                  {translateText('fractions', 'Сделать фотографию')}
                </div>
              </button>
              
              <button 
                onClick={handleSubmitTicket}
                className="btn bg-green-900 hover:bg-green-800 text-white border-green-800 flex-1"
              >
                <div className="flex items-center">
                  <div className="bg-green-700 text-green-200 text-xs rounded px-1.5 py-0.5 mr-2">ENTER</div>
                  {translateText('fractions', 'Выписать штраф')}
                </div>
              </button>
            </div>
            
            <button 
              onClick={handleExit}
              className="btn bg-gray-900 hover:bg-gray-800 text-white border-gray-700 w-full"
            >
              <div className="flex items-center w-full">
                <span className="flex-grow text-left">
                  {translateText('fractions', 'Выйти')}
                </span>
                <div className="bg-red-900 text-red-200 text-xs rounded px-1.5 py-0.5">ESC</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add TypeScript definitions for global methods
declare global {
  interface Window {
    notificationAdd: (type: number, id: number, text: string, timeout: number) => void;
  }
}

export default Ticket;