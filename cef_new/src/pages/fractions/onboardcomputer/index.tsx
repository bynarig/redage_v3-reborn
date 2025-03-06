import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { translateText } from '#/shared/locale';
import { TimeFormat } from '#/shared/api/moment';
import { RootState } from '#/shared/store';

// Import all the components
import Search from './elements/search/search';
import Database from './elements/database/database';
import Wanted from './elements/wanted/wanted';
import Calls from './elements/calls/calls';
import PersonInfo from './elements/personinfo/personinfo';
import VehicleInfo from './elements/vehicleinfo/vehicleinfo';
import ArrestPerson from './elements/search/elements/arrestperson';
import SuEdit from './elements/suedit/index';

// Import the CSS
import './assets/style.css';

type ViewType = 'Search' | 'Database' | 'Wanted' | 'Calls' | 'PersonInfo' | 'VehicleInfo' | 'ArrestPerson' | 'SuEdit';

const OnBoardComputer: React.FC = () => {
  // State for the currently selected view
  const [selectView, setSelectView] = useState<ViewType>('Search');
  
  // Get character information from Redux store
  const charName = useSelector((state: RootState) => state.char.name || '');
  const fractionLVL = useSelector((state: RootState) => state.char.fractionLevel || '');
  const serverDateTime = useSelector((state: RootState) => state.server.dateTime || new Date());
  
  // Map of views to components
  const Views = {
    Search,
    Database,
    Wanted,
    Calls,
    PersonInfo,
    VehicleInfo,
    ArrestPerson,
    SuEdit
  };
  
  // Current component to render
  const CurrentView = Views[selectView];
  
  return (
    <div id="policecomputer" className="h-screen w-screen flex items-center justify-center bg-base-100/80">
      <div className="flex absolute top-6 left-6">
        <div className="bg-base-100 rounded px-2 py-1 text-xs font-bold mr-2">ESC</div>
        <div className="text-white">{translateText('fractions', 'Закрыть')}</div>
      </div>
      
      <div className="bg-base-100 rounded-lg shadow-lg w-[1200px] h-[800px] max-w-[95vw] max-h-[95vh]">
        {/* Header bar */}
        <div className="flex justify-between items-center px-6 py-3 border-b border-base-300">
          <div>{TimeFormat(serverDateTime, "HH:mm DD.MM.YYYY")}</div>
          <div className="h-8 w-24 bg-contain bg-no-repeat bg-center bg-police-logo"></div>
        </div>
        
        {/* Main content area */}
        <div className="flex h-[calc(100%-56px)]">
          {/* Navigation sidebar */}
          <div className="w-64 border-r border-base-300 flex flex-col h-full">
            <div className="w-32 h-32 mx-auto my-6 bg-police-logo bg-contain bg-no-repeat bg-center"></div>
            <div className="border-t border-base-300 mb-6"></div>
            
            {/* Navigation items */}
            <div 
              className={`flex items-center p-3 cursor-pointer ${selectView === 'Search' ? 'bg-primary text-primary-content' : 'hover:bg-base-200'}`}
              onClick={() => setSelectView('Search')}
            >
              <span className="bortovoiicon-loop text-xl mr-3"></span>
              <div>{translateText('fractions', 'Поиск')}</div>
            </div>
            
            <div 
              className={`flex items-center p-3 cursor-pointer ${selectView === 'Database' ? 'bg-primary text-primary-content' : 'hover:bg-base-200'}`}
              onClick={() => setSelectView('Database')}
            >
              <span className="bortovoiicon-shield text-xl mr-3"></span>
              <div>{translateText('fractions', 'База данных')}</div>
            </div>
            
            <div 
              className={`flex items-center p-3 cursor-pointer ${selectView === 'Wanted' ? 'bg-primary text-primary-content' : 'hover:bg-base-200'}`}
              onClick={() => setSelectView('Wanted')}
            >
              <span className="bortovoiicon-list text-xl mr-3"></span>
              <div>{translateText('fractions', 'Розыск')}</div>
            </div>
            
            <div 
              className={`flex items-center p-3 cursor-pointer ${selectView === 'Calls' ? 'bg-primary text-primary-content' : 'hover:bg-base-200'}`}
              onClick={() => setSelectView('Calls')}
            >
              <span className="bortovoiicon-call text-xl mr-3"></span>
              <div className="flex items-center">
                {translateText('fractions', 'Вызовы')}
                <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">3</span>
              </div>
            </div>
            
            <div 
              className={`flex items-center p-3 cursor-pointer ${selectView === 'SuEdit' ? 'bg-primary text-primary-content' : 'hover:bg-base-200'}`}
              onClick={() => setSelectView('SuEdit')}
            >
              <span className="bortovoiicon-tasks text-xl mr-3"></span>
              <div>{translateText('fractions', 'Законы')}</div>
            </div>
            
            <div className="border-t border-base-300 my-6"></div>
            
            {/* Push the user info to the bottom */}
            <div className="mt-auto"></div>
            <div className="border-t border-base-300 mb-4"></div>
            
            {/* Officer information */}
            <div className="flex flex-col items-center mb-6">
              <div className="font-bold">{charName}</div>
              <div className="text-sm text-base-content/70">{fractionLVL}</div>
            </div>
            
            <div className="border-t border-base-300"></div>
            
            {/* Flag */}
            <div className="h-12 bg-police-flag bg-contain bg-no-repeat bg-center mt-4 mb-6"></div>
          </div>
          
          {/* Main content area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <CurrentView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnBoardComputer;