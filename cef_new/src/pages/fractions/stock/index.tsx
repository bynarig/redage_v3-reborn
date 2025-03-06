import React, { useState, useEffect } from 'react';
import { translateText } from '#/shared/locale';
import { executeClient } from '#/shared/api/rage';
import './assets/sass/stock.sass';

interface StockProps {
  viewData?: string;
}

const Stock: React.FC<StockProps> = ({ viewData }) => {
  const [title, setTitle] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [count, setCount] = useState<number[]>([]);

  // Process viewData when it changes
  useEffect(() => {
    if (viewData) {
      const parsedData = JSON.parse(viewData);
      if (JSON.stringify(count) !== JSON.stringify(parsedData)) {
        setCount(parsedData);
      }
    }
  }, [viewData]);

  // Update style and title when index changes
  useEffect(() => {
    updateStyle();
  }, [index]);

  // Initialize component
  useEffect(() => {
    updateStyle();
  }, []);

  const leftHandle = () => {
    setIndex(prevIndex => {
      if (prevIndex <= 0) return 4;
      return prevIndex - 1;
    });
  };

  const rightHandle = () => {
    setIndex(prevIndex => {
      if (prevIndex >= 4) return 0;
      return prevIndex + 1;
    });
  };

  const updateStyle = () => {
    switch (index) {
      case 0:
        setStyle('cash');
        setTitle(translateText('fractions', 'Деньги'));
        break;
      case 1:
        setStyle('healkit');
        setTitle(translateText('fractions', 'Аптечка'));
        break;
      case 2:
        setStyle('weed');
        setTitle(translateText('fractions', 'Наркотики'));
        break;
      case 3:
        setStyle('weapons');
        setTitle(translateText('fractions', 'Оружейные материалы'));
        break;
      case 4:
        setStyle('weaponsstock');
        setTitle(translateText('fractions', 'Оружейный склад'));
        break;
    }
  };

  const takeHandle = () => {
    executeClient('stockTake', index);
  };

  const putHandle = () => {
    executeClient('stockPut', index);
  };

  const exitHandle = () => {
    executeClient('stockExit');
  };

  return (
    <div id="stock">
      <div className="stock module_stock">
        <div className="mod">
          <div className="arrows left icon-arrow" onClick={leftHandle} /> 
          <div className="contain">
            <div className="icon-block">
              <div className={`ic ${style}`} />
            </div>
            <div className="title">{title}</div>
          </div>
          <div className="arrows icon-arrow" onClick={rightHandle} />
        </div>
        <div className="button">
          <div id="take" className="btn green" onClick={takeHandle}>
            {translateText('fractions', 'Взять')}
          </div>
          <div id="put" className="btn red" onClick={putHandle}>
            {translateText('fractions', 'Положить')}
          </div>
        </div>
        <div className="count">
          <div className="gray">{translateText('fractions', 'Всего')}:</div>
          <div className="white">{count[index] || 0}</div>
        </div>
        <div className="button bottom">
          <div id="exit" className="exit btn red" onClick={exitHandle}>
            {translateText('fractions', 'Выход')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;