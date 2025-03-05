import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from '#/shared/api/formatter';
import { executeClient } from '#/shared/api/rage';
import { validate } from '#/shared/api/validation';
import { RootState } from '#/shared/store';

interface PopupSimProps {
  setPopup: (value: null) => void;
}

const PopupSim: React.FC<PopupSimProps> = ({ setPopup }) => {
  const [number, setNumber] = useState("");
  const [confirm, setConfirm] = useState(false);

  const accountRedbucks = useSelector((state: RootState) => state.account.redbucks);

  const getPrice = (text: string | number) => {
    const numValue = Number(text);
    const length = numValue.toString().length;
    
    if (length === 1)
      return [50000, "RB", "Люкс"];
    else if (length === 2)
      return [40000, "RB", "Люкс"];
    else if (length === 3)
      return [30000, "RB", "Люкс"];
    else if (length === 4)
      return [20000, "RB", "Редкий"];
    else if (length === 5)
      return [15000, "RB", "Редкий"];
    else if (length === 6)
      return [10000, "RB", "Уникальный"];
    else if (length === 7)
      return [7500, "RB", "Уникальный"];
    else if (length === 8)
      return [5000, "RB", "Уникальный"];
    else if (length === 9)
      return [2500, "RB", "Обычный"];

    return [0, "RB", "Обычный"];
  };

  const onBuy = () => {
    const sim = Number(number);
    const check = validate("phonenumber", sim);
    if (!check.valid) {
      window.notificationAdd(4, 9, check.text, 3000);
      return;
    }

    const numberData = getPrice(sim);

    if (numberData[1] === "RB" && accountRedbucks < numberData[0])
      return window.notificationAdd(4, 9, `Недостаточно Redbucks!`, 3000);

    if (!confirm)
      setConfirm(true);
    else {
      if (!window.loaderData.delay("donate.onBuy", 1.5))
        return;

      executeClient("client.donate.buySim", sim);
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
                placeholder="420"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                  setConfirm(false);
                }}
                maxLength={9}
              />
            </div>
          </div>

          <div className="md:ml-6 flex-grow">
            <div className="text-xl font-bold text-white mb-2">Номер для телефона</div>
            <div className="text-gray-300 mb-4">
              Нажмите на картинку слева и введите желаемый номер. Номер не должен начинаться с 0.
              <br /><br />
              <span className="font-bold">{priceData[2]}</span> номер телефона подчеркнет индивидуальность и позволит ощутить себя по-настоящему эксклюзивно!
              Цена формируется динамически в зависимости от количества символов.
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

export default PopupSim;