import React from 'react';
import { translateText } from '#/shared/locale';
import { ENVIRONMENT } from '#/env';

interface WantedPerson {
  id: number;
  name: string;
  criminalCode: string;
  characteristics: string;
  description: string;
}

// Mock data for development mode
const mockWantedList: WantedPerson[] = Array(20).fill(null).map((_, index) => ({
  id: 2281337 + index,
  name: "Vitaliy Zdobich",
  criminalCode: "13,6",
  characteristics: "Темнокожий блондин, на руке татуировка.",
  description: "Гражданин напал на сотрудников с огнестрельным оружием. Гражданин напал на сотрудников с огнестрельным оружием. Гражданин напал на сотрудников с огнестрельным оружием."
}));

const Wanted: React.FC = () => {
  // In development mode, use mock data
  const wantedList = ENVIRONMENT === 'development' ? mockWantedList : [];
  
  const handleCloseCase = (id: number) => {
    console.log(`Closing case #${id}`);
    // In a real app, we would call the native client here
  };
  
  return (
    <div>
      <div className="text-xl font-bold mb-6">
        {translateText('fractions', 'Список разыскиваемых')}
      </div>
      
      <div className="space-y-6 overflow-y-auto max-h-[600px]">
        {wantedList.map((person, index) => (
          <div key={index} className="bg-base-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="mr-10">
                {translateText('fractions', 'Дело')} №{person.id}
              </div>
              <button 
                className="btn btn-sm btn-primary"
                onClick={() => handleCloseCase(person.id)}
              >
                {translateText('fractions', 'Закрыть дело')}
              </button>
            </div>
            
            <div className="flex mt-4">
              <div className="mr-20">
                <div className="text-base-content/70 text-sm">
                  {translateText('fractions', 'Имя и фамилия')}:
                </div>
                <div className="font-medium">
                  {person.name}
                </div>
              </div>
              
              <div>
                <div className="text-base-content/70 text-sm">
                  {translateText('fractions', 'Статьи')}:
                </div>
                <div className="font-medium">
                  <span className="text-base-content/60">УК:</span> {person.criminalCode}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="text-base-content/70 text-sm">
                {translateText('fractions', 'Приметы')}:
              </div>
              <div className="font-normal">
                {person.characteristics}
              </div>
            </div>
            
            <div className="mt-6">
              <div className="text-base-content/70 text-sm">
                {translateText('fractions', 'Описание')}:
              </div>
              <div className="font-normal">
                {person.description}
              </div>
            </div>
          </div>
        ))}
        
        {wantedList.length === 0 && (
          <div className="text-center py-12 text-base-content/60">
            {translateText('fractions', 'Нет разыскиваемых лиц')}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wanted;