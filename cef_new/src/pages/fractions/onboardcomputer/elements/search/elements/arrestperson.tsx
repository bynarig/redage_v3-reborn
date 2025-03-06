import React, { useState } from 'react';
import { translateText } from '#/shared/locale';

interface ArrestPersonProps {
  onBack?: () => void;
  person?: {
    firstName: string;
    lastName: string;
    passport: string;
    phoneNumber: string;
  };
}

// Mock data for development
const mockPerson = {
  firstName: 'Vitaliy',
  lastName: 'Zdobich',
  passport: '2281337',
  phoneNumber: '1233213'
};

const ArrestPerson: React.FC<ArrestPersonProps> = ({ 
  onBack = () => {}, 
  person = mockPerson 
}) => {
  const [wantedLevel, setWantedLevel] = useState<number>(2);
  const [articles, setArticles] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  
  // Current date/time for arrest record
  const currentDate = new Date().toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  const decreaseWantedLevel = () => {
    setWantedLevel(prev => Math.max(0, prev - 1));
  };

  const increaseWantedLevel = () => {
    setWantedLevel(prev => Math.min(6, prev + 1));
  };

  const handleTakePhoto = () => {
    console.log('Taking photo');
    // In a real app, we would call the native client here
  };

  const handleSubmit = () => {
    console.log('Submitting arrest record', {
      person,
      wantedLevel,
      articles,
      comment
    });
    // In a real app, we would call the native client here
  };

  return (
    <>
      <div 
        className="text-primary hover:underline cursor-pointer flex items-center"
        onClick={onBack}
      >
        &#x2190; {translateText('fractions', 'Вернуться в поиск')}
      </div>
      
      <div className="flex justify-between items-center mt-5">
        <div className="text-xl font-bold">
          {translateText('fractions', 'Оформление в')} DataBase
        </div>
      </div>
      
      <div className="flex my-10">
        <div className="w-48 h-48 bg-base-300 rounded-lg"></div>
        
        <div className="grid grid-cols-2 gap-4 ml-6 flex-1">
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">
              {translateText('fractions', 'Имя')}:
            </div>
            <div className="font-medium">{person.firstName}</div>
          </div>
          
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">
              {translateText('fractions', 'Фамилия')}:
            </div>
            <div className="font-medium">{person.lastName}</div>
          </div>
          
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">
              {translateText('fractions', 'Паспорт')}:
            </div>
            <div className="font-medium">{person.passport}</div>
          </div>
          
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">
              {translateText('fractions', 'Номер телефона')}:
            </div>
            <div className="flex">
              <div className="font-medium mr-4">{person.phoneNumber}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex">
        <div className="flex flex-col mr-5">
          <div className="text-base-content/70 text-sm">
            {translateText('fractions', 'Время')}:
          </div>
          <div className="font-medium">{currentDate}</div>
        </div>
        
        <div className="flex flex-col">
          <div className="text-base-content/70 text-sm">
            {translateText('fractions', 'Уровень розыска')}:
          </div>
          <div className="flex items-center">
            {Array(6).fill(0).map((_, index) => (
              <div 
                key={index}
                className={`bortovoiicon-star mr-1 text-xl ${
                  index < wantedLevel ? 'text-warning' : 'text-base-content/30'
                }`}
              ></div>
            ))}
            
            <div className="flex ml-5">
              <button 
                className="btn btn-sm btn-circle mr-2" 
                onClick={decreaseWantedLevel}
              >
                -
              </button>
              <button 
                className="btn btn-sm btn-circle" 
                onClick={increaseWantedLevel}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <label className="block text-base-content/70 text-sm mb-2">
          {translateText('fractions', 'Статьи')}:
        </label>
        <input 
          className="input input-bordered w-full" 
          placeholder="Введите статьи"
          value={articles}
          onChange={(e) => setArticles(e.target.value)}
        />
      </div>
      
      <div className="mt-6">
        <label className="block text-base-content/70 text-sm mb-2">
          {translateText('fractions', 'Оставьте свой комментарий')}:
        </label>
        <textarea 
          className="textarea textarea-bordered w-full h-32" 
          placeholder="Описание.."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      
      <div className="flex justify-between mt-10">
        <button 
          className="btn btn-primary"
          onClick={handleTakePhoto}
        >
          {translateText('fractions', 'Сделать фото')}
        </button>
        
        <button 
          className="btn btn-success"
          onClick={handleSubmit}
        >
          {translateText('fractions', 'Сохранить')}
        </button>
      </div>
    </>
  );
};

export default ArrestPerson;