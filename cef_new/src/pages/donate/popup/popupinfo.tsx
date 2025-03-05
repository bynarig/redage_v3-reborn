import React from 'react';

interface PopupInfoProps {
  setPopup: (value: null) => void;
}

const PopupInfo: React.FC<PopupInfoProps> = ({ setPopup }) => {
  return (
    <div className="w-full max-w-2xl">
      <div className="bg-gray-800/90 rounded-lg shadow-lg p-6">
        <div className="flex">
          {/* Question mark icon */}
          <div className="flex-shrink-0 w-12 h-12 bg-contain bg-no-repeat bg-center mr-4"
               style={{ backgroundImage: `url(${document.cloud}img/donate/question.svg)` }} />
          
          {/* Content */}
          <div className="flex-grow">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-contain bg-no-repeat bg-center mr-2"
                   style={{ backgroundImage: `url(${document.cloud}img/donate/redbucks.svg)` }} />
              <div className="text-xl font-semibold text-white">Что такое RB?</div>
            </div>
            
            <div className="text-gray-300 space-y-4">
              <p>
                <span className="font-bold">RedBucks</span> - это донат-валюта проекта, получить которую можно путём пожертвования, 
                используя внутриигровой интерфейс (кнопка "Купить" справа) или <span className="font-bold">личный кабинет</span> (lk.redage.net).
              </p>
              <p>
                Так же <span className="font-bold">RB</span> можно получить просто так, каждый день, просто проводя время в игре!
              </p>
              <p>
                Если коротко: в месяц можно получить до <span className="font-bold">1200 RedBucks абсолютно бесплатно</span>. 
                Подробнее об этом можно узнать на нашей <span className="font-bold">Википедии</span> (wiki.redage.net)
              </p>
            </div>
          </div>
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

export default PopupInfo;