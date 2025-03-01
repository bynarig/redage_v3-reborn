import React, {useEffect, useState} from "react";
import {executeClient} from "#api/rage";
import {useTranslateText} from "#shared/locale";
import {format} from "#api/formatter";
import carInfo from "./carInfo.js";
import {IconArmchair, IconArrowBigRightLines, IconBrandCashapp, IconBrandSpeedtest, IconPackage, IconSteeringWheel} from "@tabler/icons-react";
import {generateMockCars} from "#mock/cars";
import Button from "#shared/ui/Button";
import ColorPicker from "#shared/ui/ColorPicker";

const AutoShop: React.FC = () => {
    const [selectedColor, setSelectedColor] = useState<string>("#000000");

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
        executeClient("auto", "color", color); // Send the color to the backend
    };
    const translateText = useTranslateText();
    const [list, setList] = useState<any[]>([]);
    const [select, setSelect] = useState<number>(-1);
    const [sordId, setSordId] = useState<string>("");
    const [colorId, setColorId] = useState<number>(0);
    const [isDonateAutoroom, setIsDonateAutoroom] = useState<boolean>(false);

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            const mockCars = generateMockCars();
            setList(mockCars);
        } else {
            window.authShop = {
                data: (value: string, isDonate: boolean = false) => {
                    let returnList: any[] = [];
                    let modelInfo;
                    JSON.parse(value).forEach((value: any) => {
                        modelInfo = carInfo[value.modelName] || false;

                        returnList = [
                            ...returnList,
                            {
                                ...value,
                                speed: !modelInfo || (modelInfo && !modelInfo.maxSpeed) ? value.speed : modelInfo.maxSpeed,
                                boost: !modelInfo || (modelInfo && !modelInfo.acceleration) ? value.boost : modelInfo.acceleration,
                                seat: !modelInfo || (modelInfo && !modelInfo.seats) ? value.seat : modelInfo.seats,
                                invslots: value.invslots !== undefined ? value.invslots : 25,
                                desc: !modelInfo ? false : modelInfo.desc,
                            },
                        ];
                    });
                    setList(returnList);
                    setIsDonateAutoroom(isDonate);
                },
            };
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                executeClient("closeAuto");
            }
        };

        window.addEventListener("keyup", handleKeyDown);
        return () => window.removeEventListener("keyup", handleKeyDown);
    }, []);

    const sort = (value: string) => {
        if (sordId === value) return;
        let sortList = [...list];
        let sortSelect = -1;
        if (select !== -1 && list[select]) sortSelect = list[select].index;
        setSordId(value);
        sortList.sort((a, b) => b[value] - a[value]);
        if (sortSelect !== -1) {
            sortList.forEach((value, index) => {
                if (sortSelect === value.index) {
                    setSelect(index);
                }
            });
        }
        setList(sortList);
    };

    const setItem = (index: number) => {
        if (!list[index]) return;
        else if (index === select) return;
        setSelect(index);
        executeClient("auto", "model", list[index].index);
    };

    const setColor = (index: number) => {
        if (index === colorId) return;
        setColorId(index);
        executeClient("auto", "color", index);
    };

    const setRgbColor = (color: string) => {
        executeClient("auto", "rgbColor", color);
    };

    const startTestDrive = (type: number) => {
        if (select === -1 || !list[select]) return;
        executeClient("testDrive", type);
    };

    return (
        <div className="absolute w-full h-full flex flex-col items-center justify-between pt-20 pb-20 pl-8 pr-8 text-white font-bold">
            <div className="flex  justify-between w-full ">
                <div className="w-96 h-auto pt-2.5 pb-2.5 flex flex-col items-center bg-[rgba(1,22,39,0.8)] rounded-lg" onMouseEnter={() => executeClient("client.camera.toggled", false)} onMouseLeave={() => executeClient("client.camera.toggled", true)}>
                    <IconSteeringWheel stroke={2}/>
                    <div className="mt-7 text-2xl">{translateText("business.Автосалон")}</div>
                    <div className="mt-6 w-[330px] flex justify-between">
                        <button className={`w-16 h-16 border border-[#C1C1C1] bg-transparent rounded-lg flex items-center justify-center cursor-pointer transition-all ${sordId === "price" ? "border-0 bg-white" : ""}`} onClick={() => sort("price")}>
                            <IconBrandCashapp stroke={2}/>
                        </button>
                        <button className={`w-16 h-16 border border-[#C1C1C1] bg-transparent rounded-lg flex items-center justify-center cursor-pointer transition-all ${sordId === "speed" ? "border-0 bg-white" : ""}`} onClick={() => sort("speed")}>
                            <IconBrandSpeedtest stroke={2}/>
                        </button>
                        <button className={`w-16 h-16 border border-[#C1C1C1] bg-transparent rounded-lg flex items-center justify-center cursor-pointer transition-all ${sordId === "seat" ? "border-0 bg-white" : ""}`} onClick={() => sort("seat")}>
                            <IconArmchair stroke={2}/>
                        </button>
                        <button className={`w-16 h-16 border border-[#C1C1C1] bg-transparent rounded-lg flex items-center justify-center cursor-pointer transition-all ${sordId === "boost" ? "border-0 bg-white" : ""}`} onClick={() => sort("boost")}>
                            <IconArrowBigRightLines stroke={2}/>
                        </button>
                    </div>
                    <div className="w-full h-80 mt-2.5 mr-2.5 pl-10 pr-6 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-[#131924] scrollbar-thumb-white scrollbar-rounded">
                        {list.map((value, index) => (
                            <div key={index} className={`h-9 flex items-center justify-between pl-4 pr-3.5 text-xl cursor-pointer rounded-sm font-medium text-[#C1C1C1] transition-all ${select === index ? "bg-white text-black" : ""}`} onClick={() => setItem(index)}>
                                <div dangerouslySetInnerHTML={{__html: value.modelName}}/>
                                <span className="font-bold">{format("money", value.price)}{isDonateAutoroom ? "RB" : "$"}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {select !== -1 && list[select] && (
                    <div className="flex flex-col items-center bg-[rgba(1,22,39,0.8)] rounded-lg w-96 pt-8 pb-7" onMouseEnter={() => executeClient("client.camera.toggled", false)} onMouseLeave={() => executeClient("client.camera.toggled", true)}>
                        <div className="w-[330px] flex items-center justify-between">
                            <div className="text-3xl leading-9">{list[select].modelName}</div>
                            <span className="text-white text-5xl"/>
                        </div>
                        {list[select].desc && (
                            <div className="mt-2.5 w-[330px] text-sm leading-3 text-[#C1C1C1]">
                                <span className="text-white">{list[select].modelName} - </span>
                                {list[select].desc}
                            </div>
                        )}
                        <div className="w-[330px] text-2xl leading-6 mt-6">{translateText("business.Характеристики")}:</div>
                        <div className="w-[330px] text-xl leading-5 mt-3.5">
                            <div className="w-full mt-5 flex items-center justify-between">
                                <div className="text-[#C1C1C1] font-medium flex items-center">
                                    <IconBrandCashapp stroke={2}/>
                                    {translateText("business.Гос.стоимость")}:
                                </div>
                                {format("money", list[select].gosPrice)}
                            </div>
                            <div className="w-full mt-5 flex items-center justify-between">
                                <div className="text-[#C1C1C1] font-medium flex items-center">
                                    <IconBrandSpeedtest stroke={2}/>
                                    {translateText("business.Макс.скорость")}:
                                </div>
                                {list[select].speed}
                            </div>
                            <div className="w-full mt-5 flex items-center justify-between">
                                <div className="text-[#C1C1C1] font-medium flex items-center">
                                    <IconArrowBigRightLines stroke={2}/>
                                    {translateText("business.Разгон")}:
                                </div>
                                {list[select].boost}
                            </div>
                            <div className="w-full mt-5 flex items-center justify-between">
                                <div className="text-[#C1C1C1] font-medium flex items-center">
                                    <IconArmchair stroke={2}/>
                                    {translateText("business.Кол-во мест")}:
                                </div>
                                {list[select].seat}
                            </div>
                            <div className="w-full mt-5 flex items-center justify-between">
                                <div className="text-[#C1C1C1] font-medium flex items-center">
                                    <IconPackage stroke={2}/>
                                    {translateText("business.Багажных мест")}:
                                </div>
                                {list[select].invslots}
                            </div>
                        </div>
                        <div className="w-[330px] text-2xl leading-6 mt-6">{translateText("business.Цвет")}:</div>
                        <ColorPicker
                            selectedColor={selectedColor}
                            onColorChange={handleColorChange}
                        />
                        <button className="mt-6 w-[330px] h-14 border-0 bg-white flex items-center justify-center text-xl rounded-md cursor-pointer text-black font-bold hover:opacity-80" onClick={() => startTestDrive(1)}>
                            {translateText("business.Тест-драйв")} (100$)
                        </button>
                        <button className="mt-6 w-[330px] h-14 border-0 bg-white flex items-center justify-center text-xl rounded-md cursor-pointer text-black font-bold hover:opacity-80" onClick={() => startTestDrive(2)}>
                            {translateText("business.Тест-драйв FT")} (300$)
                        </button>
                    </div>
                )}
            </div>
            <div className="relative" onMouseEnter={() => executeClient("client.camera.toggled", false)} onMouseLeave={() => executeClient("client.camera.toggled", true)}>
                {select !== -1 && list[select] && (
                    <>
                        <Button
                            name={`${translateText("business.business.Купить за")} ${isDonateAutoroom ? `${format("money", list[select].price)}RB` : `$${format("money", list[select].price)}`}`}
                            onClick={() => executeClient("buyAuto", 1)}
                        />
                        <Button
                            name={`${translateText("business.Купить для семьи за")} ${isDonateAutoroom ? `${format("money", list[select].price)}RB` : `$${format("money", list[select].gosPrice)}`}`}
                            onClick={() => executeClient("buyAuto", 2)}
                        />
                    </>
                )}
                <Button
                    name={`${translateText("business.Выйти")}`}
                    onClick={() => executeClient("closeAuto")}
                />
            </div>
        </div>
    );
};

export default AutoShop;