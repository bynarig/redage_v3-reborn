// components/NewBarberShop.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '#/shared/store';
import { useTranslateText } from '#/shared/locale';
import { executeClient } from '#api/rage';
import { TimeFormat } from '#api/moment';
import { format } from '#api/formatter';
import {getClothesDictionary, getBarberDictionary, getTattooDictionary, menu} from "#shared/data/clothes";
// import { clothesName } from '#views/player/menu/elements/inventory/functions';
import InputBlock from './InputItem';
import {clothesEmpty} from "#shared/data/clothes";

const NewBarberShop: React.FC = () => {
      const translateText = useTranslateText();

  const dispatch = useDispatch();
  const serverDateTime = useSelector((state: RootState) => state.server.dateTime);
  const charGender = useSelector((state: RootState) => state.char.gender);

  const [viewData, setViewData] = useState({
    type: 'clothes',
    menuList: '',
    priceType: 0,
    priceList: '{"Masks":[{"DrawableId":36,"Textures":[36]},{"DrawableId":46,"Textures":[46]},{"DrawableId":175,"Textures":[175]}],"Undershirts":[{"DrawableId":31,"Textures":[31]},{"DrawableId":32,"Textures":[32]},{"DrawableId":33,"Textures":[33,1]},{"DrawableId":34,"Textures":[34,1]},{"DrawableId":69,"Textures":[69,1]}],"Shoes":[{"DrawableId":1,"Textures":[1,1,2,13,14,15]},{"DrawableId":7,"Textures":[7,1,2]},{"DrawableId":9,"Textures":[9,1,2]},{"DrawableId":21,"Textures":[21,1,2,3,4,5,6,7,8,9,10,11]},{"DrawableId":24,"Textures":[24]},{"DrawableId":25,"Textures":[25]},{"DrawableId":36,"Textures":[36,1,2,3]},{"DrawableId":71,"Textures":[71,3,4]},{"DrawableId":73,"Textures":[73]}],"Legs":[{"DrawableId":10,"Textures":[10,1,2]},{"DrawableId":20,"Textures":[20]},{"DrawableId":24,"Textures":[24,1,5]},{"DrawableId":25,"Textures":[25,1,5]},{"DrawableId":28,"Textures":[28,1,3,6,8,10,14,15]},{"DrawableId":52,"Textures":[52]},{"DrawableId":129,"Textures":[129]}],"Accessories":[{"DrawableId":10,"Textures":[10,1,2]},{"DrawableId":11,"Textures":[11]},{"DrawableId":12,"Textures":[12,1,2]},{"DrawableId":36,"Textures":[36]},{"DrawableId":115,"Textures":[115,1]},{"DrawableId":127,"Textures":[127]},{"DrawableId":126,"Textures":[126]}],"Tops":[{"DrawableId":29,"Textures":[29,5,7]},{"DrawableId":31,"Textures":[31,5,7]},{"DrawableId":234,"Textures":[234]},{"DrawableId":337,"Textures":[337,5]},{"DrawableId":348,"Textures":[348,2,5,8,10,12]},{"DrawableId":349,"Textures":[349,2,5,8,10,12]}],"Decals":[{"DrawableId":57,"Textures":[57]},{"DrawableId":58,"Textures":[58,1]}],"Hat":[{"DrawableId":122,"Textures":[122,1]}],"Glasses":[{"DrawableId":18,"Textures":[18,2,3,5,6,7,9,10]},{"DrawableId":5,"Textures":[5,1,2,3,4,5,6,7,8,9,10]},{"DrawableId":25,"Textures":[25]},{"DrawableId":26,"Textures":[26]}]}',
    gender: charGender,
  });

  let [menuData, setMenuData] = useState([]);
  let [selectMenu, setSelectMenu] = useState({});
  let [isFraction, setIsFraction] = useState(viewData.priceType === 2);
  let [isLoad, setIsLoad] = useState(false);
  let [selectDictionary, setSelectDictionary] = useState(false);
  let [selectTexture, setSelectTexture] = useState(0);
  let [dictionaryData, setDictionaryData] = useState([]);
  let [textureSort, setTextureSort] = useState([]);
  let [selectSort, setSelectSort] = useState(0);
  let [torso, setTorso] = useState(clothesEmpty[charGender ? "Male" : "Female"][3]);
  let [torsos, setTorsos] = useState({});
  let [torsosTexture, setTorsosTexture] = useState(0);
  let [colorsData, setColorsData] = useState([]);
  let [colorsDataSort, setColorsDataSort] = useState([]);
  let [selectColor, setSelectColor] = useState(0);
  let [colorsHighlightData, setColorsHighlightData] = useState([]);
  let [colorsHighlightDataSort, setColorsHighlightDataSort] = useState([]);
  let [selectColorHighlight, setSelectColorHighlight] = useState(0);
  let [selectOpacity, setSelectOpacity] = useState(100);

  const refCategory = useRef(null);

  useEffect(() => {
    OnOpen(viewData.type, viewData.menuList);
  }, [viewData.type, viewData.menuList]);

  const OnOpen = (type, menuList) => {
    if (menuList) menuList = JSON.parse(menuList);
    else menuList = false;

    let newMenu = [];
    menu.forEach(data => {
      if (data.type == type && (!menuList || menuList.includes(data.dictionary)) && (!data.gender || data.gender === (charGender ? "Male" : "Female"))) {
        newMenu.push(data);
      }
    });

    setMenuData(newMenu);
    onSelectMenu(newMenu[0]);
  };

  const onSelectMenu = data => {
    if (selectMenu == data) return;

    setSelectDictionary(false);
    setIsLoad(true);
    setSelectMenu(data);
    setSelectSort(0);

    switch (viewData.type) {
      case "clothes":
        setSelectTexture(0);
        executeClient('client.clothes.getDictionary', getDictionary(data.dictionary, getClothesDictionary(charGender ? "Male" : "Female", data.dictionary)));
        executeClient('client.clothes.updateCameraToBone', data.camera);
        break;
      case "barber":
        setSelectColor(0);
        setSelectColorHighlight(0);
        setSelectOpacity(100);
        executeClient('client.clothes.getDictionary', getDictionary(data.dictionary, getBarberDictionary(charGender ? "Male" : "Female", data.dictionary)));
        executeClient('client.clothes.updateCameraToBone', data.camera);
        break;
      case "tattoo":
        executeClient('client.clothes.getDictionary', getDictionary(data.dictionary, getTattooDictionary(data.dictionary)));
        executeClient('client.clothes.updateCameraToBone', data.camera);
        break;
    }
  };

  const getDictionary = (dictionary, clothesData) => {
    clothesData = JSON.parse(clothesData);
    const priceList = JSON.parse(viewData.priceList);
    const priceType = viewData.priceType;

    let returnData = {};

    if (priceType === 2) {
      if (!["Tops", "Legs", "Shoes"].includes(dictionary))
        returnData[-1] = { "Id": -1, "Variation": 0, "Name": "Пусто", "Textures": [0] };

      if (dictionary === "Undershort")
        returnData[-1] = { "Id": -1, "Variation": 0, "Name": "Пусто", "Textures": [0] };

      if (dictionary === "Tops" && priceList && priceList["Undershort"])
        returnData[-1] = { "Id": -1, "Variation": 0, "Name": "Пусто", "Textures": [0] };
    }

    if (priceList && clothesData && priceList[dictionary]) {
      priceList[dictionary].forEach((data) => {
        if (clothesData[data[0]]) {
          returnData[data[0]] = clothesData[data[0]];

          if (priceType === 0)
            returnData[data[0]].Price = Number(data[1]);
          else if (priceType === 1)
            returnData[data[0]].Donate = Number(data[1]);
          else if (priceType === 2)
            returnData[data[0]].Textures = data[1].sort((a, b) => a - b);
        }
      });
    }

    return JSON.stringify(returnData);
  };

  const UpdateDictionary = (json) => {
    if (refCategory.current)
      refCategory.current.scrollTop = 0;

    setDictionaryData(JSON.parse(json));
    OnSelectDictionary(dictionaryData[0]);
    OnSettingConditions();

    window.loaderData.delay("clothes.OnBuy", 1.5, false);
    setIsLoad(false);
    window.loaderData.delay("clothes.OnBuy", 1.5, false);
  };

  const OnSelectDictionary = data => {
    if (selectDictionary == data) return;

    setSelectDictionary(data);

    switch (viewData.type) {
      case "clothes":
        setSelectSort(0);
        if (data.Textures) {
          setTextureSort(data.Textures.slice(0, 8));
          OnSelectClothes(data.Textures[0]);
        }
        break;
      case "barber":
        setSelectSort(1);
        if (selectMenu.dictionary == "Hair") {
          OnSelectHair();
          OnSelectColor(selectColor);
        } else if (selectMenu.dictionary == "Eyes")
          OnSelectEyes();
        else {
          OnSelectOverlay();
          OnSelectColor(selectColor);
        }
        break;
      case "tattoo":
        OnSetDecoration();
        break;
    }
  };

  const OnSelectClothes = (index) => {
    setSelectSort(0);
    setSelectTexture(index);
    executeClient('client.shop.getIndexToTextureName', selectDictionary.Name, selectDictionary.TName, selectTexture, selectDictionary.Id);

    const func = selectMenu.function;
    if (func && func[0] && func[0].event) {
      if (selectMenu.dictionary === "Torsos") {
        if (selectDictionary.Torsos[torso]) {
          executeClient('client.clothes.setComponentVariation', 3, selectDictionary.Torsos[torso], selectTexture);
        }
      } else {
        let variation = selectDictionary.Variation;

        if (selectDictionary.Id == -1) {
          if (func[0].event === "setComponentVariation")
            variation = clothesEmpty[charGender ? "Male" : "Female"][func[0].componentId];
          else
            variation = -1;
        }

        executeClient('client.clothes.' + func[0].event, func[0].componentId, variation, selectTexture);
      }
    }

    OnInitConditions();
  };

  const OnSelectHair = () => {
    const func = selectMenu.function;
    if (func && func[0] && func[0].event)
      executeClient('client.clothes.setComponentVariation', func[0].componentId, selectDictionary.Variation, 0);
    OnInitConditions();
  };

  const OnSelectEyes = () => {
    const func = selectMenu.function;
    if (func && func[0] && func[0].event)
      executeClient('client.clothes.setEyeColor', selectDictionary.Variation);
    OnInitConditions();
  };

  const OnSelectOverlay = () => {
    const func = selectMenu.function;
    if (func && func[0] && func[0].event)
      executeClient('client.clothes.setHeadOverlay', func[0].overlayID, selectDictionary.Variation, selectOpacity);
    OnInitConditions();
  };

  const OnSetDecoration = () => {
    if (charGender ? "Male" : "Female" == "Male")
      executeClient('client.clothes.setDecoration', selectMenu.tattooId, JSON.stringify(selectDictionary.Slots), selectDictionary.Dictionary, selectDictionary.MaleHash);
    else
      executeClient('client.clothes.setDecoration', selectMenu.tattooId, JSON.stringify(selectDictionary.Slots), selectDictionary.Dictionary, selectDictionary.FemaleHash);
    OnInitConditions();
  };

  const OnSelectColor = (colorId) => {
    setSelectSort(1);
    setSelectColor(colorId);
    const func = selectMenu.function;
    if (func && func[1] && func[1].event) {
      if (selectMenu.dictionary == "Hair")
        executeClient('client.clothes.setHairColor', selectColor, selectColorHighlight);
      else if (func[1].overlayID)
        executeClient('client.clothes.setHeadOverlayColor', func[1].overlayID, func[1].colorType, selectColor);
    }
    OnInitConditions();
  };

  const OnSelectColorHighlight = (colorId) => {
    setSelectSort(2);
    setSelectColorHighlight(colorId);
    const func = selectMenu.function;
    if (func && func[1] && func[1].event) {
      if (selectMenu.dictionary == "Hair")
        executeClient('client.clothes.setHairColor', selectColor, selectColorHighlight);
    }
    OnInitConditions();
  };

  const OnSelectOpacity = (opacity) => {
    setSelectOpacity(opacity);
    const func = selectMenu.function;
    if (func && func[0] && func[0].event) {
      executeClient('client.clothes.setHeadOverlay', func[0].overlayID, selectDictionary.Variation, selectOpacity);
      executeClient('client.clothes.setHeadOverlayColor', func[1].overlayID, func[1].colorType, selectColor);
    }
    OnInitConditions();
  };

  const getName = (name) => {
    if (typeof name == "number") {
      if (clothesName[`${selectMenu.dictionary}_${name}_${charGender ? "Male" : "Female"}`]) name = clothesName[`${selectMenu.dictionary}_${name}_${charGender ? "Male" : "Female"}`];
      else if (clothesName[`${selectMenu.dictionary}_${name}`]) name = clothesName[`${selectMenu.dictionary}_${name}`];
      else name = `#${name}`;
    }
    return name;
  };

  const MouseUse = (toggled) => {
    executeClient("client.camera.toggled", toggled);
  };

  const OnSettingConditions = () => {
    if (["Body", "Torso", "LeftArm", "RightArm"].includes(selectMenu.dictionary) || (selectDictionary && selectDictionary.Torso != undefined)) {
      executeClient('client.clothes.getTorso');
    }

    if (selectDictionary && selectDictionary.Torsos != undefined) {
      executeClient('client.clothes.getTop');
    }

    if (selectMenu.color != undefined) {
      executeClient('client.clothes.getColor', selectMenu.isHair);
    }
  };

  const GetTorso = (drawable, texture) => {
    setTorsos({});
    setTorsosTexture(texture);
    const defaultTorsos = [0, 1, 2, 4, 5, 6, 8, 11, 12, 14, 15, 112, 113, 114];
    if (!defaultTorsos.includes(drawable)) {
      const torsosData = JSON.parse(getClothesDictionary(charGender ? "Male" : "Female", "Torsos"));
      Object.values(torsosData).forEach((data) => {
        if (data && data.Torsos && Object.values(data.Torsos)) {
          Object.values(data.Torsos).forEach((torso) => {
            if (torso === drawable) {
              setTorsos(data.Torsos);
            }
          });
        }
      });
    }
    OnInitConditions();
  };

  const GetTop = (drawable) => {
    setTorso(clothesEmpty[charGender ? "Male" : "Female"][3]);
    if (torso != drawable) {
      let isSuccess = false;
      const topsData = JSON.parse(getClothesDictionary(charGender ? "Male" : "Female", "Tops"));
      Object.values(topsData).forEach((data) => {
        if (data && data.Variation == drawable) {
          setTorso(data.Torso);
          isSuccess = true;
        }
      });
      if (!isSuccess) {
        const undershortData = JSON.parse(getClothesDictionary(charGender ? "Male" : "Female", "Undershort"));
        Object.values(undershortData).forEach((data) => {
          if (data && data.Variation == drawable) {
            setTorso(data.Torso);
          }
        });
      }
    }
    OnInitConditions();
  };

  const OnInitConditions = () => {
    if (selectDictionary && selectDictionary.Torso != undefined) {
      executeClient('client.clothes.setComponentVariation', 8, clothesEmpty[charGender ? "Male" : "Female"][8], 0, false);

      if (torsos[selectDictionary.Torso])
        executeClient('client.clothes.setComponentVariation', 3, torsos[selectDictionary.Torso], torsosTexture, false);
      else
        executeClient('client.clothes.setComponentVariation', 3, selectDictionary.Torso, torsosTexture, false);
    }

    if (selectDictionary.IsHair != undefined) {
      executeClient('client.clothes.setComponentVariation', 2, 0, 0, false);
    }

    if (selectDictionary.IsHat != undefined) {
      executeClient('client.clothes.clearProp', 0);
    }

    if (selectDictionary.IsGlasses != undefined) {
      executeClient('client.clothes.clearProp', 1);
      executeClient('client.clothes.clearProp', 2);
    }

    if (["Masks"].includes(selectMenu.dictionary)) {
      executeClient('client.clothes.clearMask');
    }

    if (["Hat", "Glasses", "Ears"].includes(selectMenu.dictionary)) {
      executeClient('client.clothes.setComponentVariation', 1, clothesEmpty[charGender ? "Male" : "Female"][1], 0, false);
    }

    if (["Hair", "Beard", "Eyebrows", "Eyes", "Lips", "Palette", "Makeup"].includes(selectMenu.dictionary)) {
      executeClient('client.clothes.setComponentVariation', 1, clothesEmpty[charGender ? "Male" : "Female"][1], 0, false);
      executeClient('client.clothes.clearProp', 0);
    }

    if (["Eyebrows", "Eyes", "Makeup"].includes(selectMenu.dictionary)) {
      executeClient('client.clothes.clearProp', 1);
    }

    if (["Body"].includes(selectMenu.dictionary)) {
      if (torsos[clothesEmpty[charGender ? "Male" : "Female"][3]])
        executeClient('client.clothes.setComponentVariation', 3, torsos[clothesEmpty[charGender ? "Male" : "Female"][3]], torsosTexture, false);
      else
        executeClient('client.clothes.setComponentVariation', 3, clothesEmpty[charGender ? "Male" : "Female"][3], torsosTexture, false);

      executeClient('client.clothes.setComponentVariation', 8, clothesEmpty[charGender ? "Male" : "Female"][8], 0, false);
      executeClient('client.clothes.setComponentVariation', 11, clothesEmpty[charGender ? "Male" : "Female"][11], 0, false);
    }

    if (["Head"].includes(selectMenu.dictionary)) {
      executeClient('client.clothes.setComponentVariation', 1, clothesEmpty[charGender ? "Male" : "Female"][1], 0, false);
      executeClient('client.clothes.clearProp', 0);
    }

    if (["Torso", "LeftArm", "RightArm"].includes(selectMenu.dictionary)) {
      if (torsos[clothesEmpty[charGender ? "Male" : "Female"][3]])
        executeClient('client.clothes.setComponentVariation', 3, torsos[clothesEmpty[charGender ? "Male" : "Female"][3]], torsosTexture, false);
      else
        executeClient('client.clothes.setComponentVariation', 3, clothesEmpty[charGender ? "Male" : "Female"][3], torsosTexture, false);

      executeClient('client.clothes.setComponentVariation', 8, clothesEmpty[charGender ? "Male" : "Female"][8], 0, false);
      executeClient('client.clothes.setComponentVariation', 11, clothesEmpty[charGender ? "Male" : "Female"][11], 0, false);
    }

    if (["LeftLeg", "RightLeg"].includes(selectMenu.dictionary)) {
      executeClient('client.clothes.setComponentVariation', 4, clothesEmpty[charGender ? "Male" : "Female"][4], 0, false);
    }
  };

  const SplitColorsArray = (select, array, sortArray) => {
    let index = array.findIndex(a => a == sortArray[0]);
    if (index != -1 && (index - 1) === select) {
      return array.slice((index - 1), (index - 1) + 8);
    }

    index = array.findIndex(a => a == sortArray[7]);
    if (index != -1 && (index + 1) === select) {
      index = array.findIndex(a => a == sortArray[0]);
      if (index != -1)
        return array.slice((index + 1), (index + 1) + 8);
    }
    return -1;
  };

  const GetColor = (json) => {
    setColorsData(JSON.parse(json));
    setColorsDataSort(colorsData.slice(0, 8));

    if (selectMenu.colorHighlight) {
      setColorsHighlightData(colorsData);
      setColorsHighlightDataSort(colorsDataSort);
    }
  };

  const handleKeyDown = (event) => {
    const { keyCode } = event;

    if (keyCode != 13)
      window.loaderData.delay("clothes.OnBuy", 1.5, false);

    switch (keyCode) {
      case 69: {
        if (!menuData)
          return;

        let index = menuData.findIndex(a => a == selectMenu);
        if (menuData[index + 1] === undefined)
          return;

        index++;
        onSelectMenu(menuData[index]);
        break;
      }
      case 81: {
        if (!menuData)
          return;

        let index = menuData.findIndex(a => a == selectMenu);
        if (menuData[index - 1] === undefined)
          return;

        index--;
        onSelectMenu(menuData[index]);
        break;
      }
      case 38: {
        if (!dictionaryData)
          return;

        let index = dictionaryData.findIndex(a => a == selectDictionary);
        if (dictionaryData[index - 1] === undefined)
          return;

        index--;
        OnSelectDictionary(dictionaryData[index]);

        const el = document.querySelector(`#menu_${index}`);
        const bounds = el.getBoundingClientRect();
        refCategory.current.scrollTop = (bounds.height * index) + ((bounds.height / 10) * index);
        break;
      }
      case 40: {
        if (!dictionaryData)
          return;

        let index = dictionaryData.findIndex(a => a == selectDictionary);
        if (dictionaryData[index + 1] === undefined)
          return;

        index++;
        OnSelectDictionary(dictionaryData[index]);

        const el = document.querySelector(`#menu_${index}`);
        const bounds = el.getBoundingClientRect();
        refCategory.current.scrollTop = (bounds.height * index) + ((bounds.height / 10) * index);
        break;
      }
      case 37:
        switch (selectSort) {
          case 0:
            if (!selectDictionary.Textures)
              return;

            let index = selectDictionary.Textures.findIndex(a => a == selectTexture);
            if (selectDictionary.Textures[index - 1] === undefined)
              return;

            OnSelectClothes(selectDictionary.Textures[index - 1]);

            let returnSort = SplitColorsArray(selectTexture, selectDictionary.Textures, textureSort);

            if (returnSort != -1)
              setTextureSort(returnSort);
            break;
          case 1:
            if (--selectColor < 0)
              setSelectColor(0);
            else {
              OnSelectColor(selectColor);
              let returnSort = SplitColorsArray(selectColor, colorsDataSort, colorsData);
              if (returnSort != -1)
                setColorsDataSort(returnSort);
            }
            break;
          case 2:
            if (--selectColorHighlight < 0)
              setSelectColorHighlight(0);
            else {
              OnSelectColorHighlight(selectColorHighlight);
              let returnSort = SplitColorsArray(selectColorHighlight, colorsHighlightDataSort, colorsHighlightData);
              if (returnSort != -1)
                setColorsHighlightDataSort(returnSort);
            }
            break;
        }
        break;
      case 39:
        switch (selectSort) {
          case 0:
            if (selectDictionary.Textures === undefined)
              return;

            let index = selectDictionary.Textures.findIndex(a => a == selectTexture);
            if (selectDictionary.Textures[index + 1] === undefined)
              return;

            OnSelectClothes(selectDictionary.Textures[index + 1]);

            let returnSort = SplitColorsArray(selectTexture, selectDictionary.Textures, textureSort);

            if (returnSort != -1)
              setTextureSort(returnSort);
            break;
          case 1:
            if (++selectColor > colorsData.length - 1)
              setSelectColor(colorsData.length - 1);
            else {
              OnSelectColor(selectColor);
              let returnSort = SplitColorsArray(selectColor, colorsDataSort, colorsData);
              if (returnSort != -1)
                setColorsDataSort(returnSort);
            }
            break;
          case 2:
            if (++selectColorHighlight > colorsHighlightData.length - 1)
              setSelectColorHighlight(colorsHighlightData.length - 1);
            else {
              OnSelectColorHighlight(selectColorHighlight);
              let returnSort = SplitColorsArray(selectColorHighlight, colorsHighlightDataSort, colorsHighlightData);
              if (returnSort != -1)
                setColorsHighlightDataSort(returnSort);
            }
            break;
        }
        break;
      case 13:
        OnBuy();
        break;
    }
  };

  const handleKeyUp = (event) => {
    const { keyCode } = event;
    switch (keyCode) {
      case 27:
        OnExit();
        break;
    }
  };

  const OnExit = () => {
    executeClient('client.shop.close');
  };

  const OnBuy = () => {
    if (!selectDictionary)
      return;

    if (isLoad)
      return;

    if (!window.loaderData.delay("clothes.OnBuy", 1.5))
      return;

    switch (viewData.type) {
      case "clothes":
        if (!isFraction)
          executeClient(`client.clothes.buy`, selectMenu.dictionary, selectDictionary.Id, selectTexture);
        else
          executeClient(`client.table.editClothingSet`, selectMenu.dictionary, selectDictionary.Id, selectTexture);
        break;
      case "barber":
        executeClient(`client.barber.buy`, selectMenu.dictionary, selectDictionary.Id, selectColor, selectColorHighlight, selectOpacity);
        break;
      case "tattoo":
        executeClient(`client.tattoo.buy`, selectMenu.dictionary, selectDictionary.Id);
        break;
    }
  };

  return (
    <div id="newbarbershop" onKeyUp={handleKeyUp} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="box-date">
        <div className="box-time">
          <div className="time">{TimeFormat(serverDateTime, "H:mm")}</div>
          {TimeFormat(serverDateTime, "DD.MM.YYYY")}
        </div>
      </div>
      <div className="newbarbershop__top">
        <div className="newbarbershop__top_header" onMouseEnter={() => MouseUse(false)} onMouseLeave={() => MouseUse(true)}>
          <div className="newbarbershop__button">
            Q
          </div>
          {menuData.map((data, index) => (
            <div key={index} className={`newbarbershop__category ${selectMenu == data ? 'active' : ''}`} onClick={() => onSelectMenu(data)}>
              <div className={`${data.icon} newbarbershop__category_icon`}></div>
            </div>
          ))}
          <div className="newbarbershop__button">
            E
          </div>
        </div>
        <div className="newbarbershop__text">
          {translateText('business', 'Выбор категории')}
        </div>
      </div>
      <div className="newbarbershop__center">
        <div className="newbarbershop__menu">
          <div className="box-flex">
            <div className="newbarbershop__button">
              <span className="newbarbershopicons-updown"></span>
            </div>
            <div>{translateText('business', 'Выбор')} {selectMenu.title}</div>
          </div>
          <div className="newbarbershop__menu_info">{translateText('business', 'В ассортименте')} {dictionaryData.length} {translateText('business', 'шт.')}.</div>
          <div className="newbarbershop__menu_list" ref={refCategory} onMouseEnter={() => MouseUse(false)} onMouseLeave={() => MouseUse(true)}>
            {dictionaryData.map((data, index) => (
              <div key={index} className={`newbarbershop__menu_element ${data === selectDictionary ? 'active' : ''}`} id={`menu_${index}`} onClick={() => OnSelectDictionary(data)}>
                <div className="newbarbershop__menu_element-absolute"></div>
                <div className="newbarbershop__menu_name">{getName(data.descName)}</div>
                {data.Donate > 0 && !isFraction && (
                  <div className="newbarbershop__menu_price">{format("money", data.Donate)} RB</div>
                )}
                {data.Price > 0 && !isFraction && (
                  <div className="newbarbershop__menu_price">$ {format("money", data.Price)}</div>
                )}
              </div>
            ))}
          </div>
          {selectDictionary.Textures && selectDictionary.Textures.length > 0 && (
            <div className="newbarbershop__menu_info box-flex" style={{ opacity: selectSort == 0 ? 1 : 0.5 }}>
              <div className="newbarbershop__button">
                <span className="newbarbershopicons-leftright"></span>
              </div>
              {translateText('business', 'Вариаций')}: {selectDictionary.Textures.length} {translateText('business', 'шт')}.
            </div>
          )}
          {selectDictionary.Textures && selectDictionary.Textures.length > 0 && (
            <div className="newbarbershop__menu_colors textures" onMouseEnter={() => MouseUse(false)} onMouseLeave={() => MouseUse(true)}>
              {textureSort.map((index, _) => (
                <div key={index} className={`newbarbershop__menu_color ${selectTexture === index ? 'active' : ''}`} id={`texture_${index}`} onClick={() => OnSelectClothes(index)}>{index}</div>
              ))}
            </div>
          )}
          {selectMenu.color && colorsData.length > 0 && (
            <div className="newbarbershop__menu_info box-flex box-flex" style={{ opacity: selectSort == 1 ? 1 : 0.5 }}>
              <div className="newbarbershop__button">
                <span className="newbarbershopicons-leftright"></span>
              </div>
              {translateText('business', 'На выбор')} {colorsData.length} {translateText('business', 'цвета')}
            </div>
          )}
          {selectMenu.color && colorsData.length > 0 && (
            <div className="newbarbershop__menu_colors" onMouseEnter={() => MouseUse(false)} onMouseLeave={() => MouseUse(true)}>
              {colorsDataSort.map((data, index) => (
                <div key={index} className={`newbarbershop__menu_color ${selectColor === data.gtaid ? 'active' : ''}`} id={`colors_${index}`} onClick={() => OnSelectColor(data.gtaid)} style={{ background: `rgba(${data.r}, ${data.g}, ${data.b}, ${data.a})` }}>{data.gtaid}</div>
              ))}
            </div>
          )}
          {selectMenu.colorHighlight && colorsHighlightData.length > 0 && (
            <div className="newbarbershop__menu_info box-flex" style={{ opacity: selectSort == 2 ? 1 : 0.5 }}>
              <div className="newbarbershop__button">
                <span className="newbarbershopicons-leftright"></span>
              </div>
              {translateText('business', 'Второй цвет - тоже')} {colorsHighlightData.length} {translateText('business', 'шт')}.
            </div>
          )}
          {selectMenu.colorHighlight && colorsHighlightData.length > 0 && (
            <div className="newbarbershop__menu_colors" onMouseEnter={() => MouseUse(false)} onMouseLeave={() => MouseUse(true)}>
              {colorsHighlightDataSort.map((data, index) => (
                <div key={index} className={`newbarbershop__menu_color ${selectColorHighlight === data.gtaid ? 'active' : ''}`} id={`colorsHighlight_${index}`} onClick={() => OnSelectColorHighlight(data.gtaid)} style={{ background: `rgba(${data.r}, ${data.g}, ${data.b}, ${data.a})` }}>{data.gtaid}</div>
              ))}
            </div>
          )}
          {selectMenu.opacity && (
            <InputBlock
              id="selectOpacity"
              leftText="0"
              centerText="Насыщенность"
              rightText="100"
              step={0.1}
              min={0}
              max={1}
              value={selectOpacity}
              callback={newvalue => OnSelectOpacity(newvalue)}
            />
          )}
        </div>
        <div className="newbarbershop__help">
          <div className="newbarbershop__help_img"></div>
          <div className="newbarbershop__help_main">
            <div className="newbarbershop__help_text">{translateText('business', 'Используйте горячие клавиши для быстрого перемещения по интерфейсу')}:</div>
            <div className="box-between">
              <div className="newbarbershop__button">
                <span className="newbarbershopicons-leftright"></span>
              </div>
              <div className="newbarbershop__button">
                <div className="newbarbershop__button">
                  <span className="newbarbershopicons-updown"></span>
                </div>
              </div>
              <div className="newbarbershop__button">
                Q
              </div>
              <div className="newbarbershop__button">
                E
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="newbarbershop__bottom">
        <div className="box-flex">
          <div className="newbarbershop__button">Enter</div>
          <div onClick={OnBuy}>{!isFraction ? "Купить" : "Установить"}</div>
        </div>
        <div className="box-flex">
          <div>{translateText('business', 'Выйти')}</div>
          <div className="newbarbershop__button" onClick={OnExit}>ESC</div>
        </div>
      </div>
    </div>
  );
};

export default NewBarberShop;