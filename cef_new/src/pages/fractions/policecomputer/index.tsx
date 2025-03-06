import React, { useState, useEffect } from 'react';
import { translateText } from '#/shared/locale';
import { executeClient } from '#/shared/api/rage';

// Import components
import ClearWanted from './elements/clearwanted';
import OpenNumber from './elements/opennumber';
import OpenPersone from './elements/openpersone';
import WantedList from './elements/wantedlist';

// Define types
interface VehicleData {
  model: string;
  owner: string;
}

interface UserData {
  fname: string;
  lname: string;
  pass: string;
  phonenumber: string;
  gender: string;
  lvl: string;
  lic: string;
  houseInfo: string;
  fraction_name?: string;
}

type ViewType = 'ClearWanted' | 'OpenNumber' | 'OpenPersone' | 'WantedList' | '';

// Get current time for iPad display
const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Mock data
const mockUserData: UserData = {
  fname: 'John',
  lname: 'Doe',
  pass: 'A-123456',
  phonenumber: '555-0142',
  gender: 'Male',
  lvl: '3',
  lic: 'A, B, C',
  houseInfo: 'Vinewood Hills, 3655',
  fraction_name: 'Civilians'
};

const mockVehicleData: VehicleData = {
  model: 'Oracle XS',
  owner: 'John Doe'
};

const mockWantedData = [
  'Michael De Santa - УК 5.1, 6.3 (Armed Robbery)',
  'Trevor Philips - УК 2.1, 3.5, 7.2 (Murder, Drug Trafficking)',
  'Franklin Clinton - УК 8.3, 9.1 (Grand Theft Auto)',
  'Lamar Davis - УК 4.2 (Assault)',
  'Wade Hebert - УК 10.5 (Trespassing)',
  'Chef - УК 7.1, 7.3 (Drug Manufacturing)',
  'Tao Cheng - УК 9.4 (Illegal Gambling)',
  'Stretch - УК 2.2, 6.1 (Attempted Murder)',
  'Devin Weston - УК 11.3 (Corporate Fraud)',
  'Wei Cheng - УК 2.1, 8.2 (Murder, Extortion)'
];

const PoliceComputer: React.FC = () => {
  // Use mock data for initial state in development
  const [vehicleData, setVehicleData] = useState<VehicleData>(mockVehicleData);
  const [userData, setUserData] = useState<UserData>(mockUserData);
  const [wantedData, setWantedData] = useState<string[]>(mockWantedData);
  const [selectView, setSelectView] = useState<ViewType>('');
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());
  const [batteryLevel, setBatteryLevel] = useState<number>(82);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);
    
    // Simulate battery drain
    const batteryTimer = setInterval(() => {
      setBatteryLevel(prev => Math.max(5, prev - 1));
    }, 30000);
    
    return () => {
      clearInterval(timer);
      clearInterval(batteryTimer);
    };
  }, []);

  // Set up global methods for external calls
  useEffect(() => {
    window.policecomputer = {
      openCar: (model: string, owner: string) => {
        setVehicleData({ model, owner });
        setSelectView('OpenNumber');
      },
      openPerson: (
        name: string, 
        lastname: string, 
        uuid: string, 
        fractionname: string, 
        pnumber: string, 
        gender: string, 
        wantedlvl: string, 
        lic: string, 
        houseInfo: string
      ) => {
        setUserData({
          fname: name,
          lname: lastname,
          pass: uuid,
          fraction_name: fractionname,
          phonenumber: pnumber,
          gender,
          lvl: wantedlvl,
          lic,
          houseInfo
        });
        setSelectView('OpenPersone');
      },
      openWanted: (data: string) => {
        setWantedData(JSON.parse(data));
        setSelectView('WantedList');
      }
    };

    // Cleanup on unmount
    return () => {
      window.policecomputer = undefined;
    };
  }, []);

  // Views map for dynamic rendering
  const Views = {
    ClearWanted,
    OpenNumber,
    OpenPersone,
    WantedList
  };

  // Handle wanted list request
  const handleWantedListRequest = () => {
    executeClient("client:wantedListRequest");
    setSelectView("WantedList");
  };

  // Handle exit
  const handleExit = () => {
    executeClient('client:pcMenuExit');
  };

  // Current component to render
  const CurrentView = selectView ? Views[selectView] : null;

  // Menu items configuration
  const menuItems = [
    {
      id: 'ClearWanted',
      icon: '🚫',
      title: translateText('fractions', 'Очистить розыск'),
      onClick: () => setSelectView("ClearWanted")
    },
    {
      id: 'OpenNumber',
      icon: '🚗',
      title: translateText('fractions', 'Пробить номера'),
      onClick: () => setSelectView("OpenNumber")
    },
    {
      id: 'OpenPersone',
      icon: '👤',
      title: translateText('fractions', 'Пробить по базе'),
      onClick: () => setSelectView("OpenPersone")
    },
    {
      id: 'WantedList',
      icon: '🔍',
      title: translateText('fractions', 'Список разыскиваемых'),
      onClick: handleWantedListRequest
    }
  ];

  // Battery color based on level
  const getBatteryColor = () => {
    if (batteryLevel <= 20) return 'text-red-500';
    if (batteryLevel <= 40) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
      {/* iPad device frame */}
      <div className="relative w-[1200px] h-[800px] bg-[#2c2c2e] rounded-[40px] shadow-2xl p-3 overflow-hidden">
        {/* Power button */}
        <div className="absolute right-[-8px] top-28 w-2 h-14 bg-[#3c3c3e] rounded-l-md"></div>
        
        {/* Volume buttons */}
        <div className="absolute left-[-8px] top-28 w-2 h-8 bg-[#3c3c3e] rounded-r-md"></div>
        <div className="absolute left-[-8px] top-40 w-2 h-8 bg-[#3c3c3e] rounded-r-md"></div>
        
        {/* iPad screen */}
        <div className="w-full h-full bg-[#1c1c1e] rounded-[32px] overflow-hidden">
          {/* Status bar */}
          <div className="h-8 bg-[#2c2c2e] flex items-center justify-between px-6 border-b border-[#38383a]">
            <div className="text-sm font-semibold text-white">{currentTime}</div>
            <div className="flex items-center">
              <div className="mr-4 text-white">📶</div>
              <div className="mr-4 text-white">📡</div>
              <div className={`${getBatteryColor()}`}>🔋 {batteryLevel}%</div>
            </div>
          </div>
          
          {/* Main content area with side navigation */}
          <div className="flex h-[calc(100%-32px)]">
            {/* Side navigation (left) */}
            <div className="w-64 bg-[#2c2c2e] border-r border-[#38383a] overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">LSPD</span>
                  </div>
                </div>
                
                <div className="font-medium text-lg text-center mb-6 text-white">
                  {translateText('fractions', 'Полицейский iPad')}
                </div>
                
                {menuItems.map((item) => (
                  <div 
                    key={item.id}
                    className={`mb-2 p-3 rounded-xl cursor-pointer flex items-center ${
                      selectView === item.id 
                        ? 'bg-blue-600/20 text-blue-400' 
                        : 'text-white/90 hover:bg-[#3c3c3e]'
                    }`}
                    onClick={item.onClick}
                  >
                    <span className="text-xl mr-3">{item.icon}</span>
                    <span className="font-medium">{item.title}</span>
                  </div>
                ))}
                
                <div 
                  className="mt-6 p-3 rounded-xl cursor-pointer flex items-center text-red-400 hover:bg-[#3c3c3e]"
                  onClick={handleExit}
                >
                  <span className="text-xl mr-3">⏏️</span>
                  <span className="font-medium">{translateText('fractions', 'Выход')}</span>
                </div>
              </div>
              
              {/* Bottom section with logo */}
              <div className="border-t border-[#38383a] mt-6 p-4">
                <div className="text-xs text-white/60 text-center">
                  LSPD MDT System
                </div>
                <div className="text-xs text-white/40 text-center">
                  v3.5.2
                </div>
              </div>
            </div>
            
            {/* Content area (right) */}
            <div className="flex-1 p-6 overflow-y-auto bg-[#1c1c1e] text-white/90">
              {CurrentView ? (
                <CurrentView 
                  model={vehicleData.model}
                  owner={vehicleData.owner}
                  fname={userData.fname}
                  lname={userData.lname}
                  pass={userData.pass}
                  phonenumber={userData.phonenumber}
                  gender={userData.gender}
                  lvl={userData.lvl}
                  lic={userData.lic}
                  houseInfo={userData.houseInfo}
                  fraction_name={userData.fraction_name}
                  wantedData={wantedData}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-white/50">
                  <div className="text-8xl mb-6">👮‍♂️</div>
                  <div className="text-xl">{translateText('fractions', 'Выберите опцию в меню')}</div>
                  <div className="mt-8 text-white/30 text-sm max-w-md text-center">
                    Los Santos Police Department Mobile Data Terminal позволяет офицерам получать информацию 
                    о гражданах, транспортных средствах и разыскиваемых преступниках в реальном времени.
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Home button / indicator */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

// Add TypeScript interface for window object
declare global {
  interface Window {
    policecomputer?: {
      openCar: (model: string, owner: string) => void;
      openPerson: (
        name: string, 
        lastname: string, 
        uuid: string, 
        fractionname: string, 
        pnumber: string, 
        gender: string, 
        wantedlvl: string, 
        lic: string, 
        houseInfo: string
      ) => void;
      openWanted: (data: string) => void;
    };
  }
}

export default PoliceComputer;