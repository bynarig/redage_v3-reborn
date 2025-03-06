import React, { useState } from 'react';


interface FurnitureItem {
  name: string;
  price?: string;
}

interface FurnitureCraftItem {
  name: string;
  amount: number;
  image: string;
}

interface FurnitureDetailItem {
  title: string;
  price: string;
  craftItems: FurnitureCraftItem[];
  image: string;
}

interface FurnitureComponentProps {
  showFurnitureList?: boolean;
}

const FurnitureComponent: React.FC<FurnitureComponentProps> = ({ showFurnitureList = false }) => {
  // Sample furniture data
  const furnitureData: FurnitureItem[] = [
    {
      name: "Сигнализация",
      price: "500000"
    },
    {
      name: "Столы",
    },
    {
      name: "Стулья",
    },
    {
      name: "Картины",
    },
  ];

  // Sample detailed furniture items
  const furnitureDetails: FurnitureDetailItem[] = [
    {
      title: "Лампа",
      price: "20.000",
      craftItems: [
        { name: "10 сосны", amount: 10, image: "/path/to/pine.png" },
        { name: "10 сосны", amount: 10, image: "/path/to/pine.png" },
        { name: "10 сосны", amount: 10, image: "/path/to/pine.png" }
      ],
      image: "/path/to/lamp.png"
    },
    {
      title: "Лампа",
      price: "20.000",
      craftItems: [
        { name: "10 сосны", amount: 10, image: "/path/to/pine.png" },
        { name: "10 сосны", amount: 10, image: "/path/to/pine.png" },
        { name: "10 сосны", amount: 10, image: "/path/to/pine.png" }
      ],
      image: "/path/to/lamp.png"
    },
    {
      title: "Лампа",
      price: "20.000",
      craftItems: [
        { name: "10 сосны", amount: 10, image: "/path/to/pine.png" },
        { name: "10 сосны", amount: 10, image: "/path/to/pine.png" },
        { name: "10 сосны", amount: 10, image: "/path/to/pine.png" }
      ],
      image: "/path/to/lamp.png"
    },
    {
      title: "Лампа",
      price: "20.000",
      craftItems: [
        { name: "10 сосны", amount: 10, image: "/path/to/pine.png" },
        { name: "10 сосны", amount: 10, image: "/path/to/pine.png" },
        { name: "10 сосны", amount: 10, image: "/path/to/pine.png" }
      ],
      image: "/path/to/lamp.png"
    }
  ];
  
  // Handlers for buying and crafting
  const handleBuy = (item: FurnitureDetailItem) => {
    console.log('Buying item for cash:', item.title);
    // Add your logic to buy for cash here
  };
  
  const handleCraft = (item: FurnitureDetailItem) => {
    console.log('Crafting item:', item.title);
    // Add your logic to craft the item here
  };

  return (
    <>
      {showFurnitureList ? (
        <div className="box-column">
          <div className="house__main_menu">
            {furnitureData.map((furniture, index) => (
              <div key={index} className="house__element">
                {furniture.price ? (
                  <div className="box-between">
                    <div>{furniture.name}</div>
                    <div className="green">${furniture.price}</div>
                  </div>
                ) : (
                  <div className="box-center" style={{ width: '100%' }}>
                    <div>{furniture.name}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="house__info small m-0 margin-none">
            Список доступных улучшений для дома
          </div>
        </div>
      ) : (
        <div className="house__furniture">
          {furnitureDetails.map((item, index) => (
            <div key={index} className="house__furniture_element">
              <div className="box-between">
                <div className="box-column">
                  <div className="house__furniture_title">{item.title}</div>
                  <div className="house__furniture_text money">${item.price}</div>
                  {item.craftItems.map((craftItem, craftIndex) => (
                    <div key={craftIndex} className="box-flex">
                      <div 
                        className="house__furniture_smallimage"
                        style={{ backgroundImage: `url(${craftItem.image})` }}
                      ></div>
                      <div className="house__furniture_text">{craftItem.name}</div>
                    </div>
                  ))}
                </div>
                <div 
                  className="house__furniture_image"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
              </div>
              <div className="box-between">
                <div 
                  className="house__element_button"
                  onClick={() => handleBuy(item)}
                >
                  <div className="houseicon-safe house__furniture_icon"></div>
                  Купить за наличные
                </div>
                <div 
                  className="house__element_button"
                  onClick={() => handleCraft(item)}
                >
                  <div className="houseicon-garage house__furniture_icon"></div>
                  Скрафтить самому
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FurnitureComponent;