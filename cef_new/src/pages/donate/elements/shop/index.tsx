import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { translateText } from '#/shared/locale';
import { format } from '#/shared/api/formatter';
import { validate } from '#/shared/api/validation';
import { RootState } from '#/shared/store';

// Import images
import ImgMenuChar from './img/char.png';
import ImgBuy from './img/buy.svg';
import ImgConversion from './img/conversion.svg';
import ImgSapper from './img/sapper.png';
import ImgP_1 from './img/p_1.svg';
import ImgP_2 from './img/p_2.svg';
import ImgP_3 from './img/p_3.svg';
import SimPhoto from './img/sim.png';
import NumberPhoto from './img/number.png';

interface ShopItem {
  id?: number;
  name: string;
  desc: string;
  text?: string;
  img: string;
  price?: number;
  btnName?: string;
  isName?: boolean;
  isNumber?: boolean;
  isSim?: boolean;
  icon?: string;
}

interface ShopCategory {
  title: string;
  desc: string;
  function: string;
  img: string;
  list: ShopItem[];
}

interface ShopProps {
  setPopup: (name: string, data?: any) => void;
}

const Shop: React.FC<ShopProps> = ({ setPopup }) => {
  const [selectIndex, setSelectIndex] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const serverDonatMultiplier = useSelector((state: RootState) => state.server.donatMultiplier);

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

  const shopList: ShopCategory[] = [
    {
      title: "Основное",
      desc: "",
      function: "onSelectPrice",
      img: ImgBuy,
      list: [
        {
          name: "Конвертация",
          btnName: "Конвертировать",
          desc: "",
          img: ImgConversion,
        },
        {
          name: "Игра сапер",
          btnName: "Играть",
          desc: "",
          img: ImgSapper,
        },
      ]
    },
    {
      title: "Персонаж",
      desc: "",
      function: "onSelectP",
      img: ImgMenuChar,
      list: [
        {
          id: 0,
          isName: true,
          name: "Сменить имя",
          desc: "",
          text: `Позволяет один раз сменить имя одного
                  Вашего персонажа.
                  После смены имени персонаж забудет о совершенных ранее рукопожатиях,
                  при этом инвентарь и статистика персонажа никак не изменятся. Только никнейм.`,
          img: ImgP_1,
          price: 800,
        },
        {
          id: 1,
          name: "Сменить внешность",
          desc: "",
          text: `После оплаты этой функции,
                  Ваш персонаж будет отправлен в редактор внешности (как при создании персонажа),
                  где Вы сможете заново настроить его внешность.
                  Содержимое инвентаря и татуировки останутся.`,
          img: ImgP_2,
          price: 1000,
        },
        {
          id: 2,
          name: "Снятие варна",
          desc: "",
          text: `Warn - предупреждение от Администрации. Эта донат-функция снимает только 1 warn.
                В случае, если у вас 2 warn'a, то для полного снятия потребуется дважды оплатить "Снятие WARN".
                Если у вас накопится 3 warn'a одновременно - персонаж будет автоматически заблокирован на 30 дней.`,
          img: ImgP_3,
          price: 1000,
        },
        {
          id: 3,
          isNumber: true,
          name: "Покупка номера",
          desc: "",
          text: `Долгожданная система покупки номера для автомобиля!
                Соберите свой уникальный номер из букв и/или цифр и пусть все вокруг завидуют...
                Номер на авто выдаётся как предмет в инвентарь.`,
          img: NumberPhoto,
          btnName: "Купить"
        },
        {
          id: 4,
          isSim: true,
          name: "Покупка SIM",
          desc: "",
          text: `Долгожданная система покупки номера для телефона!
                Соберите свой уникальный номер из любых цифр и пусть все вокруг завидуют...
                Номер на авто выдаётся как предмет в инвентарь.`,
          img: SimPhoto,
          btnName: "Купить"
        },
      ]
    },
  ];

  const onToServer = (item: ShopItem) => {
    switch (shopList[selectIndex].function) {
      case "onSelectPrice":
        if (item.btnName === "Купить") setPopup("PopupPayment", 0);
        else if (item.btnName === "Конвертировать") setPopup("PopupChange");
        else window.router.setView('DonateSapper');
        break;
      case "onSelectP":
        if (item.isNumber) {
          setPopup("PopupNomer");
          return;
        }
        if (item.isSim) {
          setPopup("PopupSim");
          return;
        }

        if (item.isName) {
          let check;

          check = validate("name", firstName);
          if (!check.valid) {
            window.notificationAdd(4, 9, check.text, 3000);
            return;
          }

          check = validate("surname", lastName);
          if (!check.valid) {
            window.notificationAdd(4, 9, check.text, 3000);
            return;
          }
          
          const fullName = `${firstName}_${lastName}`;
          const itemWithName = { 
            ...item, 
            isName: fullName,
            text: `Вы действительно хотите сменить ник на ${fullName}`
          };
          setPopup("PopupPPopup", itemWithName);
        } else {
          setPopup("PopupPPopup", item);
        }
        break;
      case "onSelectC":
        setPopup("PopupCPopup", item);
        break;
    }
  };

  return (
    <div id="newdonate__shop" className="flex flex-col-reverse md:flex-row">
      {/* Shop Items */}
      <div className="flex-grow grid grid-cols-1 gap-4">
        {shopList[selectIndex].list.map((item, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 flex">
            {item.icon ? (
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <span className={`${item.icon} text-3xl text-white`} />
              </div>
            ) : (
              <div 
                className="flex-shrink-0 w-16 h-16 bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${item.img})` }}
              />
            )}
            
            <div className="ml-4 flex-grow">
              <div className="text-lg font-medium text-white mb-2">{item.name}</div>
              
              {item.isName ? (
                <div className="space-y-2 mb-4">
                  <input 
                    className="w-full bg-gray-700 text-white p-2 rounded"
                    placeholder="Имя"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input 
                    className="w-full bg-gray-700 text-white p-2 rounded"
                    placeholder="Фамилия"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              ) : (
                <div className="text-gray-300 mb-4">{item.desc}</div>
              )}
              
              <button
                onClick={() => onToServer(item)}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded text-white hover:from-red-700 hover:to-red-800 transition"
              >
                {item.btnName ? (
                  item.btnName
                ) : (
                  `${translateText('donate', 'Купить за')} ${format("money", item.price)} RB`
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Categories */}
      <div className="mb-4 md:mb-0 md:ml-4 md:w-64 flex-shrink-0">
        {shopList.map((category, index) => (
          <div 
            key={index}
            className={`flex items-center mb-2 p-3 rounded-lg cursor-pointer hover:bg-gray-700/50 transition
              ${selectIndex === index ? 'bg-gray-700/70' : 'bg-gray-800'}`}
            onClick={() => setSelectIndex(index)}
          >
            <div className="flex-grow">
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full border ${selectIndex === index ? 'border-red-500 bg-red-500' : 'border-gray-500'} mr-2`} />
                <div className="text-white">{category.title}</div>
              </div>
              {category.desc && <div className="text-gray-400 text-sm">{category.desc}</div>}
            </div>
            <div 
              className="w-10 h-10 bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${category.img})` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;