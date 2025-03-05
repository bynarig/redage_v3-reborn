import React, { useState } from 'react';

interface PopupSpecialProps {
  popupData?: any;
  setPopup: (value: null) => void;
}

const PopupSpecial: React.FC<PopupSpecialProps> = ({ popupData, setPopup }) => {
  const [popupNabor, setPopupNabor] = useState(false);

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-gray-800/90 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        {!popupNabor && (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-contain bg-no-repeat bg-center"
                   style={{ backgroundImage: `url(${document.cloud}img/donate/stars.svg)` }} />
            </div>
            <div className="text-center text-2xl font-bold text-white mb-6">Специальное предложение</div>
          </>
        )}
        
        <div className="flex flex-col md:flex-row items-center">
          {/* Chest Image */}
          <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
            <div className="w-36 h-36 bg-contain bg-no-repeat bg-center"
                 style={{ backgroundImage: `url(${document.cloud}img/donate/chest.svg)` }} />
          </div>
          
          {/* Special Offer Info */}
          <div className="md:ml-6 flex-grow">
            {!popupNabor ? (
              <>
                <div className="text-xl font-bold text-white mb-3 text-center md:text-left">
                  Золотой сундук <br/> Хм, что там?
                </div>
                
                {/* Timer */}
                <div className="mb-4">
                  <div className="text-gray-300 mb-1">Предложение ограничено</div>
                  <div className="flex items-center">
                    <div className="py-1 px-3 bg-gray-700 rounded text-white font-medium">
                      01:20:21
                    </div>
                  </div>
                </div>
                
                {/* Price */}
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-contain bg-no-repeat bg-center mr-2"
                       style={{ backgroundImage: `url(${document.cloud}img/donate/redbucks.svg)` }} />
                  <div className="flex flex-col">
                    <div className="text-white font-bold">2999 RB</div>
                    <div className="text-gray-400 line-through text-sm">4999</div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <button
                  className="w-full px-4 py-2 mb-2 bg-gradient-to-r from-red-600 to-red-700 rounded text-white hover:from-red-700 hover:to-red-800 transition"
                >
                  Забрать сейчас
                </button>
                <div 
                  className="text-center text-gray-400 hover:text-gray-300 cursor-pointer transition"
                  onClick={() => setPopupNabor(true)}
                >
                  Отложить
                </div>
              </>
            ) : (
              <>
                <div className="text-xl font-bold text-white mb-3">Набор новичка</div>
                <div className="text-gray-400 mb-3">Что входит в набор?</div>
                
                {/* Kit Items */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-contain bg-no-repeat bg-center mr-2"
                         style={{ backgroundImage: `url(${document.cloud}img/donate/redbucks.svg)` }} />
                    <div className="text-white">5000 RB</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-contain bg-no-repeat bg-center mr-2"
                         style={{ backgroundImage: `url(${document.cloud}img/donate/level.svg)` }} />
                    <div className="text-white">3 LVL</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-contain bg-no-repeat bg-center mr-2"
                         style={{ backgroundImage: `url(${document.cloud}img/donate/money.svg)` }} />
                    <div className="text-white">5000 RB</div>
                  </div>
                </div>
                
                <div className="text-gray-300 mb-4">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam sequi eveniet modi eum molestiae exercitationem!
                </div>
                
                <button
                  className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded text-white hover:from-red-700 hover:to-red-800 transition"
                >
                  Купить за 500
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Close instruction */}
      <div className="mt-4 flex items-center text-gray-400">
        <div className="flex items-center space-x-2">
          <span className="inline-block bg-gray-700 rounded px-2 py-1">ESC</span>
          <div>
            <div className="text-sm">
              Нажми, чтобы закрыть предложение <br/>
              Учтите, что предложение <span className="font-bold">ограниченное</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupSpecial;