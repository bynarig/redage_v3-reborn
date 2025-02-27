import * as data from 'store/customization';

import appearances from '@/views/player/newauthentication/chars/create/elements/appearance/appearances.js';
import parents from '@/views/player/newauthentication/chars/create/elements/info/parents.js';
import characteristics from '@/views/player/newauthentication/chars/create/elements/characteristics/characteristics.js';

import clothes from '@/views/player/newauthentication/chars/create/elements/clothes/clothes.js';

const randomHelper = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getShapeMix = (gender: boolean, newgeneration: boolean): number => {
    if (newgeneration)
        return (gender) ? randomHelper(5, 10) : randomHelper(0, 5);
    else
        return (gender) ? 7 : 2;
}

const CreateNewCustomization = (gender: boolean, newgeneration: boolean = false): void => {
    data.updateParents(gender, randomHelper(0, parents[false].length - 1), randomHelper(0, parents[true].length - 1));

    // data.updateShapeMix(gender, getShapeMix(gender, newgeneration) / 10);
    // data.updateSkinTone(gender, (newgeneration ? randomHelper(0, 10) : 5) / 10);

    const characteristicsList: string[] = ["brow", "eyes", "nose", "noseprofile", "nosetip", "nosetip", "cbones", "cheeks", "lips", "jaw", "chinprofile", "chinform"];
    for (let i = 0; i < characteristicsList.length; i++) {
        const key = characteristicsList[i];
        const preset = newgeneration ? randomHelper(0, 3) : 0;

        data.updateCharacteristic(gender, key, preset, characteristics[key][preset].x, characteristics[key][preset].y);
    }

    const appearancesList: { dataname: string; onlysex: boolean | "all" }[] = [
        {
            dataname: 'hair',
            onlysex: "all",
        },
        {
            dataname: 'eyebrows',
            onlysex: "all",
        },
        {
            dataname: 'facialhair',
            onlysex: true,
        },
        {
            dataname: 'blemishes',
            onlysex: "all",
        },
        {
            dataname: 'ageing',
            onlysex: "all",
        },
        {
            dataname: 'complexion',
            onlysex: "all",
        },
        {
            dataname: 'molesfreckles',
            onlysex: "all",
        },
        {
            dataname: 'sundamage',
            onlysex: "all",
        },
        {
            dataname: 'eyescolor',
            onlysex: "all"
        },
        {
            dataname: 'lipstick',
            onlysex: false,
        },
    ];

    appearancesList.forEach((component) => {
        if (component.onlysex === "all" || component.onlysex === gender) {
            const key = component.dataname;
            let id = 0;

            const appearance = Array.isArray(appearances[key]) ? appearances[key] : appearances[key][gender];

            if (key === "hair" || key === "eyebrows" || key === "facialhair" || key === "molesfreckles" || key === "eyescolor")
                id = randomHelper(0, appearance.length);

            data.updateAppearance(gender, key, id, 0, 100);
        }
    });

    const clothesList: string[] = ["tops", "legs", "shoes"];
    for (let i = 0; i < clothesList.length; i++) {
        const key = clothesList[i];

        data.updateClothes(gender, key, randomHelper(0, clothes[gender][key].length - 1));
    }
    data.updateClothes(gender, "head", newgeneration ? randomHelper(0, clothes[gender].head.length - 1) : 0);
};

export default CreateNewCustomization;