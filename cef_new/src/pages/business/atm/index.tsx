import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { translateText } from '#/shared/locale';
import { executeClient } from '#/shared/api/rage';
import { format } from '#/shared/api/formatter';
import { RootState } from '#/shared/store';
import { ENVIRONMENT } from '#/env';
import { selectCharBankMoney } from '#/shared/store/chars';

// Import Material UI Icons
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BalanceIcon from '@mui/icons-material/Balance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import CallMadeIcon from '@mui/icons-material/CallMade';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import SendIcon from '@mui/icons-material/Send';

// Types
interface ViewData {
  number: string;
  holder: string;
}

interface MenuItem {
  title: string;
  icon: string;
  materialIcon: React.ReactNode;
}

interface ATMProps {
  viewData?: ViewData;
}

// Mock data for development
const mockViewData: ViewData = {
  number: "1234 5678 9012 3456",
  holder: "John Doe"
};

// Main ATM Component
const ATM: React.FC<ATMProps> = ({ viewData: propsViewData }) => {
  // Redux selector for bank balance
  const charBankMoney = useSelector(selectCharBankMoney);
  
  // State
  const [activeView, setActiveView] = useState<"Menu" | "Input" | "Business">("Menu");
  const [type, setType] = useState(1);
  const [subdata, setSubdata] = useState<string>('');
  const [activeMain, setActiveMain] = useState(0);
  const [placeholder, setPlaceholder] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputIcon, setInputIcon] = useState('dollar');
  
  // Use mock data in development mode
  const viewData = ENVIRONMENT === 'development' && !propsViewData 
    ? mockViewData 
    : propsViewData || { number: "", holder: "" };
  
  const { number, holder } = viewData;

  // Menu items with Material UI icons
  const menuItems: MenuItem[] = [
    {
      "title": translateText('player', 'Внести средства'),
      "icon": "ic-user-shared-fill",
      "materialIcon": <CallMadeIcon className="w-6 h-6" />
    },
    {
      "title": translateText('player', 'Вывести средства'),
      "icon": "ic-user-received-fill",
      "materialIcon": <CallReceivedIcon className="w-6 h-6" />
    },
    {
      "title": translateText('player', 'Внести налог за недвижимость'),
      "icon": "ic-home-fill",
      "materialIcon": <HomeIcon className="w-6 h-6" />
    },
    {
      "title": translateText('player', 'Внести налог за бизнес'),
      "icon": "ic-store-fill",
      "materialIcon": <StoreIcon className="w-6 h-6" />
    },
    {
      "title": translateText('player', 'Перевести на другой счет'),
      "icon": "ic-article-fill",
      "materialIcon": <SendIcon className="w-6 h-6" />
    }
  ];

  // Initialize the ATM window
  useEffect(() => {
    // Set input icon based on placeholder
    if (placeholder === translateText('player', 'Счет зачисления')) {
      setInputIcon('card');
    } else {
      setInputIcon('dollar');
    }
  }, [placeholder]);

  // Initialize ATM window methods
  useEffect(() => {
    window.atm = {
      open: (data: [number, string, string]) => {
        window.atm.reset();
        setPlaceholder(data[2]);
        setSubdata(data[1]);
        setType(data[0]);

        if (data[0] === 1) setActiveView("Menu");
        else if (data[0] === 2) setActiveView("Input");
        else if (data[0] === 3) setActiveView("Business");
      },
      reset: () => {
        setSubdata('');
        setType(1);
        setActiveView("Menu");
        setInputValue("");
      }
    };

    // In development mode, simulate opening
    if (ENVIRONMENT === 'development') {
      setSubdata('50000/100000');
      setPlaceholder(translateText('player', 'Введите сумму'));
    }

    return () => {
      delete window.atm;
    };
  }, []);

  // Business component's functionality
  useEffect(() => {
    if (activeView === "Business" && subdata) {
      const subdataArray = subdata.split('/');
      subdataArray.forEach((_, index) => {
        if (ENVIRONMENT === 'production') {
          executeClient("atmCB", type, index);
        } else {
          console.log("DEV MODE: Business emulPress called with", type, index);
        }
      });
    }
  }, [activeView, type, subdata]);

  // Menu selection handler
    // Menu selection handler
    const handleSelectMain = (index: number) => {
      setActiveMain(index);
      if (ENVIRONMENT === 'production') {
        executeClient("atmCB", type, index);
      } else {
        console.log("DEV MODE: atmCB called with", type, index);
        
        // Mock response for development testing
        if (index === -1) {
          window.atm.reset();
        } else {
          // Handle all menu options in development mode
          const mockData = {
            0: { // Внести средства
              subdata: '50000/100000',
              placeholder: translateText('player', 'Введите сумму')
            },
            1: { // Вывести средства
              subdata: '75000/100000',
              placeholder: translateText('player', 'Введите сумму')
            },
            2: { // Внести налог за недвижимость
              subdata: '5000/20000',
              placeholder: translateText('player', 'Введите сумму налога')
            },
            3: { // Внести налог за бизнес
              subdata: '10000/50000',
              placeholder: translateText('player', 'Введите сумму налога')
            },
            4: { // Перевести на другой счет
              subdata: '75000/100000',
              placeholder: translateText('player', 'Счет зачисления')
            }
          };
  
          if (mockData[index as keyof typeof mockData]) {
            const { subdata, placeholder } = mockData[index as keyof typeof mockData];
            setSubdata(subdata);
            setPlaceholder(placeholder);
            setActiveView("Input");
          }
        }
      }
    };

  // Input handlers
  const handleInputChange = (inputValue: string, num: number) => {
    let processedValue = Math.round(Number(inputValue.replace(/\D+/g, "")));
    if (processedValue < 1) processedValue = 1;
    else if (num === 6 && processedValue > 9999999) processedValue = 9999999;
    else if (num === 10 && processedValue > 99999999) processedValue = 99999999;
    setInputValue(processedValue.toString());
  };

  const handleNext = () => {
    if (ENVIRONMENT === 'production') {
      executeClient('atmVal', inputValue);
    } else {
      console.log("DEV MODE: atmVal called with", inputValue);
    }
    setInputValue("");
  };

  const handlePrev = () => {
    if (ENVIRONMENT === 'production') {
      executeClient('atmCB', type, 0);
    } else {
      console.log("DEV MODE: atmCB back button pressed");
      setActiveView("Menu");
    }
    setInputValue("");
  };

  // Render appropriate view based on state
  const renderContent = () => {
    switch (activeView) {
      case "Menu":
        return (
          <div className="w-full">
            <div className="grid grid-cols-5 gap-4 mb-4">
              {menuItems.map((item, index) => (
                <button 
                  key={index} 
                  onClick={() => handleSelectMain(index)} 
                  className="flex flex-col items-center justify-center p-4 h-36 bg-base-300 hover:bg-base-200 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md border border-neutral-700"
                >
                  <div className="w-12 h-12 mb-3 flex items-center justify-center text-primary">
                    {item.materialIcon}
                  </div>
                  <span className="text-base-content text-sm font-medium text-center">{item.title}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <button 
                onClick={() => handleSelectMain(-1)} 
                className="btn btn-error btn-outline px-8 gap-2"
              >
                <ExitToAppIcon className="w-5 h-5" />
                {translateText('player', 'Выйти')}
              </button>
            </div>
          </div>
        );
      case "Input":
        return (
          <div className="card bg-base-300 shadow-xl">
            <div className="card-body p-6">
              {(activeMain === 2 || activeMain === 3) ? (
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 mask mask-squircle bg-primary flex items-center justify-center">
                      {menuItems[activeMain].materialIcon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h2 className="card-title text-base-content">{menuItems[activeMain].title}</h2>
                    {subdata.length > 0 && (
                      <div className="space-y-1 mt-1">
                        <div className="text-sm flex items-center">
                          <BalanceIcon className="w-4 h-4 mr-1 text-primary" />
                          {translateText('player', 'Баланс')}: 
                          <span className="text-primary ml-2">{format("money", subdata.split('/')[0])}$</span>
                        </div>
                        <div className="text-sm flex items-center">
                          <TrendingUpIcon className="w-4 h-4 mr-1 text-primary" />
                          {translateText('player', 'Максимум')}: 
                          <span className="text-primary ml-2">{format("money", subdata.split('/')[1])}$</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center mb-4">
                  <div className="avatar mb-2">
                    <div className="w-16 h-16 mask mask-squircle bg-primary flex items-center justify-center">
                      {menuItems[activeMain].materialIcon}
                    </div>
                  </div>
                  <h2 className="card-title text-base-content">{menuItems[activeMain].title}</h2>
                </div>
              )}

              <div className="form-control">
                <label className="input-group">
                  <span className="bg-primary text-primary-content">
                    {inputIcon === 'card' ? <CreditCardRoundedIcon /> : <AttachMoneyIcon />}
                  </span>
                  <input
                    value={inputValue}
                    type="text"
                    onChange={(e) => handleInputChange(e.target.value, inputIcon === 'card' ? 10 : 6)}
                    placeholder={placeholder}
                    maxLength={inputIcon === 'card' ? 10 : 8}
                    className="input input-bordered w-full"
                  />
                </label>
              </div>

              <div className="card-actions justify-between mt-4">
                <button 
                  onClick={handleNext}
                  className="btn btn-primary flex-1 gap-1"
                >
                  <ArrowForwardIcon className="w-5 h-5" />
                  {translateText('player', 'Далее')}
                </button>
                <button 
                  onClick={handlePrev}
                  className="btn flex-1 gap-1"
                >
                  <ArrowBackIcon className="w-5 h-5" />
                  {translateText('player', 'Назад')}
                </button>
              </div>
            </div>
          </div>
        );
      case "Business":
        return (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="w-full max-w-[830px] card bg-base-100 shadow-xl">
        {/* Banner */}
        <div className="card-body bg-base-100 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <CreditCardIcon className="w-10 h-10 text-primary" />
              <span className="text-3xl font-medium text-base-content">
                {translateText('player', 'Банкомат')} <span className="font-bold text-primary">ATM</span>
              </span>
            </div>
            
            <div className="badge badge-lg badge-primary gap-2">
              <CheckCircleIcon className="w-4 h-4" />
              {translateText('player', 'Без комиссии')}
            </div>
          </div>
          
          <p className="text-base-content/70 max-w-md mb-6">
            {translateText('player', 'Самые быстрые и надежные Банкоматы "ATM" Работают 24/7, расположены по всему штату!')}
          </p>
        </div>
        
        {/* Main Content */}
        <div className="card-body bg-base-200 pt-0">
          <div className="stats shadow mb-6">
            <div className="stat">
              <div className="stat-figure text-primary">
                <CreditCardIcon className="w-8 h-8" />
              </div>
              <div className="stat-title">{translateText('player', 'Номер счёта')}</div>
              <div className="stat-value text-lg">{number}</div>
            </div>
            
            <div className="stat">
              <div className="stat-figure text-primary">
                <PersonIcon className="w-8 h-8" />
              </div>
              <div className="stat-title">{translateText('player', 'Владелец счёта')}</div>
              <div className="stat-value text-lg">{holder}</div>
            </div>
            
            <div className="stat">
              <div className="stat-figure text-primary">
                <AccountBalanceWalletIcon className="w-8 h-8" />
              </div>
              <div className="stat-title">{translateText('player', 'На банковском счете')}</div>
              <div className="stat-value text-lg">{format("money", charBankMoney)}$</div>
            </div>
          </div>
          
          {/* Render current view */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// TypeScript global window interface extension
declare global {
  interface Window {
    atm: {
      open: (data: [number, string, string]) => void;
      reset: () => void;
    };
  }
}

export default ATM;