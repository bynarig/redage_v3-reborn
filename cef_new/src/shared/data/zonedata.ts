

const initialZonesList: ZoneData[] = [
    {
        name: "Аэропорт 1",
        descr: "Позволяет контролировать импорт и экспорт товаров штата",
        zone: "airport1",
        element: airport1,
        owner: "",
        color: null
    },
    {
        name: "Аэропорт 2",
        descr: "Позволяет контролировать импорт и экспорт товаров штата",
        zone: "airport2",
        element: airport2,
        owner: "",
        color: null
    },
    {
        name: "Автосервис",
        descr: "Позволяет получать часть прибыли от работы механиков",
        zone: "mech",
        element: mech,
        owner: "",
        color: null
    },
    {
        name: "Автобусный парк",
        descr: "Позволяет получать часть прибыли водителей автобусов",
        zone: "buspark",
        element: buspark,
        owner: "",
        color: null
    },
    {
        name: "Театр",
        descr: "Позволяет получать часть прибыли от посетителей",
        zone: "theatre",
        element: theatre,
        owner: "",
        color: null
    },
    {
        name: "Аренда велосипедов",
        descr: "Позволяет получать часть прибыли от аренды велосипедов",
        zone: "bikerent",
        element: bikerent,
        owner: "",
        color: null
    },
    {
        name: "Аренда лодок",
        descr: "Позволяет получать часть прибыли от аренды лодок",
        zone: "boatrent",
        element: boatrent,
        owner: "",
        color: null
    },
    {
        name: "Аренда офф-роад машин",
        descr: "Позволяет получать часть прибыли от аренды офф-роад машин",
        zone: "offroadrent",
        element: offroadrent,
        owner: "",
        color: null
    },
    {
        name: "Газонокосилки",
        descr: "Позволяет получать часть прибыли от работников газонокосилок",
        zone: "jobgason",
        element: jobgason,
        owner: "",
        color: null
    },
    {
        name: "Рынок",
        descr: "Позволяет получать часть прибыли от продаж на рынке",
        zone: "rynok",
        element: rynok,
        owner: "",
        color: null
    },
    {
        name: "Авторынок",
        descr: "Позволяет получать часть прибыли от продаж на авторынке",
        zone: "autorynok",
        element: autorynok,
        owner: "",
        color: null
    },
    {
        name: "Гос. шахта",
        descr: "Позволяет получать часть ресурсов от добычи на гос. шахте",
        zone: "gosshahta",
        element: gosshahta,
        owner: "",
        color: null
    },
    {
        name: "Шахта 1",
        descr: "Позволяет получать часть ресурсов от добычи на шахте",
        zone: "shahta1",
        element: shahta1,
        owner: "",
        color: null
    },
    {
        name: "Шахта 2",
        descr: "Позволяет получать часть ресурсов от добычи на шахте",
        zone: "shahta2",
        element: shahta2,
        owner: "",
        color: null
    },
    {
        name: "Шахта 3",
        descr: "Позволяет получать часть ресурсов от добычи на шахте",
        zone: "shahta3",
        element: shahta3,
        owner: "",
        color: null
    },
    {
        name: "Шахта 4",
        descr: "Позволяет получать часть ресурсов от добычи на шахте",
        zone: "shahta4",
        element: shahta4,
        owner: "",
        color: null
    },
    {
        name: "Стоянка дальнобойщиков",
        descr: "Позволяет получать часть прибыли от работы дальнобойщиков",
        zone: "dalnoboi",
        element: dalnoboi,
        owner: "",
        color: null
    },
    {
        name: "Склад 1",
        descr: "Позволяет хранить различные товары",
        zone: "sklad1",
        element: sklad1,
        owner: "",
        color: null
    },
    {
        name: "Склад 2",
        descr: "Позволяет хранить различные товары",
        zone: "sklad2",
        element: sklad2,
        owner: "",
        color: null
    },
    {
        name: "Завод 1",
        descr: "Позволяет получать часть прибыли от работы завода",
        zone: "zavod",
        element: zavod,
        owner: "",
        color: null
    },
    {
        name: "Химическая лаборатория",
        descr: "Позволяет получать часть прибыли от работы химической лаборатории",
        zone: "himlab",
        element: himlab,
        owner: "",
        color: null
    },
    {
        name: "Стоянка инкассаторов",
        descr: "Позволяет получать часть прибыли от работы инкассаторов",
        zone: "inkas",
        element: inkas,
        owner: "",
        color: null
    },
    {
        name: "Казино",
        descr: "Позволяет получать часть прибыли казино",
        zone: "casino",
        element: casino,
        owner: "",
        color: null
    },
    {
        name: "Лесные ресурсы 1",
        descr: "Позволяет получать часть ресурсов от добычи на лесопилке",
        zone: "forest1",
        element: forest1,
        owner: "",
        color: null
    },
    {
        name: "Лесные ресурсы 2",
        descr: "Позволяет получать часть ресурсов от добычи на лесопилке",
        zone: "forest2",
        element: forest2,
        owner: "",
        color: null
    },
    {
        name: "Лесные ресурсы 3",
        descr: "Позволяет получать часть ресурсов от добычи на лесопилке",
        zone: "forest3",
        element: forest3,
        owner: "",
        color: null
    },
    {
        name: "Лесные ресурсы 4",
        descr: "Позволяет получать часть ресурсов от добычи на лесопилке",
        zone: "forest4",
        element: forest4,
        owner: "",
        color: null
    },
    {
        name: "Лесные ресурсы 5",
        descr: "Позволяет получать часть ресурсов от добычи на лесопилке",
        zone: "forest5",
        element: forest5,
        owner: "",
        color: null
    },
    {
        name: "Арена",
        descr: "Позволяет получать часть прибыли от боёв на арене",
        zone: "arena",
        element: arena,
        owner: "",
        color: null
    },
    {
        name: "Охотничий магазин",
        descr: "Позволяет получать часть прибыли от работы охотничьего магазина",
        zone: "huntingshop",
        element: huntingshop,
        owner: "",
        color: null
    },
    {
        name: "Электростанция",
        descr: "Позволяет получать часть прибыли от работы электриков",
        zone: "electric",
        element: electric,
        owner: "",
        color: null
    },
    {
        name: "Риэлторское агенство",
        descr: "Позволяет получать часть прибыли от работы риэлторского агенства",
        zone: "rielt",
        element: rielt,
        owner: "",
        color: null
    },
    {
        name: "Центр Kortz",
        descr: "Позволяет получать часть прибыли от посетителей",
        zone: "observatorya",
        element: observatorya,
        owner: "",
        color: null
    },
    {
        name: "Таксопарк",
        descr: "Позволяет получать часть прибыли от работы таксистов",
        zone: "taxi",
        element: taxi,
        owner: "",
        color: null
    },
    {
        name: "Продажа марихуаны 1",
        descr: "Позволяет получать часть прибыли от продажи марихуаны",
        zone: "drugs",
        element: drugs,
        owner: "",
        color: null
    },
    {
        name: "Продажа марихуаны 2",
        descr: "Позволяет получать часть прибыли от продажи марихуаны",
        zone: "drugs2",
        element: drugs2,
        owner: "",
        color: null
    },
    {
        name: "Чёрный рынок",
        descr: "Позволяет получать часть прибыли от продаж на чёрном рынке",
        zone: "darkshop",
        element: darkshop,
        owner: "",
        color: null
    },
    {
        name: "Порт",
        descr: "Позволяет контролировать импорт и экспорт товаров штата",
        zone: "port",
        element: port,
        owner: "",
        color: null
    },
    {
        name: "Завод 2",
        descr: "Позволяет получать часть прибыли от работы завода",
        zone: "zavod2",
        element: zavod2,
        owner: "",
        color: null
    },
    {
        name: "Склад 3",
        descr: "Позволяет хранить различные товары",
        zone: "sklad3",
        element: sklad3,
        owner: "",
        color: null
    },
    {
        name: "Склад 4",
        descr: "Позволяет хранить различные товары",
        zone: "sklad4",
        element: sklad4,
        owner: "",
        color: null
    },
    {
        name: "Склад 5",
        descr: "Позволяет хранить различные товары",
        zone: "sklad5",
        element: sklad5,
        owner: "",
        color: null
    },
    {
        name: "Склад 6",
        descr: "Позволяет хранить различные товары",
        zone: "sklad6",
        element: sklad6,
        owner: "",
        color: null
    },
    {
        name: "Нефтедобывающее предприятие 1",
        descr: "Позволяет получать часть прибыли от добычи нефти",
        zone: "oil",
        element: oil,
        owner: "",
        color: null
    },
    {
        name: "Нефтедобывающее предприятие 2",
        descr: "Позволяет получать часть прибыли от добычи нефти",
        zone: "oil2",
        element: oil2,
        owner: "",
        color: null
    },
    {
        name: "Нефтедобывающее предприятие 3",
        descr: "Позволяет получать часть прибыли от добычи нефти",
        zone: "oil3",
        element: oil3,
        owner: "",
        color: null
    },
    {
        name: "Нефтедобывающее предприятие 4",
        descr: "Позволяет получать часть прибыли от добычи нефти",
        zone: "oil4",
        element: oil4,
        owner: "",
        color: null
    },
    {
        name: "Бар на острове",
        descr: "Позволяет получать часть прибыли от бара",
        zone: "landbar",
        element: landbar,
        owner: "",
        color: null
    },
    {
        name: "Театр 2",
        descr: "Позволяет получать часть прибыли от посетителей",
        zone: "theatre2",
        element: theatre2,
        owner: "",
        color: null
    },
    {
        name: "Ветряная электростанция 1",
        descr: "Позволяет получать часть прибыли от добычи электричества",
        zone: "vetryanaya1",
        element: vetryanaya1,
        owner: "",
        color: null
    },
    {
        name: "Ветряная электростанция 2",
        descr: "Позволяет получать часть прибыли от добычи электричества",
        zone: "vetryanaya2",
        element: vetryanaya2,
        owner: "",
        color: null
    },
    {
        name: "Ветряная электростанция 3",
        descr: "Позволяет получать часть прибыли от добычи электричества",
        zone: "vetryanaya3",
        element: vetryanaya3,
        owner: "",
        color: null
    },
    {
        name: "Склад 7",
        descr: "Позволяет хранить различные товары",
        zone: "sklad7",
        element: sklad7,
        owner: "",
        color: null
    },
    {
        name: "Ферма 1",
        descr: "Позволяет выращивать ресурсы для дальнейшей продажи",
        zone: "farm1",
        element: farm1,
        owner: "",
        color: null
    },
    {
        name: "Ферма 2",
        descr: "Позволяет выращивать ресурсы для дальнейшей продажи",
        zone: "farm2",
        element: farm2,
        owner: "",
        color: null
    },
    {
        name: "Ферма 3",
        descr: "Позволяет выращивать ресурсы для дальнейшей продажи",
        zone: "farm3",
        element: farm3,
        owner: "",
        color: null
    },
    {
        name: "Ферма 4",
        descr: "Позволяет выращивать ресурсы для дальнейшей продажи",
        zone: "farm4",
        element: farm4,
        owner: "",
        color: null
    },
    {
        name: "Ферма 5",
        descr: "Позволяет выращивать ресурсы для дальнейшей продажи",
        zone: "farm5",
        element: farm5,
        owner: "",
        color: null
    },
    {
        name: "Ферма 6",
        descr: "Позволяет выращивать ресурсы для дальнейшей продажи",
        zone: "farm6",
        element: farm6,
        owner: "",
        color: null
    },
    {
        name: "Ферма 7",
        descr: "Позволяет выращивать ресурсы для дальнейшей продажи",
        zone: "farm7",
        element: farm7,
        owner: "",
        color: null
    },
    {
        name: "Ферма 8",
        descr: "Позволяет выращивать ресурсы для дальнейшей продажи",
        zone: "farm8",
        element: farm8,
        owner: "",
        color: null
    },
    {
        name: "Железнодорожная станция",
        descr: "Позволяет контролировать импорт и экспорт товаров штата",
        zone: "vokzal",
        element: vokzal,
        owner: "",
        color: null
    },
    {
        name: "Аренда гоночных машин",
        descr: "Позволяет получать часть прибыли от аренды гоночных машин",
        zone: "speedcarrent",
        element: speedcarrent,
        owner: "",
        color: null
    },
]