import React from 'react';
import { translateText } from '#/shared/locale';
import { ENVIRONMENT } from '#/env';

interface HistoryItem {
  date: string;
  officerName: string;
  criminalCode?: string;
  trafficCode?: string;
  comment: string;
}

// Mock data for development
const mockHistory: HistoryItem[] = Array(6).fill(null).map(() => ({
  date: "19.09.21 12:55",
  officerName: "Vitaliy Zdobich",
  criminalCode: "23,1",
  trafficCode: "23,1",
  comment: "Грубо общался с сотрудниками, оказывал активное сопротивление."
}));

interface HistoryProps {
  history?: HistoryItem[];
}

const History: React.FC<HistoryProps> = ({ history = [] }) => {
  // Use mock data in development mode
  const historyToShow = ENVIRONMENT === 'development' ? mockHistory : history;
  
  return (
    <div className="space-y-1">
      {/* Header row */}
      <div className="grid grid-cols-12 gap-2 bg-base-200 p-3 rounded-t-lg font-medium text-base-content/80">
        <div className="col-span-2">{translateText('fractions', 'Дата')}:</div>
        <div className="col-span-2">{translateText('fractions', 'Сотрудник')}:</div>
        <div className="col-span-3">{translateText('fractions', 'Статьи')}:</div>
        <div className="col-span-5">{translateText('fractions', 'Комментарий')}:</div>
      </div>
      
      {/* Data rows */}
      <div className="bg-base-100 rounded-b-lg">
        {historyToShow.map((item, index) => (
          <div 
            key={index} 
            className={`grid grid-cols-12 gap-2 p-3 ${
              index !== historyToShow.length - 1 ? 'border-b border-base-200' : ''
            }`}
          >
            <div className="col-span-2 text-sm">{item.date}</div>
            <div className="col-span-2 text-sm">{item.officerName}</div>
            <div className="col-span-3 text-sm">
              {item.criminalCode && (
                <><span className="text-base-content/60">УК:</span> {item.criminalCode} </>
              )}
              {item.trafficCode && (
                <><span className="text-base-content/60">ТК:</span> {item.trafficCode}</>
              )}
            </div>
            <div className="col-span-5 text-sm">{item.comment}</div>
          </div>
        ))}
        
        {historyToShow.length === 0 && (
          <div className="text-center py-4 text-base-content/60">
            {translateText('fractions', 'История пуста')}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;