import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {format} from '#shared/api/formatter';
import {translateText} from '#shared/locale';
import {TimeFormat} from '#shared/api/moment';
import {RootState} from '#shared/store';
import InputItem from './InputItem';
import {ENVIRONMENT} from "#/env.ts";
import {mockViewData} from "#mock/shops/clothes";
import {getBarberDictionary, getClothesDictionary, getTattooDictionary, menu} from "#shared/data/clothes.ts";
import {safeExecuteClient} from "#api/clientExicutor.ts";

// Types and interfaces
interface MenuItem {
    id: number;
    type: string;
    title: string;
    dictionary: string;
    icon: string;
    count: number;
    camera: string;
    function?: {
        event: string;
        componentId: number;
        overlayID?: number;
        colorType?: number;
    }[];
    gender?: string;
    isHair?: boolean;
    color?: boolean;
    colorHighlight?: boolean;
    opacity?: boolean;
    tattooId?: number;
}

interface DictionaryItem {
    Id: number;
    Variation: number;
    Name: string;
    Textures: number[];
    TName?: string;
    Price?: number;
    Donate?: number;
    Torsos?: Record<number, number>;
    Torso?: number;
    IsHair?: boolean;
    IsHat?: boolean;
    IsGlasses?: boolean;
    descName?: string | number;
    Dictionary?: string;
    MaleHash?: string;
    FemaleHash?: string;
    Slots?: string[];
}

interface ColorData {
    r: number;
    g: number;
    b: number;
    a: number;
    gtaid: number;
}

interface ViewData {
    type: string;
    gender: boolean;
    priceType: number;
    priceList: string;
    menuList?: string;
}

const ClothesShop: React.FC<{ viewData: ViewData }> = ({viewData}) => {
    const dispatch = useDispatch();
    const serverDateTime = useSelector((state: RootState) => state.server.serverDateTime);
    const charGender = useSelector((state: RootState) => state.char.charGender);
    if (ENVIRONMENT === 'development') viewData = mockViewData
    const gender = viewData.gender ? "Male" : "Female";
    const isFraction = viewData.priceType === 2;

    // State management
    const [menuData, setMenuData] = useState<MenuItem[]>([]);
    const [selectMenu, setSelectMenu] = useState<MenuItem | null>(null);
    const [isLoad, setIsLoad] = useState(false);
    const [dictionaryData, setDictionaryData] = useState<DictionaryItem[]>([]);
    const [selectDictionary, setSelectDictionary] = useState<DictionaryItem | null>(null);
    const [selectTexture, setSelectTexture] = useState(0);
    const [textureSort, setTextureSort] = useState<number[]>([]);
    const [selectSort, setSelectSort] = useState(0);
    const [torso, setTorso] = useState(0);
    const [torsos, setTorsos] = useState<Record<number, number>>({});
    const [torsosTexture, setTorsosTexture] = useState(0);
    const [colorsData, setColorsData] = useState<ColorData[]>([]);
    const [colorsDataSort, setColorsDataSort] = useState<ColorData[]>([]);
    const [selectColor, setSelectColor] = useState(0);
    const [colorsHighlightData, setColorsHighlightData] = useState<ColorData[]>([]);
    const [colorsHighlightDataSort, setColorsHighlightDataSort] = useState<ColorData[]>([]);
    const [selectColorHighlight, setSelectColorHighlight] = useState(0);
    const [selectOpacity, setSelectOpacity] = useState(100);
    const [searchText, setSearchText] = useState("");

    const categoryRef = useRef<HTMLDivElement>(null);
    const length = 8;

    const getDictionary = (dictionary, clothesData) => {

        //

        clothesData = JSON.parse(clothesData);

        const priceList = JSON.parse(viewData.priceList);
        const priceType = viewData.priceType;


        let returnData = {};

        if (priceType === 2) {
            if (!["Tops", "Legs", "Shoes"].includes(dictionary))
                returnData [-1] = {"Id": -1, "Variation": 0, "Name": "Пусто", "Textures": [0]}

            if (dictionary === "Undershort")
                returnData [-1] = {"Id": -1, "Variation": 0, "Name": "Пусто", "Textures": [0]}

            if (dictionary === "Tops" && priceList && priceList && priceList ["Undershort"])
                returnData [-1] = {"Id": -1, "Variation": 0, "Name": "Пусто", "Textures": [0]}
        }

        if (priceList && clothesData && priceList [dictionary]) {
            priceList [dictionary].forEach((data) => {
                if (clothesData [data[0]]) {
                    returnData [data[0]] = clothesData [data[0]];

                    if (priceType === 0)
                        returnData [data[0]].Price = Number(data[1]);
                    else if (priceType === 1)
                        returnData [data[0]].Donate = Number(data[1]);
                    else if (priceType === 2)
                        returnData [data[0]].Textures = data[1].sort((a, b) => a - b);
                }
            })
        }

        return JSON.stringify(returnData);
    }

    // Event handlers

    const onSelectMenu = (data: MenuItem) => {
        if (selectMenu === data) return;

        setSelectDictionary(null);
        setIsLoad(true);
        setSelectMenu(data);
        setSelectSort(0);

        switch (viewData.type) {
            case "clothes":
                setSelectTexture(0);
                safeExecuteClient('client.clothes.getDictionary', getDictionary(data.dictionary, getClothesDictionary(gender, data.dictionary)));
                safeExecuteClient('client.clothes.updateCameraToBone', data.camera);
                break;
            case "barber":
                setSelectColor(0);
                setSelectColorHighlight(0);
                setSelectOpacity(100);
                safeExecuteClient('client.clothes.getDictionary', getDictionary(data.dictionary, getBarberDictionary(gender, data.dictionary)));
                safeExecuteClient('client.clothes.updateCameraToBone', data.camera);
                break;
            case "tattoo":
                safeExecuteClient('client.clothes.getDictionary', getDictionary(data.dictionary, getTattooDictionary(data.dictionary)));
                safeExecuteClient('client.clothes.updateCameraToBone', data.camera);
                break;
        }
    };

    const onOpen = (type: string, menuList: string | null) => {
        let parsedMenuList: number[] | false = false;

        if (menuList) {
            parsedMenuList = JSON.parse(menuList);
        }

        const newMenu: MenuItem[] = [];
        menu.forEach(data => {
            if (data.type === type && (!parsedMenuList || parsedMenuList.includes(data.dictionary)) && (!data.gender || data.gender === gender)) {
                newMenu.push(data);
            }
        });

        setMenuData(newMenu);
        if (newMenu.length > 0) {
            onSelectMenu(newMenu[0]);
        }
    };

    const updateDictionary = (json: string) => {
        if (categoryRef.current) {
            categoryRef.current.scrollTop = 0;
        }

        const parsedData = JSON.parse(json) as DictionaryItem[];
        setDictionaryData(parsedData);
        if (parsedData.length > 0) {
            onSelectDictionary(parsedData[0]);
        }
        // onSettingConditions();

        // Simulating the window.loaderData.delay functionality
        setTimeout(() => {
            setIsLoad(false);
        }, 1500);
    };

    const onSelectDictionary = (data: DictionaryItem) => {
        if (selectDictionary === data) return;

        setSelectDictionary(data);

        switch (viewData.type) {
            case "clothes":
                setSelectSort(0);
                if (data.Textures) {
                    setTextureSort(data.Textures.slice(0, length));
                    onSelectClothes(data.Textures[0]);
                }
                break;
                break;
            case "barber":
                setSelectSort(1);
                if (selectMenu?.dictionary === "Hair") {
                    const handleHairSelection = () => {
                        if (!selectDictionary || !selectMenu?.function?.[0]) return;
                        safeExecuteClient('client.clothes.setHair',
                            selectDictionary.Id,
                            selectColor,
                            selectColorHighlight);
                    };
                    handleHairSelection();
                    setSelectColor(selectColor);
                } else if (selectMenu?.dictionary === "Eyes") {
                    const handleEyesSelection = () => {
                        if (!selectDictionary) return;
                        safeExecuteClient('client.clothes.setEyes', selectDictionary.Id);
                    };
                    handleEyesSelection();
                } else {
                    const handleOverlaySelection = () => {
                        if (!selectDictionary || !selectMenu?.function?.[0]) return;
                        safeExecuteClient('client.clothes.setHeadOverlay',
                            selectMenu.function[0].overlayID || 0,
                            selectDictionary.Id,
                            selectOpacity / 100,
                            selectColor,
                            selectMenu.function[0].colorType || 0);
                    };
                    handleOverlaySelection();
                    setSelectColor(selectColor);
                }
                break;
            case "tattoo":
                const handleDecorationSelection = () => {
                    if (!selectDictionary) return;
                    safeExecuteClient('client.clothes.setDecoration',
                        selectDictionary.Dictionary || "",
                        selectDictionary.MaleHash || "",
                        selectDictionary.FemaleHash || "",
                        selectDictionary.Slots || []);
                };
                handleDecorationSelection();
                break;

        }
    };

    const onSelectClothes = (index: number) => {
        setSelectSort(0);
        setSelectTexture(index);

        if (selectDictionary) {
            safeExecuteClient('client.shop.getIndexToTextureName', selectDictionary.Name, selectDictionary.TName, index, selectDictionary.Id);

            const func = selectMenu?.function;
            if (func && func[0] && func[0].event) {
                if (selectMenu.dictionary === "Torsos") {
                    if (selectDictionary.Torsos && selectDictionary.Torsos[torso]) {
                        safeExecuteClient('client.clothes.setComponentVariation',
                            3,
                            selectDictionary.Torsos[torso],
                            index);
                    }
                } else {
                    let variation = selectDictionary.Variation;

                    if (selectDictionary.Id === -1) {
                        if (func[0].event === "setComponentVariation") {
                            // Need to implement clothesEmpty functionality
                            variation = 0; // Placeholder
                        } else {
                            variation = -1;
                        }
                    }

                    safeExecuteClient(`client.clothes.${func[0].event}`,
                        func[0].componentId,
                        variation,
                        index);
                }
            }
        }

        // onInitConditions();
    };

    // Event handlers for keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const {keyCode} = e;

        if (keyCode !== 13) {
            // Reset buy timeout
        }

        switch (keyCode) {
            case 69: // E key
                if (!menuData.length) return;

                const nextMenuIndex = menuData.findIndex(a => a === selectMenu) + 1;
                if (menuData[nextMenuIndex]) {
                    onSelectMenu(menuData[nextMenuIndex]);
                }
                break;

            case 81: // Q key
                if (!menuData.length) return;

                const prevMenuIndex = menuData.findIndex(a => a === selectMenu) - 1;
                if (menuData[prevMenuIndex]) {
                    onSelectMenu(menuData[prevMenuIndex]);
                }
                break;

            case 38: // Up arrow
                // Navigate up in dictionary items
                break;

            case 40: // Down arrow
                // Navigate down in dictionary items
                break;

            case 37: // Left arrow
                // Navigate left based on selection type
                break;

            case 39: // Right arrow
                // Navigate right based on selection type
                break;

            case 13: // Enter
                onBuy();
                break;
        }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 27) { // ESC key
            onExit();
        }
    };

    const onExit = () => {
        safeExecuteClient('client.shop.close');
    };

    const onBuy = () => {
        if (!selectDictionary || isLoad) return;

        // Implement buy timeout logic

        switch (viewData.type) {
            case "clothes":
                if (!isFraction) {
                    safeExecuteClient('client.clothes.buy', selectMenu?.dictionary, selectDictionary.Id, selectTexture);
                } else {
                    safeExecuteClient('client.table.editClothingSet', selectMenu?.dictionary, selectDictionary.Id, selectTexture);
                }
                break;
            case "barber":
                safeExecuteClient('client.barber.buy', selectMenu?.dictionary, selectDictionary.Id, selectColor, selectColorHighlight, selectOpacity);
                break;
            case "tattoo":
                safeExecuteClient('client.tattoo.buy', selectMenu?.dictionary, selectDictionary.Id);
                break;
        }
    };

    // Additional handlers and utilities would be implemented here

    // Setup event listeners
    useEffect(() => {
        // Set up event listeners for client-server communication
        const eventHandlers = {
            "cef.clothes.updateDictionary": updateDictionary,
            "cef.clothes.setName": (name: string) => {
                // Update dictionary item name
            },
            "cef.clothes.getTorso": (drawable: number, texture: number) => {
                // Handle torso data
            },
            "cef.clothes.getTop": (drawable: number) => {
                // Handle top data
            },
            "cef.clothes.getColor": (json: string) => {
                // Handle color data
            }
        };

        // Add event listeners
        Object.entries(eventHandlers).forEach(([event, handler]) => {
            // window.events.addEvent(event, handler);
        });

        // Initial setup
        onOpen(viewData.type, viewData.menuList || null);

        // Cleanup event listeners
        return () => {
            Object.entries(eventHandlers).forEach(([event, handler]) => {
                // window.events.removeEvent(event, handler);
            });
        };
    }, []);

    // Mouse control handlers
    const handleMouseUse = (toggled: boolean) => {
        safeExecuteClient("client.camera.toggled", toggled);
    };

    return (
        <div
            id="newbarbershop"
            className="w-full h-full flex flex-col bg-black/80 text-white"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
        >
            {/* Time display */}
            <div className="absolute top-4 right-4">
                <div className="text-lg font-bold">{TimeFormat(serverDateTime, "H:mm")}</div>
                <div className="text-sm text-gray-300">{TimeFormat(serverDateTime, "DD.MM.YYYY")}</div>
            </div>

            {/* Top menu - categories */}
            <div className="w-full p-4 border-b border-gray-700">
                <div
                    className="flex items-center justify-center space-x-2"
                    onMouseEnter={() => handleMouseUse(false)}
                    onMouseLeave={() => handleMouseUse(true)}
                >
                    <div className="px-3 py-1 bg-gray-700 rounded">Q</div>

                    {menuData.map((data, index) => (
                        <div
                            key={`category-${index}`}
                            className={`p-2 rounded cursor-pointer ${selectMenu === data ? 'bg-primary text-white' : 'bg-gray-800 hover:bg-gray-700'}`}
                            onClick={() => onSelectMenu(data)}
                        >
                            <div className={`${data.icon} text-xl`}></div>
                        </div>
                    ))}

                    <div className="px-3 py-1 bg-gray-700 rounded">E</div>
                </div>
                <div className="text-center mt-2 text-gray-300">
                    {translateText('business', 'Выбор категории')}
                </div>
            </div>

            {/* Main content area */}
            <div className="flex flex-1 p-4">
                {/* Item selection menu */}
                <div className="w-1/3 bg-gray-900 p-4 rounded-lg mr-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className="px-2 py-1 bg-gray-700 rounded mr-2">
                                <span className="icon-updown"></span>
                            </div>
                            <div>{translateText('business', 'Выбор')} {selectMenu?.title}</div>
                        </div>
                        <div className="text-sm text-gray-400">
                            {translateText('business', 'В ассортименте')} {dictionaryData.length} {translateText('business', 'шт.')}.
                        </div>
                    </div>

                    <div
                        className="h-64 overflow-y-auto pr-2"
                        ref={categoryRef}
                        onMouseEnter={() => handleMouseUse(false)}
                        onMouseLeave={() => handleMouseUse(true)}
                    >
                        {dictionaryData.map((data, index) => (
                            <div
                                key={`item-${index}`}
                                id={`menu_${index}`}
                                className={`p-3 mb-2 rounded cursor-pointer relative ${selectDictionary === data ? 'bg-primary text-white' : 'bg-gray-800 hover:bg-gray-700'}`}
                                onClick={() => onSelectDictionary(data)}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="font-medium">{data.descName}</div>
                                    {!isFraction && (
                                        data.Donate > 0 ? (
                                            <div className="text-yellow-400">{format("money", data.Donate.toString())} RB</div>
                                        ) : data.Price > 0 ? (
                                            <div className="text-green-400">$ {format("money", data.Price.toString())}</div>
                                        ) : null
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Texture/Color selectors would be rendered here based on conditions */}
                    {selectDictionary?.Textures && selectDictionary.Textures.length > 0 && (
                        <div className="mt-4">
                            <div className="flex items-center mb-2 opacity-50">
                                <div className="px-2 py-1 bg-gray-700 rounded mr-2">
                                    <span className="icon-leftright"></span>
                                </div>
                                <div>{translateText('business', 'Вариаций')}: {selectDictionary.Textures.length} {translateText('business', 'шт')}.</div>
                            </div>

                            <div className="flex flex-wrap gap-2" onMouseEnter={() => handleMouseUse(false)} onMouseLeave={() => handleMouseUse(true)}>
                                {textureSort.map((index) => (
                                    <div
                                        key={`texture-${index}`}
                                        className={`w-8 h-8 flex items-center justify-center rounded cursor-pointer ${selectTexture === index ? 'bg-primary' : 'bg-gray-700 hover:bg-gray-600'}`}
                                        onClick={() => onSelectClothes(index)}
                                    >
                                        {index}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectMenu?.opacity && (
                        <div className="mt-4">
                            <InputItem
                                id="selectOpacity"
                                leftText="0"
                                centerText="Насыщенность"
                                rightText="100"
                                step={0.1}
                                min={0}
                                max={1}
                                value={selectOpacity}
                                callback={(newValue) => setSelectOpacity(newValue)}
                                className="mt-2"
                            />
                        </div>
                    )}
                </div>

                {/* Help panel */}
                <div className="flex-1 bg-gray-900 p-4 rounded-lg">
                    <div className="text-lg mb-4">{translateText('business', 'Используйте горячие клавиши для быстрого перемещения по интерфейсу')}:</div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="flex items-center">
                            <div className="px-3 py-1 bg-gray-700 rounded mr-2">←→</div>
                            <div>{translateText('business', 'Выбор варианта')}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="px-3 py-1 bg-gray-700 rounded mr-2">↑↓</div>
                            <div>{translateText('business', 'Выбор предмета')}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="px-3 py-1 bg-gray-700 rounded mr-2">Q</div>
                            <div>{translateText('business', 'Предыдущая категория')}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="px-3 py-1 bg-gray-700 rounded mr-2">E</div>
                            <div>{translateText('business', 'Следующая категория')}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom buttons */}
            <div className="flex items-center justify-between p-4 border-t border-gray-700">
                <div className="flex items-center">
                    <div className="px-3 py-1 bg-gray-700 rounded mr-2">Enter</div>
                    <button
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                        onClick={onBuy}
                    >
                        {!isFraction ? translateText('business', 'Купить') : translateText('business', 'Установить')}
                    </button>
                </div>
                <div className="flex items-center">
                    <button
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded mr-2"
                        onClick={onExit}
                    >
                        {translateText('business', 'Выйти')}
                    </button>
                    <div className="px-3 py-1 bg-gray-700 rounded">ESC</div>
                </div>
            </div>
        </div>
    );
};

export default ClothesShop;