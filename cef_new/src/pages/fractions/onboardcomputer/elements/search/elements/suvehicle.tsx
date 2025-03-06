import React, { useState } from 'react';
import { translateText } from '#/shared/locale';

const SuVehicle: React.FC = () => {
  // State for form fields
  const [licensePlate, setLicensePlate] = useState<string>('');
  const [trafficCode, setTrafficCode] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  
  // Hard-coded owner data (in real app, this would come from an API based on license plate)
  const vehicleOwner = "Vitaliy_Zdobich";
  const vehicleModel = "Lambo112";

  // Handle form submission
  const handleSubmit = () => {
    console.log('Declaring vehicle wanted', {
      licensePlate,
      trafficCode,
      description
    });
    // In a real app, we would call the native client here
  };

  // Handle photo capture
  const handleTakePhoto = () => {
    console.log('Taking photo of vehicle');
    // In a real app, we would call the native client here
  };

  return (
    <div className="space-y-4">
      <div className="text-xl font-bold mt-5">
        {translateText('fractions', 'Розыск транспортного средства')}
      </div>
      
      <div>
        <label className="block text-base-content/70 text-sm mb-2">
          {translateText('fractions', 'Номер машины')}:
        </label>
        <input 
          placeholder="Введите номер"
          className="input input-bordered w-full max-w-xs"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
        />
      </div>
      
      <div className="flex justify-between items-center mt-12 mb-4">
        <div className="flex">
          {translateText('fractions', 'Владелец')}:{' '}
          <span className="font-medium ml-1 mr-2">{vehicleOwner}</span>
          <span className="text-primary hover:underline cursor-pointer">
            {translateText('fractions', 'Подробнее о владельце')} &gt;
          </span>
        </div>
        
        <div className="flex">
          {translateText('fractions', 'Модель')}:{' '}
          <span className="font-medium ml-1">{vehicleModel}</span>
        </div>
      </div>
      
      <div>
        <label className="block text-base-content/70 text-sm mb-2">
          {translateText('fractions', 'Статьи ДК')}:
        </label>
        <input 
          placeholder="Введите статьи"
          className="input input-bordered w-full max-w-xs"
          value={trafficCode}
          onChange={(e) => setTrafficCode(e.target.value)}
        />
      </div>
      
      <div>
        <label className="block text-base-content/70 text-sm mb-2">
          {translateText('fractions', 'Описание произошедшего')}:
        </label>
        <textarea 
          placeholder="Описание.."
          className="textarea textarea-bordered w-full h-32"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      
      <div className="flex mt-10">
        <button 
          className="btn btn-primary mr-4"
          onClick={handleSubmit}
        >
          {translateText('fractions', 'Объявить в розыск')}
        </button>
        
        <button 
          className="btn btn-secondary"
          onClick={handleTakePhoto}
        >
          {translateText('fractions', 'Сделать фото')}
        </button>
      </div>
    </div>
  );
};

export default SuVehicle;