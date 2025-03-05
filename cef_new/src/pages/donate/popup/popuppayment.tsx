import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { executeClient } from '#/shared/api/rage';
import axios from 'axios';
import qs from 'querystring';
import { RootState } from '#/shared/store';

interface PopupPaymentProps {
  popupData?: number;
  setPopup: (value: null) => void;
}

const PopupPayment: React.FC<PopupPaymentProps> = ({ popupData, setPopup }) => {
  const [donateToggled, setDonateToggled] = useState(true);
  const [donateText, setDonateText] = useState("1");
  const [donateSelect, setDonateSelect] = useState("unitpay");

  const accountLogin = useSelector((state: RootState) => state.account.login);
  const serverDonatMultiplier = useSelector((state: RootState) => state.server.donatMultiplier);
  const serverId = useSelector((state: RootState) => state.server.id);

  // Initialize with popupData if provided
  useEffect(() => {
    if (popupData && popupData > 0) {
      setDonateText(String(popupData));
      setDonateToggled(false);
      handleDonate();
    }
  }, [popupData]);

  const onHandleInput = (value: string) => {
    let numValue = Math.round(Number(value.replace(/\D+/g, "")));
    
    if (numValue < 0) numValue = 0;
    else if (numValue > 999999) numValue = 999999;
    
    setDonateText(String(numValue));
  };

  const getDonate = (text: number) => {
    if (text < 0) text = 0;
    else if (text > 999999) text = 999999;
    
    let tallage = 0;
    if (serverDonatMultiplier > 1) {
      text = text * serverDonatMultiplier;
    } else {
      if (text >= 20000) {
        tallage = 50;
      } else if (text >= 10000) {
        tallage = 30;
      } else if (text >= 3000) {
        tallage = 20;
      } else if (text >= 1000) {
        tallage = 10;
      }
    }

    return `${Math.round(text) + Math.round(text / 100 * tallage)}`;
  };

  const handleDonate = () => {
    const donateAmount = Number(donateText);
    
    if (donateAmount < 0 || donateAmount > 999999)
      return window.showTooltip("#donateInput", 2, "Неверный формат");
    
    setDonateToggled(false);
    
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    axios.post('https://pay.redage.net/', qs.stringify({
      name: accountLogin,
      sum: Math.round(donateAmount),
      srv: Math.round(serverId),
      type: donateSelect
    }), config)
      .then(function (response) {
        response = response.data;
        if (response.status === 'success') {
          executeClient("client.opendonatesite", response.url);
        } else if (response.status === 'error') {
          window.notificationAdd(4, 9, response.msg, 3000);
          setDonateToggled(true);
        }
      });
  };

  if (!donateToggled) {
    return null;
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-gray-800/90 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex flex-col items-center">
          {/* Payment Icon */}
          <div className="w-20 h-20 bg-contain bg-no-repeat bg-center mb-4"
               style={{ backgroundImage: `url(${document.cloud}img/donate/payment.svg)` }} />
          
          <div className="text-xl font-bold text-white mb-4">Пополнение RB</div>
          
          {/* Amount Input */}
          <input
            id="donateInput"
            className="w-full bg-gray-700 text-white p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Сумма"
            type="text"
            value={donateText}
            onChange={(e) => onHandleInput(e.target.value)}
          />
          
          {/* Amount Display */}
          <div className="w-full bg-gray-700 text-white p-3 rounded mb-2 flex items-center">
            <div className="w-6 h-6 bg-contain bg-no-repeat bg-center mr-2"
                 style={{ backgroundImage: `url(${document.cloud}img/donate/redbucks.svg)` }} />
            <div>{getDonate(Number(donateText))} RB</div>
          </div>
          <div className="text-gray-400 text-sm mb-6">Вы получите</div>
          
          {/* Payment System Selection */}
          <div className="text-white mb-2 self-start">Выберете платежную систему</div>
          <div className="w-full mb-6">
            <ul className="space-y-2">
              <li 
                className="flex items-center cursor-pointer p-2 hover:bg-gray-700/50 rounded"
                onClick={() => setDonateSelect("unitpay")}
              >
                <span className={`w-4 h-4 rounded-full border ${donateSelect === "unitpay" ? 'border-red-500 bg-red-500' : 'border-gray-500'} mr-2`} />
                <span className="text-white">Unitpay</span>
              </li>
              <li 
                className="flex items-center cursor-pointer p-2 hover:bg-gray-700/50 rounded"
                onClick={() => setDonateSelect("qiwi")}
              >
                <span className={`w-4 h-4 rounded-full border ${donateSelect === "qiwi" ? 'border-red-500 bg-red-500' : 'border-gray-500'} mr-2`} />
                <span className="text-white">Qiwi</span>
              </li>
            </ul>
          </div>
          
          {/* Submit Button */}
          <button
            className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded text-white hover:from-red-700 hover:to-red-800 transition"
            onClick={handleDonate}
          >
            Далее
          </button>
        </div>
      </div>
      
      {/* Close instruction */}
      <div className="mt-4 flex items-center text-gray-400">
        <div className="flex items-center space-x-2">
          <span className="inline-block bg-gray-700 rounded px-2 py-1">ESC</span>
          <div className="text-sm">Нажми, чтобы закрыть</div>
        </div>
      </div>
    </div>
  );
};

export default PopupPayment;