import React, { useState, useEffect } from 'react';
import { translateText } from '#/shared/locale';
import { ENVIRONMENT } from '#/env';

interface InfoProps {
  onChangePage: (page: 'DataBase' | 'Info') => void;
}

interface DatabaseRecord {
  id: number;
  name: string;
  criminalCode?: string;
  adminCode?: string;
  arrestDate?: string;
  passport?: string;
  phone?: string;
  wantedLevel?: number;
  comment?: string;
  imageUrl?: string;
}

// Mock data for development mode
const mockRecord: DatabaseRecord = {
  id: 43332,
  name: "Vitaliy Zdobich",
  passport: "2281337",
  phone: "1233213",
  arrestDate: "12 марта 2020 в 15:36",
  wantedLevel: 2,
  criminalCode: "14,5",
  comment: "Гражданин напал на сотрудников с огнестрельным оружием. Гражданин напал на сотрудников с огнестрельным оружием. Гражданин напал на сотрудников с огнестрельным оружием.",
  imageUrl: ""
};

const Info: React.FC<InfoProps> = ({ onChangePage }) => {
  const [record, setRecord] = useState<DatabaseRecord | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  useEffect(() => {
    // In development mode, use mock data
    if (ENVIRONMENT === 'development') {
      console.log("DEV MODE: Using mock record data");
      setRecord(mockRecord);
      
      // Split the name for display
      const nameParts = mockRecord.name.split(" ");
      setFirstName(nameParts[0] || "");
      setLastName(nameParts[1] || "");
    } else {
      // In production, get the selected record from localStorage
      try {
        const savedRecord = localStorage.getItem('selectedRecord');
        if (savedRecord) {
          const parsedRecord = JSON.parse(savedRecord);
          setRecord(parsedRecord);
          
          // Split the name for display
          const nameParts = parsedRecord.name.split(" ");
          setFirstName(nameParts[0] || "");
          setLastName(nameParts[1] || "");
        }
      } catch (error) {
        console.error("Error loading record:", error);
      }
    }
  }, []);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleConfirmDelete = () => {
    // In a real app, we would make an API call to delete the record
    console.log(`Deleting record #${record?.id}`);
    onChangePage("DataBase");
  };

  if (!record) {
    return (
      <div className="h-full flex justify-center items-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div 
        className="flex items-center text-primary hover:underline cursor-pointer"
        onClick={() => onChangePage("DataBase")}
      >
        &#x2190; {translateText('fractions', 'Вернуться в')} DataBase
      </div>
      
      <div className="flex justify-between items-center mt-5">
        <div className="text-xl font-bold">DataBase №{record.id}</div>
        <div>{translateText('fractions', 'Арестован')} {record.arrestDate}</div>
      </div>
      
      <div className="flex mt-10 mb-10">
        <div className="w-48 h-48 bg-base-300 rounded-lg"></div>
        <div className="grid grid-cols-2 gap-4 ml-6 flex-1">
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">{translateText('fractions', 'Имя')}:</div>
            <div className="font-medium">{firstName}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">{translateText('fractions', 'Фамилия')}:</div>
            <div className="font-medium">{lastName}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">{translateText('fractions', 'Паспорт')}:</div>
            <div className="font-medium">{record.passport}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-base-content/70 text-sm">{translateText('fractions', 'Номер телефона')}:</div>
            <div className="flex">
              <div className="font-medium mr-4">{record.phone}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex">
        <div className="flex flex-col mr-5">
          <div className="text-base-content/70 text-sm">{translateText('fractions', 'Время')}:</div>
          <div className="font-medium">{record.arrestDate}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-base-content/70 text-sm">{translateText('fractions', 'Уровень розыска')}:</div>
          <div className="flex">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index}
                className={`bortovoiicon-star mr-1 text-xl ${index < (record.wantedLevel || 0) ? 'text-warning' : 'text-base-content/30'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="text-base-content/70 text-sm">{translateText('fractions', 'Статьи')}:</div>
        <div className="font-medium">
          <span className="text-base-content/50">УК:</span> {record.criminalCode}
        </div>
      </div>
      
      <div className="mt-6">
        <div className="text-base-content/70 text-sm">{translateText('fractions', 'Комментарий сотрудника')}:</div>
        <div className="font-medium">{record.comment}</div>
      </div>
      
      {!showDeleteConfirm ? (
        <div className="flex mt-12">
          <button 
            className="btn btn-primary mr-5"
            onClick={() => console.log("View profile")}
          >
            {translateText('fractions', 'Перейти в досье')}
          </button>
          <button 
            className="btn btn-error"
            onClick={handleDeleteClick}
          >
            {translateText('fractions', 'Удалить')} DataBase
          </button>
        </div>
      ) : (
        <div className="flex mt-12 items-center">
          <div className="mr-5">{translateText('fractions', 'Вы уверены, что хотите удалить DataBase')}?</div>
          <button 
            className="btn btn-error mr-5"
            onClick={handleConfirmDelete}
          >
            {translateText('fractions', 'Да, удалить')}
          </button>
          <button 
            className="btn"
            onClick={handleCancelDelete}
          >
            {translateText('fractions', 'Нет, отмена')}
          </button>
        </div>
      )}
    </div>
  );
};

export default Info;