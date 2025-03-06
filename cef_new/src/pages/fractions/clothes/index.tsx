import React, { useEffect, useState, useRef } from 'react';
import { translateText } from '#/shared/locale';
import { executeClient } from '#/shared/api/rage';
import { format } from '#/shared/api/formatter';
import { useSelector } from 'react-redux';
import { selectCharGender } from '#/shared/store/chars';
import { menu, getClothesDictionary, clothesEmpty } from '#/shared/data/clothes';
import { clothesName } from '#/pages/player/menu/elements/inventory/functions';
import { ENVIRONMENT } from '#/env';

interface ClothesProps {
  viewData?: string;
}

interface MenuData {
  type: string;
  dictionary: string;
  title: string;
  icon: string;
  camera: string;
  function?: { event: string; componentId: number }[];
  gender?: string;
  color?: number;
  isHair?: boolean;
}

interface DictionaryData {
  Id: number;
  Name: string;
  TName: string;
  Variation: number;
  descName: string;
  Textures: number[];
  Price: number;
  Donate: number;
  Torso?: number;
  Torsos?: Record<number, number>;
  IsHair?: boolean;
  IsHat?: boolean;
  IsGlasses?: boolean;
}

// Mock data for development mode
const mockMenuData: MenuData[] = [
  {
    type: "fraction",
    dictionary: "Tops",
    title: "Верхняя одежда",
    icon: "newbarbershopicons-tops",
    camera: "default",
    function: [{ event: "setComponentVariation", componentId: 11 }]
  },
  {
    type: "fraction",
    dictionary: "Legs",
    title: "Штаны",
    icon: "newbarbershopicons-legs",
    camera: "legs",
    function: [{ event: "setComponentVariation", componentId: 4 }]
  }
];

const mockDictionaryData: DictionaryData[] = [
  {
    Id: 1,
    Name: "Jacket1",
    TName: "Top",
    Variation: 1,
    descName: "Leather Jacket",
    Textures: [0, 1, 2],
    Price: 1000,
    Donate: 0,
    Torso: 0
  },
  {
    Id: 2,
    Name: "Jacket2",
    TName: "Top",
    Variation: 2,
    descName: "Business Suit",
    Textures: [0, 1, 2, 3],
    Price: 2000,
    Donate: 0,
    Torso: 0
  }
];

const FractionClothes: React.FC<ClothesProps> = ({ viewData = "{}" }) => {
  // Parse view data
  const parsedViewData = JSON.parse(viewData);
  
  // Get gender from Redux
  const charGender = useSelector(selectCharGender);
  const gender = String(charGender).toLowerCase() === "true" ? "Male" : "Female";
  const initializedRef = useRef(false);

  // State variables
  const [menuData, setMenuData] = useState<MenuData[]>([]);
  const [selectMenu, setSelectMenu] = useState<MenuData>({} as MenuData);
  const [selectDictionary, setSelectDictionary] = useState<DictionaryData | false>(false);
  const [selectTexture, setSelectTexture] = useState<number>(0);
  const [dictionaryData, setDictionaryData] = useState<DictionaryData[]>([]);
  const [torso, setTorso] = useState<number>(clothesEmpty[gender][3]);
  const [torsos, setTorsos] = useState<Record<number, number>>({});
  const [torsosTexture, setTorsosTexture] = useState<number>(0);
  const [textureSort, setTextureSort] = useState<number[]>([]);

  // Refs
  const refCategory = useRef<HTMLDivElement>(null);

  const length = 8;

  // In dev mode, mock some data for testing
  useEffect(() => {
    if (ENVIRONMENT === 'development') {
      console.log('DEV MODE: Using mock data');
      setMenuData(mockMenuData);
      if (mockMenuData.length > 0) {
        setSelectMenu(mockMenuData[0]);
        setDictionaryData(mockDictionaryData);
        if (mockDictionaryData.length > 0) {
          setSelectDictionary(mockDictionaryData[0]);
          if (mockDictionaryData[0].Textures && mockDictionaryData[0].Textures.length > 0) {
            setTextureSort(mockDictionaryData[0].Textures.slice(0, length));
            setSelectTexture(mockDictionaryData[0].Textures[0]);
          }
        }
      }
    }
  }, []);

  // Utility functions
  const Bool = (text: string | boolean): boolean => {
    return String(text).toLowerCase() === "true";
  };

  const isCount = (dictionary: string, isDonate: boolean): boolean => {
    let count = false;
    let data: DictionaryData[] = [];

    data = JSON.parse(getClothesDictionary(gender, dictionary));
    data = Object.values(data);

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item && ((!isDonate && item.Price > 0) || (isDonate && item.Donate > 0))) {
        count = true;
        break;
      }
    }

    return count;
  };

  const getName = (name: string | number): string => {
    if (typeof name === "number") {
      if (clothesName[`${selectMenu.dictionary}_${name}_${gender}`]) {
        name = clothesName[`${selectMenu.dictionary}_${name}_${gender}`];
      } else if (clothesName[`${selectMenu.dictionary}_${name}`]) {
        name = clothesName[`${selectMenu.dictionary}_${name}`];
      } else {
        name = `#${name}`;
      }
    }
    return name as string;
  };

  // Event handlers
  const onSelectMenu = (data: MenuData) => {
    if (selectMenu === data) return;

    setSelectMenu(data);
    setSelectTexture(0);
    executeClient('client.clothes.getDictionary', getClothesDictionary(data.dictionary));
    executeClient('client.clothes.updateCameraToBone', data.camera);
  };

  const OnSelectDictionary = (data: DictionaryData) => {
    if (selectDictionary === data) return;

    setSelectDictionary(data);

    if (data.Textures) {
      const newTextureSort = data.Textures.slice(0, length);
      setTextureSort(newTextureSort);
      OnSelectClothes(data.Textures[0]);
    }
  };

  const OnSelectClothes = (index: number) => {
    setSelectTexture(index);
    executeClient(
      'client.shop.getIndexToTextureName',
      selectDictionary?.Name,
      selectDictionary?.TName,
      index,
      selectDictionary?.Id
    );

    const func = selectMenu.function;
    if (func && func[0] && func[0].event) {
      if (selectMenu.dictionary === "Torsos") {
        if (selectDictionary && selectDictionary.Torsos && selectDictionary.Torsos[torso]) {
          executeClient(
            'client.clothes.setComponentVariation',
            3,
            selectDictionary.Torsos[torso],
            index
          );
        }
      } else if (selectDictionary) {
        executeClient(
          `client.clothes.${func[0].event}`,
          func[0].componentId,
          selectDictionary.Variation,
          index
        );
      }
    }

    OnInitConditions();
  };

  const MouseUse = (toggled: boolean) => {
    executeClient("client.camera.toggled", toggled);
  };

  const OnExit = () => {
    executeClient('client.shop.close');
  };

  const OnBuy = () => {
    if (!selectDictionary) return;
    executeClient(`client.clothes.buy`, selectMenu.dictionary, selectDictionary.Id, selectTexture);
  };

  // Condition functions
  const OnSettingConditions = () => {
    if (
      ["Body", "Torso", "LeftArm", "RightArm"].includes(selectMenu.dictionary) ||
      (selectDictionary && selectDictionary.Torso !== undefined)
    ) {
      executeClient('client.clothes.getTorso');
    }

    if (selectDictionary && selectDictionary.Torsos !== undefined) {
      executeClient('client.clothes.getTop');
    }

    if (selectMenu.color !== undefined) {
      executeClient('client.clothes.getColor', selectMenu.isHair);
    }
  };

  const OnInitConditions = () => {
    if (selectDictionary) {
      if (selectDictionary.Torso !== undefined) {
        executeClient('client.clothes.setComponentVariation', 8, clothesEmpty[gender][8], 0, false);

        if (torsos[selectDictionary.Torso]) {
          executeClient('client.clothes.setComponentVariation', 3, torsos[selectDictionary.Torso], torsosTexture, false);
        } else {
          executeClient('client.clothes.setComponentVariation', 3, selectDictionary.Torso, torsosTexture, false);
        }
      }

      if (selectDictionary.IsHair !== undefined) {
        executeClient('client.clothes.setComponentVariation', 2, 0, 0, false);
      }

      if (selectDictionary.IsHat !== undefined) {
        executeClient('client.clothes.clearProp', 0);
      }

      if (selectDictionary.IsGlasses !== undefined) {
        executeClient('client.clothes.clearProp', 1);
        executeClient('client.clothes.clearProp', 2);
      }
    }

    if (["Masks"].includes(selectMenu.dictionary)) {
      executeClient('client.clothes.clearMask');
    }

    if (["Hat", "Glasses", "Ears"].includes(selectMenu.dictionary)) {
      executeClient('client.clothes.setComponentVariation', 1, clothesEmpty[gender][1], 0, false);
    }
  };

  const OnOpen = (type: string, jsonData: string | false, isDonate: boolean) => {
    let json;
    if (jsonData) {
      json = JSON.parse(jsonData);
    } else {
      json = false;
    }

    let newMenu: MenuData[] = [];
    menu.forEach(data => {
      if (
        data.type === type &&
        (!json || json.includes(data.dictionary)) &&
        isCount(data.dictionary, isDonate) &&
        (!data.gender || data.gender === gender)
      ) {
        newMenu.push(data);
      }
    });

    setMenuData(newMenu);
    if (newMenu[0]) {
      onSelectMenu(newMenu[0]);
    }
  };

  // Event handler functions
  const UpdateDictionary = (json: string) => {
    if (refCategory.current) {
      refCategory.current.scrollTop = 0;
    }
    const newDictionaryData = JSON.parse(json);
    setDictionaryData(newDictionaryData);
    OnSelectDictionary(newDictionaryData[0]);
    OnSettingConditions();
  };

  const setName = (name: string) => {
    setDictionaryData(prev => {
      const newData = [...prev];
      for (let i = 0; i < newData.length; i++) {
        if (newData[i] === selectDictionary) {
          newData[i] = { ...newData[i], descName: name };
          break;
        }
      }
      return newData;
    });
  };

  const GetTorso = (drawable: number, texture: number) => {
    let newTorsos = {};
    setTorsosTexture(texture);

    const defaultTorsos = [0, 1, 2, 4, 5, 6, 8, 11, 12, 14, 15, 112, 113, 114];
    if (!defaultTorsos.includes(drawable)) {
      const torsosData = JSON.parse(getClothesDictionary(gender, "Torsos"));
      Object.values(torsosData).forEach((data: any) => {
        if (data && data.Torsos && Object.values(data.Torsos)) {
          Object.values(data.Torsos).forEach((torsoVal: any) => {
            if (torsoVal === drawable) {
              newTorsos = data.Torsos;
            }
          });
        }
      });
    }

    setTorsos(newTorsos);
    OnInitConditions();
  };

  const GetTop = (drawable: number) => {
    let newTorso = clothesEmpty[gender][3];
    if (newTorso !== drawable) {
      let isSuccess = false;
      const topsData = JSON.parse(getClothesDictionary(gender, "Tops"));
      Object.values(topsData).forEach((data: any) => {
        if (data && data.Variation === drawable) {
          newTorso = data.Torso;
          isSuccess = true;
        }
      });

      if (!isSuccess) {
        const undershortData = JSON.parse(getClothesDictionary(gender, "Undershort"));
        Object.values(undershortData).forEach((data: any) => {
          if (data && data.Variation === drawable) {
            newTorso = data.Torso;
          }
        });
      }
    }

    setTorso(newTorso);
    OnInitConditions();
  };

  // Keyboard event handlers
  const handleKeyDown = (event: KeyboardEvent) => {
    const { keyCode } = event;
    switch (keyCode) {
      case 69: { // E
        if (!menuData.length) return;
        const index = menuData.findIndex(a => a === selectMenu);
        if (menuData[index + 1] === undefined) return;
        onSelectMenu(menuData[index + 1]);
        break;
      }
      case 81: { // Q
        if (!menuData.length) return;
        const index = menuData.findIndex(a => a === selectMenu);
        if (menuData[index - 1] === undefined) return;
        onSelectMenu(menuData[index - 1]);
        break;
      }
      case 38: { // Up arrow
        if (!dictionaryData.length) return;
        const index = dictionaryData.findIndex(a => a === selectDictionary);
        if (dictionaryData[index - 1] === undefined) return;
        OnSelectDictionary(dictionaryData[index - 1]);
        const el = document.querySelector(`#menu_${index - 1}`);
        if (el && refCategory.current) {
          const bounds = el.getBoundingClientRect();
          refCategory.current.scrollTop = (bounds.height * (index - 1)) + ((bounds.height / 10) * (index - 1));
        }
        break;
      }
      case 40: { // Down arrow
        if (!dictionaryData.length) return;
        const index = dictionaryData.findIndex(a => a === selectDictionary);
        if (dictionaryData[index + 1] === undefined) return;
        OnSelectDictionary(dictionaryData[index + 1]);
        const el = document.querySelector(`#menu_${index + 1}`);
        if (el && refCategory.current) {
          const bounds = el.getBoundingClientRect();
          refCategory.current.scrollTop = (bounds.height * (index + 1)) + ((bounds.height / 10) * (index + 1));
        }
        break;
      }
      case 13: { // Enter
        OnBuy();
        break;
      }
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const { keyCode } = event;
    if (keyCode === 27) { // ESC
      OnExit();
    }
  };

  // Initialize (once)
  useEffect(() => {
    if (initializedRef.current) return;
    
    if (process.env.NODE_ENV !== 'development') {
      try {
        const parsed = JSON.parse(viewData);
        OnOpen(parsed.type, parsed.json, parsed.isDonate);
        initializedRef.current = true;
      } catch (error) {
        console.error("Error parsing viewData:", error);
      }
    } else {
      initializedRef.current = true;
    }
  }, [viewData]);

  // Uncomment to enable keyboard handlers if needed
  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyDown);
  //   window.addEventListener('keyup', handleKeyUp);
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //     window.removeEventListener('keyup', handleKeyUp);
  //   };
  // }, [menuData, dictionaryData]);

  // Uncomment to enable game-event listeners
  // useEffect(() => {
  //   window.events.addEvent("cef.clothes.updateDictionary", UpdateDictionary);
  //   window.events.addEvent("cef.clothes.setName", setName);
  //   window.events.addEvent("cef.clothes.getTorso", GetTorso);
  //   window.events.addEvent("cef.clothes.getColor", () => {});
  //   window.events.addEvent("cef.clothes.getTop", GetTop);

  //   OnOpen(parsedViewData.type, parsedViewData.json, parsedViewData.isDonate);

  //   return () => {
  //     window.events.removeEvent("cef.clothes.updateDictionary", UpdateDictionary);
  //     window.events.removeEvent("cef.clothes.setName", setName);
  //     window.events.removeEvent("cef.clothes.getTorso", GetTorso);
  //     window.events.removeEvent("cef.clothes.getColor", () => {});
  //     window.events.removeEvent("cef.clothes.getTop", GetTop);
  //   };
  // }, [parsedViewData, selectMenu, selectDictionary, torsos, torso]);

  return (
    <div className="h-screen w-screen flex flex-col justify-between bg-base-100/80">
      {/* Top Section */}
      <div className="p-4">
        <div 
          className="flex items-center justify-center gap-2 mb-2 bg-base-200 p-2 rounded-lg"
          onMouseEnter={() => MouseUse(false)}
          onMouseLeave={() => MouseUse(true)}
        >
          <button className="btn btn-circle btn-sm">Q</button>
          
          {menuData.map((data, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg cursor-pointer transition-all ${selectMenu === data ? 'bg-primary text-primary-content' : 'bg-base-300 text-base-content'}`}
              onClick={() => onSelectMenu(data)}
            >
              <div className={`${data.icon} text-xl`}></div>
            </div>
          ))}
          
          <button className="btn btn-circle btn-sm">E</button>
        </div>
        <div className="text-center text-sm">
          {translateText('fractions', 'Выбор категории')}
        </div>
      </div>
      
      {/* Center Section */}
      <div className="flex-1 flex justify-center gap-4 p-4">
        {/* Menu List */}
        <div className="w-1/3 bg-base-200 rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="btn btn-circle btn-xs">
                <span className="newbarbershopicons-updown"></span>
              </div>
              <div className="font-medium">{translateText('fractions', 'Выбор')} {selectMenu.title}</div>
            </div>
            <div className="text-xs opacity-70">
              {translateText('fractions', 'В ассортименте')} {dictionaryData.length} {translateText('fractions', 'шт')}.
            </div>
          </div>
          
          <div 
            className="flex-1 overflow-y-auto pr-2"
            ref={refCategory}
            onMouseEnter={() => MouseUse(false)}
            onMouseLeave={() => MouseUse(true)}
          >
            {dictionaryData.map((data, index) => (
              <div
                key={index}
                id={`menu_${index}`}
                className={`p-2 mb-2 rounded-lg cursor-pointer relative ${data === selectDictionary ? 'bg-primary/20 border border-primary' : 'bg-base-300'}`}
                onClick={() => OnSelectDictionary(data)}
              >
                <div className="absolute inset-0 pointer-events-none"></div>
                <div className="flex justify-between items-center">
                  <div 
                    className="font-medium"
                    dangerouslySetInnerHTML={{ __html: getName(data.descName) }}
                  ></div>
                  {data.Donate > 0 ? (
                    <div className="badge badge-accent">
                      {format("money", data.Donate)} RB
                    </div>
                  ) : (
                    <div className="badge badge-secondary">
                      $ {format("money", data.Price)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Help Section */}
        <div className="w-1/3 bg-base-200 rounded-lg p-4 flex flex-col">
          <div className="flex-1 flex flex-col justify-center items-center gap-4">
            <div className="w-24 h-24 bg-base-300 rounded-full flex items-center justify-center">
              <span className="text-3xl">?</span>
            </div>
            <div className="text-center">
              <p className="mb-2">
                {translateText('fractions', 'Используйте горячие клавиши для быстрого перемещения по интерфейсу')}:
              </p>
              <div className="flex justify-center gap-2">
                <button className="btn btn-circle btn-sm">
                  <span className="newbarbershopicons-leftright"></span>
                </button>
                <button className="btn btn-circle btn-sm">
                  <span className="newbarbershopicons-updown"></span>
                </button>
                <button className="btn btn-circle btn-sm">Q</button>
                <button className="btn btn-circle btn-sm">E</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="flex justify-between items-center p-4 bg-base-200">
        <div className="flex items-center gap-2">
          <button className="btn btn-primary btn-sm" onClick={OnBuy}>Enter</button>
          <span>{translateText('fractions', 'Купить')}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span>{translateText('fractions', 'Выйти')}</span>
          <button className="btn btn-error btn-sm" onClick={OnExit}>ESC</button>
        </div>
      </div>
    </div>
  );
};

export default FractionClothes;