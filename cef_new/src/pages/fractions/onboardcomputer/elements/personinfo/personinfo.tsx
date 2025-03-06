import React, { useState } from 'react';
import { translateText } from '#/shared/locale';
import Houses from './elements/houses';
import Vehicles from './elements/vehicles';
import Licenses from './elements/licenses';
import History from './elements/history';
import Comments from './elements/comments';
import { ENVIRONMENT } from '#/env';

interface Person {
  id: string;
  firstName: string;
  lastName: string;
  passport: string;
  phoneNumber: string;
  isWanted: boolean;
  wantedLevel: number;
  criminalCode?: string;
  trafficCode?: string;
}

interface PersonInfoProps {
  person?: Person;
  onBack?: () => void;
}

// Mock data for development mode
const mockPerson: Person = {
  id: '12345',
  firstName: 'Vitaliy',
  lastName: 'Zdobich',
  passport: '2281337',
  phoneNumber: '1233213',
  isWanted: true,
  wantedLevel: 2,
  criminalCode: '23,1',
  trafficCode: '23,1'
};

type TabType = 'Houses' | 'Vehicles' | 'Licenses' | 'History' | 'Comments';

const PersonInfo: React.FC<PersonInfoProps> = ({ person, onBack }) => {
  const [selectView, setSelectView] = useState<TabType>('Houses');
  const [currentPerson, setCurrentPerson] = useState<Person>(
    ENVIRONMENT === 'development' ? mockPerson : (person || mockPerson)
  );
  const [wantedLevel, setWantedLevel] = useState<number>(currentPerson.wantedLevel);
  const [hasData, setHasData] = useState<boolean>(true);

  // Handle wanted level changes
  const decreaseWantedLevel = () => {
    setWantedLevel(prev => Math.max(0, prev - 1));
  };

  const increaseWantedLevel = () => {
    setWantedLevel(prev => Math.min(6, prev + 1));
  };

  // Handle tracking phone
  const handleTrackPhone = () => {
    console.log(`Tracking phone: ${currentPerson.phoneNumber}`);
    // In a real app, we would call the native client here
  };

  // Handle wanted status
  const handleDeclareWanted = () => {
    console.log(`Declare wanted: ${currentPerson.firstName} ${currentPerson.lastName}`);
    // In a real app, we would call the native client here
  };

  // Handle database creation
  const handleCreateDatabase = () => {
    console.log(`Create database for: ${currentPerson.firstName} ${currentPerson.lastName}`);
    // In a real app, we would call the native client here
  };

  // Render the appropriate tab content
  const renderTabContent = () => {
    switch (selectView) {
      case 'Houses':
        return <Houses />;
      case 'Vehicles':
        return <Vehicles />;
      case 'Licenses':
        return <Licenses />;
      case 'History':
        return <History />;
      case 'Comments':
        return <Comments />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full">
      <div 
        className="text-primary hover:underline cursor-pointer flex items-center"
        onClick={onBack}
      >
        &#x2190; {translateText('fractions', 'Вернуться в поиск')}
      </div>

      <div className="flex justify-between items-center mt-5">
        <div className="text-2xl font-bold">{currentPerson.firstName} {currentPerson.lastName}</div>
        <div className="flex">
          <button 
            className="btn btn-primary mr-4"
            onClick={handleDeclareWanted}
          >
            {translateText('fractions', 'Объявить в розыск')}
          </button>
          <button 
            className="btn btn-secondary"
            onClick={handleCreateDatabase}
          >
            {translateText('fractions', 'Оформить')} DataBase
          </button>
        </div>
      </div>

      <div className="flex justify-between my-10">
        <div className="w-48 h-48 bg-base-300 rounded-lg"></div>
        
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 flex-1 ml-6">
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">{translateText('fractions', 'Имя')}:</div>
            <div className="font-medium">{currentPerson.firstName}</div>
          </div>
          
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">{translateText('fractions', 'Фамилия')}:</div>
            <div className="font-medium">{currentPerson.lastName}</div>
          </div>
          
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">{translateText('fractions', 'Паспорт')}:</div>
            <div className="font-medium">{currentPerson.passport}</div>
          </div>
          
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">{translateText('fractions', 'Номер телефона')}:</div>
            <div className="flex items-center">
              <div className="font-medium mr-4">{currentPerson.phoneNumber}</div>
              <button 
                className="btn btn-sm btn-outline btn-primary flex items-center"
                onClick={handleTrackPhone}
              >
                <span className="bortovoiicon-Vector mr-1"></span>
                {translateText('fractions', 'Отследить')}
              </button>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">{translateText('fractions', 'Статус')}:</div>
            <div className={`font-medium ${currentPerson.isWanted ? 'text-error' : 'text-success'}`}>
              {currentPerson.isWanted 
                ? translateText('fractions', 'В розыске') 
                : translateText('fractions', 'Не в розыске')
              }
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">{translateText('fractions', 'Уровень розыска')}:</div>
            <div className="flex items-center">
              {Array(6).fill(0).map((_, index) => (
                <div 
                  key={index}
                  className={`bortovoiicon-star text-xl mr-1 ${index < wantedLevel ? 'text-warning' : 'text-base-content/30'}`}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">&nbsp;</div>
            <div className="flex">
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
          
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">{translateText('fractions', 'Статьи')}:</div>
            <div className="font-medium">
              <span className="text-base-content/50">{translateText('fractions', 'УК')}:</span> {currentPerson.criminalCode} {' '}
              <span className="text-base-content/50">{translateText('fractions', 'ТК')}:</span> {currentPerson.trafficCode}
            </div>
          </div>
        </div>
      </div>

      {hasData ? (
        <>
          <div className="tabs tabs-boxed mb-6">
            <button 
              className={`tab ${selectView === 'Houses' ? 'tab-active' : ''}`}
              onClick={() => setSelectView('Houses')}
            >
              {translateText('fractions', 'Недвижимость')}
            </button>
            <button 
              className={`tab ${selectView === 'Vehicles' ? 'tab-active' : ''}`}
              onClick={() => setSelectView('Vehicles')}
            >
              {translateText('fractions', 'Транспорт')}
            </button>
            <button 
              className={`tab ${selectView === 'Licenses' ? 'tab-active' : ''}`}
              onClick={() => setSelectView('Licenses')}
            >
              {translateText('fractions', 'Лицензии')}
            </button>
            <button 
              className={`tab ${selectView === 'History' ? 'tab-active' : ''}`}
              onClick={() => setSelectView('History')}
            >
              {translateText('fractions', 'История нарушений')}
            </button>
            <button 
              className={`tab ${selectView === 'Comments' ? 'tab-active' : ''}`}
              onClick={() => setSelectView('Comments')}
            >
              {translateText('fractions', 'Комментарии')}
            </button>
          </div>

          {renderTabContent()}
        </>
      ) : (
        <div className="flex justify-center items-center h-32 text-base-content/60">
          {translateText('fractions', 'Нет информации')}
        </div>
      )}
    </div>
  );
};

export default PersonInfo;