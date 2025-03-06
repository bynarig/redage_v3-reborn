import React, { useState } from 'react';
import { translateText } from '#/shared/locale';
import { ENVIRONMENT } from '#/env';

interface Call {
  id: number;
  distance: string;
  status: string;
  caller: string;
  description: string;
  address: string;
  message: string;
  hasAccepted: boolean;
  acceptedCount: number;
}

// Mock data for development
const mockCalls: Call[] = [
  {
    id: 22,
    distance: "1234",
    status: "CODE 0",
    caller: "Vitaliy Zdobich",
    description: "Стрельба в районе города",
    address: "Рокфорд Хиллс, 12",
    message: "Стрельба в районе города, двое неизвестных. Судя по выстрелам имеют автоматическое оружие.",
    hasAccepted: true,
    acceptedCount: 2
  },
  {
    id: 23,
    distance: "568",
    status: "CODE 1",
    caller: "John Smith",
    description: "Подозрительное лицо",
    address: "Миррор Парк, 5",
    message: "Подозрительное лицо в маске рядом с банком.",
    hasAccepted: false,
    acceptedCount: 0
  },
  {
    id: 24,
    distance: "2341",
    status: "CODE 2",
    caller: "Alex Johnson",
    description: "Ограбление магазина",
    address: "Вайнвуд, 28",
    message: "Вооруженное ограбление, один подозреваемый.",
    hasAccepted: false,
    acceptedCount: 1
  }
];

interface CallsProps {
  calls?: Call[];
}

const Calls: React.FC<CallsProps> = ({ calls = [] }) => {
  // State
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [allCalls, setAllCalls] = useState<Call[]>([]);

  // Initialize with mock data in development mode
  React.useEffect(() => {
    if (ENVIRONMENT === 'development') {
      console.log("DEV MODE: Using mock call data");
      setAllCalls(mockCalls);
      // Default to showing details of first call for development
      setSelectedCall(mockCalls[0]);
      setShowDetails(true);
    } else if (calls.length > 0) {
      setAllCalls(calls);
    }
  }, [calls]);

  // Event handlers
  const handleViewDetails = (call: Call) => {
    setSelectedCall(call);
    setShowDetails(true);
  };

  const handleBackToList = () => {
    setShowDetails(false);
  };

  const handleAcceptCall = () => {
    if (!selectedCall) return;
    
    // In a real app, we would make an API call here
    console.log(`Accepting call #${selectedCall.id}`);
    
    // Update the call in our state
    const updatedCalls = allCalls.map(call => 
      call.id === selectedCall.id 
        ? { ...call, hasAccepted: true, acceptedCount: call.acceptedCount + 1 } 
        : call
    );
    
    setAllCalls(updatedCalls);
    setSelectedCall({ ...selectedCall, hasAccepted: true, acceptedCount: selectedCall.acceptedCount + 1 });
  };

  const handleMarkGPS = () => {
    if (!selectedCall) return;
    console.log(`Marking call #${selectedCall.id} in GPS`);
    // In a real app, we would call the native client here
  };

  return (
    <div className="h-full">
      {!showDetails ? (
        // Call list view
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{translateText('fractions', 'Бортовой компьютер')}</h2>
            <div>{allCalls.length} {translateText('fractions', 'активных вызова')}</div>
          </div>
          
          <div className="grid grid-cols-6 gap-2 mt-5 bg-base-200 p-2 rounded-t-lg text-sm font-medium">
            <div>{translateText('fractions', 'Номер')}:</div>
            <div>{translateText('fractions', 'Расстояние')}:</div>
            <div>{translateText('fractions', 'Статус')}:</div>
            <div className="col-span-1">{translateText('fractions', 'Вызвал')}:</div>
            <div className="col-span-1">{translateText('fractions', 'Описание')}:</div>
            <div></div>
          </div>
          
          <div className="bg-base-100 rounded-b-lg overflow-y-auto max-h-[calc(100%-120px)]">
            {allCalls.map((call) => (
              <div 
                key={call.id} 
                className="grid grid-cols-6 gap-2 p-2 border-b border-base-200 hover:bg-base-200 transition-colors"
              >
                <div>№{call.id}</div>
                <div>{call.distance} м.</div>
                <div>{call.status}</div>
                <div className="col-span-1 truncate">{call.caller}</div>
                <div className="col-span-1 truncate">{call.description}</div>
                <div className="flex justify-end">
                  <button 
                    onClick={() => handleViewDetails(call)} 
                    className="btn btn-sm btn-primary"
                  >
                    {translateText('fractions', 'Подробнее')}
                  </button>
                </div>
              </div>
            ))}
            {allCalls.length === 0 && (
              <div className="p-4 text-center text-base-content/70">
                {translateText('fractions', 'Нет активных вызовов')}
              </div>
            )}
          </div>
        </>
      ) : (
        // Call details view
        <>
          <button 
            onClick={handleBackToList}
            className="flex items-center text-primary hover:underline cursor-pointer"
          >
            &#x2190; {translateText('fractions', 'Вернуться к вызовам')}
          </button>
          
          <div className="flex justify-between items-center mt-5">
            <div className="flex items-center">
              <h2 className="text-xl font-bold mr-4">{translateText('fractions', 'Вызов')} №{selectedCall?.id}</h2>
              
              {selectedCall?.hasAccepted && (
                <div className="text-sm opacity-80">
                  <span className="text-white">{translateText('fractions', 'Вы')}</span>
                  {' '}{translateText('fractions', 'и')}{' '}
                  {selectedCall?.acceptedCount}{' '}
                  {translateText('fractions', 'патруля уже приняли вызов')}
                </div>
              )}
            </div>
            
            {!selectedCall?.hasAccepted && (
              <button 
                className="btn btn-primary" 
                onClick={handleAcceptCall}
              >
                {translateText('fractions', 'Принять вызов')}
              </button>
            )}
          </div>
          
          <div className="mt-8">
            <h3 className="text-base-content/80 font-medium">
              {translateText('fractions', 'Вызвал')}:
            </h3>
            <p className="text-lg mt-1">{selectedCall?.caller}</p>
          </div>
          
          <div className="mt-4">
            <h3 className="text-base-content/80 font-medium">
              {translateText('fractions', 'Адрес')}:
            </h3>
            <p className="text-lg mt-1">{selectedCall?.address}</p>
          </div>
          
          <div className="mt-4">
            <h3 className="text-base-content/80 font-medium">
              {translateText('fractions', 'Сообщение')}:
            </h3>
            <p className="text-lg mt-1">{selectedCall?.message}</p>
          </div>
          
          <div className="mt-4">
            <h3 className="text-base-content/80 font-medium">
              {translateText('fractions', 'Местоположение')}:
            </h3>
            <div className="w-full h-64 bg-base-200 rounded-lg mt-2"></div>
          </div>
          
          <button 
            className="btn btn-primary btn-lg w-full mt-4"
            onClick={handleMarkGPS}
          >
            {translateText('fractions', 'Отметить в GPS')}
          </button>
        </>
      )}
    </div>
  );
};

export default Calls;