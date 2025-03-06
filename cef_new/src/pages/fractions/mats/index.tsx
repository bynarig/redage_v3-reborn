import React, { useState, useEffect } from 'react';
import { translateText } from '#/shared/locale';
import { executeClient } from '#/shared/api/rage';
import { ENVIRONMENT } from '#/env';

interface MatsProps {
  viewData?: {
    isArmy?: boolean;
    isMed?: boolean;
  }
}

// Mock data for development mode
const mockViewData = {
  isArmy: false,
  isMed: true
};

const FractionMats: React.FC<MatsProps> = ({ viewData = {} }) => {
  const [isArmy, setIsArmy] = useState<boolean>(false);
  const [isMed, setIsMed] = useState<boolean>(false);

  // Initialize state from props
  useEffect(() => {
    // Use mock data in development mode
    if (ENVIRONMENT === 'development') {
      console.log("DEV MODE: Using mock mats data");
      setIsArmy(mockViewData.isArmy);
      setIsMed(mockViewData.isMed);
    } else {
      // Production mode - use real data
      if (viewData) {
        setIsArmy(!!viewData.isArmy);
        setIsMed(!!viewData.isMed);
      }
    }
  }, [viewData]);

  // Event handlers
  const load = (id: number) => {
    executeClient('matsL', id);
  };

  const unload = (id: number) => {
    executeClient('matsU', id);
  };

  const cancel = () => {
    executeClient('matsU', 0);
  };

  // Keyboard event handler
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 27) { // ESC key
      executeClient('matsU', 0);
    }
  };

  // Setup event listener for ESC key
  useEffect(() => {
    window.addEventListener('keyup', handleKeyDown);
    return () => {
      window.removeEventListener('keyup', handleKeyDown);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-base-100/80">
      <div className="container mx-auto max-w-4xl bg-base-200 rounded-lg shadow-lg p-4">
        {isMed ? (
          <div className="bg-base-100 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <div className="bg-primary/20 p-4 rounded-lg mr-4">
                <div className="w-16 h-16 bg-medic bg-center bg-no-repeat bg-contain"></div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">{translateText('fractions', 'Аптечки')}</h2>
                <div className="mb-4">
                  <p className="mb-2">{translateText('fractions', 'Используются для оказания первой медицинской помощи тяжело раненому человеку')}.</p>
                  <p className="text-sm opacity-75">
                    <span className="text-success font-medium">{translateText('fractions', 'Виды получения')}: </span> 
                    {translateText('fractions', 'Загрузка аптечек каретами EMS в лаборатории Humane Labs')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="btn btn-success" 
                    onClick={() => load(4)}
                  >
                    {translateText('fractions', 'Загрузить')}
                  </button>
                  <button 
                    className="btn btn-error" 
                    onClick={() => unload(4)}
                  >
                    {translateText('fractions', 'Выгрузить')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          isArmy ? (
            <div className="bg-base-100 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <div className="bg-primary/20 p-4 rounded-lg mr-4">
                  <div className="w-16 h-16 bg-army bg-center bg-no-repeat bg-contain"></div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">{translateText('fractions', 'Материалы')}</h2>
                  <div className="mb-4">
                    <p className="mb-1">{translateText('fractions', 'Используются для создания оружия, патронов, брони')}.</p>
                    <p className="text-sm opacity-75">
                      <span className="text-success font-medium">{translateText('fractions', 'Виды получения')}: </span> 
                      {translateText('fractions', 'Поставки происходят из порта Лос Сантоса')}.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="btn btn-success" 
                      onClick={() => load(1)}
                    >
                      {translateText('fractions', 'Загрузить')}
                    </button>
                    <button 
                      className="btn btn-error" 
                      onClick={() => unload(1)}
                    >
                      {translateText('fractions', 'Выгрузить')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-base-100 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <div className="bg-primary/20 p-4 rounded-lg mr-4">
                    <div className="w-16 h-16 bg-materials bg-center bg-no-repeat bg-contain"></div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2">{translateText('fractions', 'Материалы')}</h2>
                    <div className="mb-4">
                      <p className="mb-1">{translateText('fractions', 'Используются для создания оружия и патронов')}.</p>
                      <p className="text-sm opacity-75">
                        <span className="text-success font-medium">{translateText('fractions', 'Виды получения')}: </span> 
                        {translateText('fractions', 'Угон Barracks с Форта-Занкудо')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-success" 
                        onClick={() => load(2)}
                      >
                        {translateText('fractions', 'Загрузить')}
                      </button>
                      <button 
                        className="btn btn-error" 
                        onClick={() => unload(2)}
                      >
                        {translateText('fractions', 'Выгрузить')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-base-100 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="bg-primary/20 p-4 rounded-lg mr-4">
                    <div className="w-16 h-16 bg-drugs bg-center bg-no-repeat bg-contain"></div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2">{translateText('fractions', 'Наркотики')}</h2>
                    <div className="mb-4">
                      <p className="mb-1">{translateText('fractions', 'Используются для пополнения здоровья с побочным эффектом')}.</p>
                      <p className="text-sm opacity-75">
                        <span className="text-success font-medium">{translateText('fractions', 'Виды получения')}: </span> 
                        {translateText('fractions', 'Покупаются бандами в особых точках')}.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-success" 
                        onClick={() => load(3)}
                      >
                        {translateText('fractions', 'Загрузить')}
                      </button>
                      <button 
                        className="btn btn-error" 
                        onClick={() => unload(3)}
                      >
                        {translateText('fractions', 'Выгрузить')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        )}
        
        <div className="mt-6 flex justify-center">
          <button 
            className="btn btn-neutral" 
            onClick={cancel}
          >
            {translateText('fractions', 'Отмена')} (ESC)
          </button>
        </div>
      </div>
    </div>
  );
};

export default FractionMats;