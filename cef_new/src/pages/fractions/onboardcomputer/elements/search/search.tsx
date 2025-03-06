import React, { useState } from 'react';
import { translateText } from '#/shared/locale';
import SearchPerson from './elements/searchperson';
import SearchVehicle from './elements/searchvehicle';
import SuPerson from './elements/superson';
import SuVehicle from './elements/suvehicle';

// Type for the different views
type ViewType = 'SearchPerson' | 'SearchVehicle' | 'SuPerson' | 'SuVehicle';

const Search: React.FC = () => {
  // State for the current view
  const [selectView, setSelectView] = useState<ViewType>('SearchPerson');

  // Helper to render the current component
  const renderCurrentView = () => {
    switch (selectView) {
      case 'SearchPerson':
        return <SearchPerson />;
      case 'SearchVehicle':
        return <SearchVehicle />;
      case 'SuPerson':
        return <SuPerson />;
      case 'SuVehicle':
        return <SuVehicle />;
      default:
        return null;
    }
  };

  return (
    <>
      {(selectView === 'SearchPerson' || selectView === 'SearchVehicle') && (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="text-xl font-bold">
              {translateText('fractions', 'Бортовой компьютер')}
            </div>
            {selectView === 'SearchPerson' && (
              <button 
                className="btn btn-primary"
                onClick={() => setSelectView('SuPerson')}
              >
                {translateText('fractions', 'Объявить в розыск')}
              </button>
            )}
            {selectView === 'SearchVehicle' && (
              <button 
                className="btn btn-primary"
                onClick={() => setSelectView('SuVehicle')}
              >
                {translateText('fractions', 'Объявить в розыск')}
              </button>
            )}
          </div>
          
          <div className="tabs tabs-boxed mb-6">
            <button 
              className={`tab ${selectView === 'SearchPerson' ? 'tab-active' : ''}`}
              onClick={() => setSelectView('SearchPerson')}
            >
              {translateText('fractions', 'Гражданин')}
            </button>
            <button 
              className={`tab ${selectView === 'SearchVehicle' ? 'tab-active' : ''}`}
              onClick={() => setSelectView('SearchVehicle')}
            >
              {translateText('fractions', 'Транспорт')}
            </button>
          </div>
        </>
      )}
      
      {selectView === 'SuPerson' && (
        <div 
          className="text-primary hover:underline cursor-pointer flex items-center mb-6"
          onClick={() => setSelectView('SearchPerson')}
        >
          &#x2190; {translateText('fractions', 'Вернуться в поиск')}
        </div>
      )}
      
      {selectView === 'SuVehicle' && (
        <div 
          className="text-primary hover:underline cursor-pointer flex items-center mb-6"
          onClick={() => setSelectView('SearchVehicle')}
        >
          &#x2190; {translateText('fractions', 'Вернуться в поиск')}
        </div>
      )}
      
      {renderCurrentView()}
    </>
  );
};

export default Search;