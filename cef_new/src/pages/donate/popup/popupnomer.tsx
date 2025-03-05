import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from '#/shared/api/formatter';
import { executeClient } from '#/shared/api/rage';
import { validate } from '#/shared/api/validation';
import { RootState } from '#/shared/store';

interface PopupNomerProps {
  setPopup: (value: null) => void;
}

const PopupNomer: React.FC<PopupNomerProps> = ({ setPopup }) => {
  const [number, setNumber] = useState("");
  const [confirm, setConfirm] = useState(false);

  const accountRedbucks = useSelector((state: RootState) => state.account.redbucks);
  const charMoney = useSelector((state: RootState) => state.chars.charMoney);

  const getPrice = (text: string) => {
    text = text.toLowerCase();
    if (text.match(/^([A-Za-z]{1,1})([0-9]{1,1})([0-9]{1,1})([0-9]{1,1})([A-Za-z]{1,1})$/)) {
      let coincidence = 0;

      for (let i = 1; i < 4; i++) {
        for (let x = i + 1; x < 4; x++) {
          if (text[i] === text[x]) coincidence++;
        }
      }

      if (text[0] !== text[4]) {
        if (coincidence === 0)
          return [500000, "$", "Обычный"]; // Virtual currency
        else if (coincidence === 1 && text[1] !== text[3])
          return [3000, "RB", "Редкий"];
        else if (coincidence === 1 && text[1] === text[3])
          return [5000, "RB", "Уникальный"];
        else if (coincidence === 3)
          return [7500, "RB", "Уникальный"];
      } else if (text[0] === text[4]) {
        if (coincidence === 0)
          return [3000, "RB", "Редкий"];
        else if (coincidence === 1 && text[1] !== text[3])
          return [5000, "RB", "Уникальный"];
        else if (coincidence === 1 && text[1] === text[3])
          return [7500, "RB", "Уникальный"];
        else if (coincidence === 3)
          return [10000, "RB", "Люкс"];
      }
    }
    return [30000, "RB", "Люкс"];
  };

  const onBuy = () => {
    const check = validate("vehicleNumber", number);
    if (!check.valid) {
      window.notificationAdd(4, 9, check.text, 3000);
      return;
    }
    const numberData = getPrice(number);

    if (numberData[1] === "RB" && accountRedbucks < numberData[0])
      return window.notificationAdd(4, 9, `Недостаточно Redbucks!`, 3000);
    if (numberData[1] === "$" && charMoney < numberData[0])
      return window.notificationAdd(4, 9, `Недостаточно денег!`, 3000);

    if (!confirm)
      setConfirm(true);
    else {
      if (!window.loaderData.delay("donate.onBuy", 1.5))
        return;

      executeClient("client.donate.buyVehNumber", number);
    }
  };

  const priceData = getPrice(number);

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-gray-800/90 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <div className="bg-gray-700 rounded-lg p-4 flex justify-center items-center">
              <input
                type="text"
                className="bg-transparent text-white text-center text-2xl font-bold border-b-2 border-red-500 focus:outline-none w-full"
                placeholder="REDAGE"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                  setConfirm(false);
                }}
                maxLength={8}
              />
            </div>
          </div>
          
          <div className="md:ml-6 flex-grow">
            <div className="text-xl font-bold text-white mb-2">Номер для транспорта</div>
            <div className="text-gray-300 mb-4">
              Нажмите на картинку слева и введите желаемый номер. Номер не должен начинаться с 0. 
              <br /><br />
              <span className="font-bold">{priceData[2]}</span> номер транспортного средства позволит притянуть завистливые взгляды окружающих к вашему авто! 
              Цена формируется динамически в зависимости от количества символов и формата номера.
            </div>

            {!confirm ? (
              <button
                className="px-4 py-2 w-full bg-gradient-to-r from-red-600 to-red-700 rounded text-white hover:from-red-700 hover:to-red-800 transition"
                onClick={onBuy}
              >
                Купить за {format("money", priceData[0])}{priceData[1]}
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 flex-1 bg-gradient-to-r from-green-600 to-green-700 rounded text-white hover:from-green-700 hover:to-green-800 transition"
                  onClick={onBuy}
                >
                  Купить за {format("money", priceData[0])}{priceData[1]}?
                </button>
                <button
                  className="px-4 py-2 flex-1 bg-gradient-to-r from-gray-600 to-gray-700 rounded text-white hover:from-gray-700 hover:to-gray-800 transition"
                  onClick={() => setConfirm(false)}
                >
                  Отмена
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center text-gray-400">
        <div className="flex items-center space-x-2">
          <span className="inline-block bg-gray-700 rounded px-2 py-1">ESC</span>
          <div className="text-sm">Нажми, чтобы закрыть</div>
        </div>
      </div>
    </div>
  );
};

export default PopupNomer;