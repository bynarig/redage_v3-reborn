import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { executeClient } from '#/shared/api/rage';
import { translateText } from '#/shared/locale';
import { format } from '#/shared/api/formatter';
import weaponsinfo from '#/shared/data/weaponsinfo';
import './assets/sass/weaponshop.sass';

interface Component {
  type: number;
  Name: string;
  Desc: string;
  hash: string;
  Mats: number;
  index?: number;
}

interface Weapon {
  Name: string;
  Icon: string;
  Mats: number;
}

const WeaponShop: React.FC = () => {
  const wComponentsType: { [key: number]: string } = {
    1: "inv-item-Varmod",
    2: "inv-item-Clips",
    3: "inv-item-Suppressors",
    4: "inv-item-Scopes",
    5: "inv-item-Muzzle-Brakes",
    6: "inv-item-Barrels",
    7: "inv-item-Flashlights",
    8: "inv-item-Grips",
    9: "inv-item-Varmod",
  };

  const category = ['Пистолеты', 'Дробовики', 'Пистолеты пулеметы', 'Штурмовые винтовки'];
  const maxAmmo = [100, 50, 300, 250, 48];

  const [sumAmmo, setSumAmmo] = useState(0);
  const [activeWeaponId, setActiveWeaponId] = useState(0);
  const [activeWeaponCategory, setActiveWeaponCategory] = useState(0);
  const [cntAmmo, setCntAmmo] = useState(0);
  const [weapons, setWeapons] = useState<Weapon[][]>([[
    { Name: "Pistol", Icon: "inv-item-Pistol", Mats: 50 },
    { Name: "SNS Pistol", Icon: "inv-item-SNS-Pistol", Mats: 40 }
  ]]);
  const [ammo, setAmmo] = useState<number[]>([]);
  const [components, setComponents] = useState<Component[]>([]);
  const [ctypes, setCtypes] = useState<number[]>([]);
  const [activeComponentId, setActiveComponentId] = useState(0);
  const [activeComponentCategory, setActiveComponentCategory] = useState(0);

  const selectIWeapon = weapons[activeWeaponCategory]?.[activeWeaponId] || { Name: "", Icon: "", Mats: 0 };
  const activeWeaponInfo = weaponsinfo[selectIWeapon.Name as keyof typeof weaponsinfo] || null;
  const activeComponentInfo = components[activeComponentId] || { Name: "", Desc: "", Mats: 0, type: 0, hash: "" };

  // useEffect(() => {
  //   window.weaponshop = (weaponJson: string, ammoJson: string) => {
  //     setWeapons(JSON.parse(weaponJson));
  //     setAmmo(JSON.parse(ammoJson));
  //   };
  //
  //   window.weaponshopcomponents = (componentsJson: string, ctypesJson: string) => {
  //     const parsedComponents = JSON.parse(componentsJson);
  //     const parsedCtypes = JSON.parse(ctypesJson);
  //     setComponents(parsedComponents);
  //     setCtypes(parsedCtypes);
  //     onClickComponentCategory(parsedCtypes[0]);
  //   };
  // }, []);

  const onHandleInput = (e: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value.replace(/\D+/g, "")) || 0;
    if (value < 1) value = 0;
    const max = maxAmmo[activeWeaponCategory];
    if (value > max) {
      value = max;
    }

    setCntAmmo(value);
    setSumAmmo(Math.round(value * (ammo[activeWeaponCategory] || 0)));
  };

  const Specifications = (num: number) => {
    let array = [];
    for (let step = 0; step < 5; step++) {
      array.push(<li key={step} className={step < num ? 'active' : ''}></li>);
    }
    return array;
  };

  const onSelectComponent = () => {
    executeClient('client.weaponshop.components', selectIWeapon.Name.replace(/\s/g, ''));
  };

  const onClickWeaponCategory = (id: number) => {
    setActiveWeaponCategory(id);
    setActiveWeaponId(0);
    setCntAmmo(0);
    setSumAmmo(0);
  };

  const onClickWeapon = (id: number) => {
    setActiveWeaponId(id);
    setCntAmmo(0);
    setSumAmmo(0);
  };

  const onClickComponentCategory = (id: number) => {
    setActiveComponentCategory(id);
    let updateComponentId = false;
    components.forEach((item, index) => {
      if (item.type === id && !updateComponentId) {
        setActiveComponentId(index);
        updateComponentId = true;
      }
    });
  };

  const onClickComponent = (id: number) => {
    setActiveComponentId(id);
  };

  const onBuy = () => {
    executeClient('client.weaponshop.buy', activeWeaponCategory, activeWeaponId);
  };

  const onBuyAmmo = () => {
    executeClient('client.weaponshop.buyAmmo', activeWeaponCategory, cntAmmo);
  };

  const onBuyComponent = () => {
    executeClient('client.weaponshop.buyComponent', activeWeaponCategory, activeWeaponId, activeComponentInfo.hash);
  };

  const onExit = () => {
    executeClient('client.weaponshop.close');
  };

  const getLengthFix = (length: number) => {
    let rLength = 6;
    if (length <= 3) {
      rLength = 3;
    } else if (length <= 6) {
      rLength = 6;
    } else if (length <= 9) {
      rLength = 9;
    } else if (length <= 12) {
      rLength = 12;
    } else if (length <= 15) {
      rLength = 15;
    }
    return rLength;
  };

  const getLengthFixToComponents = (type: number) => {
    let pushData: (Component | 0)[] = [];
    components.forEach((item, index) => {
      if (item.type === type) pushData.push({ ...item, index: index });
    });
    
    const fixLength = getLengthFix(pushData.length);
    if (fixLength !== pushData.length) {
      for (let i = 0; i < fixLength - pushData.length; i++) {
        pushData.push(0);
      }
    }
    return pushData;
  };

  const onBack = () => {
    setComponents([]);
    setCtypes([]);
    setActiveComponentId(0);
    setActiveComponentCategory(0);
  };

  const HandleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      onExit();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', HandleKeyDown as any);
    return () => {
      window.removeEventListener('keyup', HandleKeyDown as any);
    };
  }, []);

  return (
    <div id="weaponshop">
      <div className="box-ch">
        <div className="box-info">
          <div className="l">
            <div className="title">{translateText('business', 'Магазин Оружия')}</div>
            <p>{translateText('business', 'Легальный магазин огнестрельного оружия, если вы имеете лицензию на ношение оружия, то сможете приобрести любое понравившееся вам оружие для самообороны')}.</p>
          </div>
          <div className="button-box">
            {ctypes.length ? (
              <div className="btn blue" onClick={onBack}>{translateText('business', 'Назад')}</div>
            ) : (
              <div className="btn red" onClick={onExit}>{translateText('business', 'Выйти')}</div>
            )}
          </div>
        </div>

        {ctypes.length ? (
          <ul className="main">
            {ctypes.map((value, index) => (
              <li onClick={() => onClickComponentCategory(value)} key={index} className={"main-icon" + (activeComponentCategory === value ? " active" : "")}>
                <span className={`${wComponentsType[value]} iconData`} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="main">
            {category.map((value, index) => (
              <li onClick={() => onClickWeaponCategory(index)} key={index} className={"main-small" + (activeWeaponCategory === index ? " active" : "")}>
                {value}
              </li>
            ))}
          </ul>
        )}

        <div className="item-info">
          {ctypes.length ? (
            <ul className="items">
              {getLengthFixToComponents(activeComponentCategory).map((item, index) => (
                <li 
                  className={`${item !== 0 ? 'item' : 'empty'} ${item !== 0 && activeComponentId === (item as Component).index ? 'active' : ''}`}
                  key={index}
                  onClick={item !== 0 ? () => onClickComponent((item as Component).index!) : undefined}
                >
                  {item !== 0 ? (
                    <div className="box">
                      <div className="item-title">
                        <div>{(item as Component).Name}</div>
                        <div></div>
                      </div>
                      <span className={`item-img ${wComponentsType[activeComponentCategory]}`} />
                      <div className="price"><span>$</span>{format("money", (item as Component).Mats)}</div>
                    </div>
                  ) : (
                    <div>{translateText('business', 'Пусто')}</div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="items">
              {Array(getLengthFix(weapons[activeWeaponCategory]?.length || 0)).fill(0).map((_, index) => (
                <li 
                  className={`${weapons[activeWeaponCategory]?.[index] ? 'item' : 'empty'} ${activeWeaponId === index ? 'active' : ''}`}
                  key={index}
                  onClick={weapons[activeWeaponCategory]?.[index] ? () => onClickWeapon(index) : undefined}
                >
                  {weapons[activeWeaponCategory]?.[index] ? (
                    <div className="box">
                      <div className="item-title">
                        <div>{weapons[activeWeaponCategory][index].Name}</div>
                        <div></div>
                      </div>
                      <span className={`item-img ${weapons[activeWeaponCategory][index].Icon}`} />
                      <div className="price"><span>$</span>{format("money", weapons[activeWeaponCategory][index].Mats)}</div>
                    </div>
                  ) : (
                    <div>{translateText('business', 'Пусто')}</div>
                  )}
                </li>
              ))}
            </ul>
          )}

          {ctypes.length ? (
            <div className="c">
              <div className="specification">
                <div className="contein">
                  <span>{translateText('business', 'Урон')}</span>
                  <ul>{Specifications(activeWeaponInfo ? activeWeaponInfo.damage : 0)}</ul>
                </div>
                <div className="contein">
                  <span>{translateText('business', 'Скорострельность')}</span>
                  <ul>{Specifications(activeWeaponInfo ? activeWeaponInfo.ratefire : 0)}</ul>
                </div>
                <div className="contein">
                  <span>{translateText('business', 'Точность')}</span>
                  <ul>{Specifications(activeWeaponInfo ? activeWeaponInfo.accuracy : 0)}</ul>
                </div>
                <div className="contein">
                  <span>{translateText('business', 'Дальность')}</span>
                  <ul>{Specifications(activeWeaponInfo ? activeWeaponInfo.range : 0)}</ul>
                </div>
              </div>
              <div className="box-column">
                <div className="title x2">
                  <span>{activeComponentInfo.Name}</span>
                </div>
                <p>{activeComponentInfo.Desc}</p>
              </div>
              <div className='btn white' onClick={onBuyComponent}>
                {translateText('business', 'Купить за')} {format("money", activeComponentInfo.Mats)}$
              </div>
            </div>
          ) : (
            <div className="c">
              <div className="specification">
                <div className="contein">
                  <span>{translateText('business', 'Урон')}</span>
                  <ul>{Specifications(activeWeaponInfo ? activeWeaponInfo.damage : 0)}</ul>
                </div>
                <div className="contein">
                  <span>{translateText('business', 'Скорострельность')}</span>
                  <ul>{Specifications(activeWeaponInfo ? activeWeaponInfo.ratefire : 0)}</ul>
                </div>
                <div className="contein">
                  <span>{translateText('business', 'Точность')}</span>
                  <ul>{Specifications(activeWeaponInfo ? activeWeaponInfo.accuracy : 0)}</ul>
                </div>
                <div className="contein">
                  <span>{translateText('business', 'Дальность')}</span>
                  <ul>{Specifications(activeWeaponInfo ? activeWeaponInfo.range : 0)}</ul>
                </div>
              </div>
              <div className="box-column">
                <div className="title x2">
                  <span>{selectIWeapon.Name}</span>
                </div>
                <p>{activeWeaponInfo ? activeWeaponInfo.desc : "Нет"}</p>
              </div>
              <div className="title x3">
                <div>
                  {translateText('business', 'Купить патроны')} <span>1 {translateText('business', 'патрон')} = {ammo[activeWeaponCategory]}$</span>
                </div>
                {sumAmmo > 0 && (
                  <div>
                    <span className="priceAmmo">{sumAmmo} <b>$</b></span> <span>{translateText('business', 'Цена')}</span>
                  </div>
                )}
              </div>
              <div className="inputblock">
                <input 
                  value={cntAmmo} 
                  onChange={onHandleInput} 
                  className="input" 
                  placeholder="Введите кол-во патронов" 
                  maxLength={6}
                />
                <div className="butammo" onClick={onBuyAmmo}>{translateText('business', 'Купить')}</div>
              </div>
              <div className='box-btn'>
                <div className='btn white' onClick={onBuy} style={{width: '58%'}}>
                  {translateText('business', 'Купить за')} {format("money", selectIWeapon.Mats)}$
                </div>
                <div className='btn min blue' onClick={onSelectComponent} style={{width: '38%'}}>
                  {translateText('business', 'Модификации')}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeaponShop;