export default [
  {
    cmd: '/report',
    descr: 'Подать жалобу администрации.',
    category: 'Общие',
  },
  {
    cmd: '/password',
    descr: 'Сменить пароль.',
    category: 'Общие',
  },
  {
    cmd: '/myguest',
    descr: 'Зайти в личный дом без открытия дверей.',
    category: 'Общие',
  },
  {
    cmd: '/buybiz',
    descr: 'Купить бизнес.',
    category: 'Общие',
  },
  {
    cmd: '/sellbiz [id] [цена]',
    descr: 'Продать бизнес игроку.',
    category: 'Общие',
  },
  {
    cmd: '/time',
    descr: ' Узнать срок наказания / КПЗ.',
    category: 'Общие',
  },
  {
    cmd: '/dice [id] [сумма]',
    descr: 'Предложить игру в кости.',
    category: 'Общие',
  },
  {
    cmd: '/findtrailer',
    descr: ' Отметить трейлер (Для работы дальнобойщика).',
    category: 'Общие',
  },
  {
    cmd: '/q',
    descr: ' Быстрое отключение от сервера.',
    category: 'Общие',
  },
  {
    cmd: "Нажатие 'G'",
    descr: ' Меню взаимодействий',
    category: 'Общие',
  },
  {
    cmd: "Нажатие 'N'",
    descr: ' Микрофон.',
    category: 'Общие',
  },
  {
    cmd: "Нажатие 'I'",
    descr: 'Открывает инвентарь и статистику персонажа.',
    category: 'Общие',
  },
  {
    cmd: "Нажатие 'M'",
    descr: 'Телефон.',
    category: 'Общие',
  },
  {
    cmd: "Нажатие 'L'",
    descr: 'Открыть / Закрыть авто.',
    category: 'Общие',
  },
  {
    cmd: "Нажатие 'B'",
    descr: 'Завести / Заглушить авто.',
    category: 'Общие',
  },
  {
    cmd: "Нажатие 'U'",
    descr: ' Список анимаций.',
    category: 'Общие',
  },
  {
    cmd: "Нажатие '5'",
    descr: 'Показать / Скрыть ID игроков.',
    category: 'Общие',
  },
  {
    cmd: "Нажатие '6'",
    descr: 'Круиз контроль авто.',
    category: 'Общие',
  },
  {
    cmd: "Нажатие 'F10'",
    descr: 'Помощь.',
    category: 'Общие',
  },
  {
    cmd: "Нажатие 'F9'",
    descr: 'Донат Панель.',
    category: 'Общие',
  },
  {
    cmd: "Нажатие 'F5'",
    descr: 'Вкл/Выкл интерфейс.',
    category: 'Общие',
  },
  {
    cmd: "Нажатие 'F1'",
    descr: 'Открыть меню Rage.',
    category: 'Общие',
  },
  {
    cmd: "Нажатие 'T'",
    descr: 'Открыть чат.',
    category: 'Чат',
  },
  {
    cmd: '/b',
    descr: 'ООС чат.',
    category: 'Чат',
  },
  {
    cmd: '/me',
    descr: 'Отыгровка действия от первого лица.',
    category: 'Чат',
  },
  {
    cmd: '/do',
    descr: 'Отыгровка от 3-го лица.',
    category: 'Чат',
  },
  {
    cmd: '/try',
    descr: 'Отыгровка действия со случайным исходом.',
    category: 'Чат',
  },
  {
    cmd: '/todo',
    descr: 'Отыгровка слов + действий.',
    category: 'Чат',
  },
  {
    cmd: '/s',
    descr: 'Кричать.',
    category: 'Чат',
  },
  {
    cmd: '/f',
    descr: 'Чат фракции.',
    category: 'Чат',
  },
  {
    cmd: '/dep',
    descr: 'Чат департамента. (Общий чат всех гос. фракций).',
    category: 'Чат',
  },
  {
    cmd: '/gov',
    descr: 'Гос. волна.',
    category: 'Чат',
  },
  {
    cmd: '/m',
    descr: 'Мегафон.',
    category: ['Чат', 'LSPD', 'FIB', 'Армия'],
  },
  {
    cmd: '/call',
    descr: 'SMS.',
    category: 'Чат',
  },
  {
    cmd: '/fontsize',
    descr: 'Изменить размер шрифта чата (От 10 до 20, Стандарт: 16).',
    category: 'Чат',
  },
  {
    cmd: '/pagesize',
    descr: ' Изменить кол-во строк чата (От 5 до 20, Стандарт 10).',
    category: 'Чат',
  },
  {
    cmd: '/timestamp',
    descr: 'Отображение времени в чате.',
    category: 'Чат',
  },
  {
    cmd: '/chatalpha',
    descr: 'Переключить затухание чата.',
    category: 'Чат',
  },
  {
    cmd: '/buyfuel [кол-во]',
    descr: 'Купить топливо на АЗС.',
    category: 'Автомеханик',
  },
  {
    cmd: '/sellfuel [id] [кол-во] [цена за литр]',
    descr: 'Продать топливо игроку.',
    category: 'Автомеханик',
  },
  {
    cmd: '/ma',
    descr: 'Принять вызов автомеханика.',
    category: 'Автомеханик',
  },
  {
    cmd: '/repair [id] [цена]',
    descr: 'Починить транспорт.',
    category: 'Автомеханик',
  },
  {
    cmd: '/ta [id]',
    descr: 'Принять вызов.',
    category: 'Такси',
  },
  {
    cmd: '/tprice [id] [цена]',
    descr: 'Предложить оплату.',
    category: 'Такси',
  },
  {
    cmd: '/orders',
    descr: 'Список заказов.',
    category: 'Дальнобойщик',
  },
  {
    cmd: '/t',
    descr: 'Рация дальнобойщиков.',
    category: 'Дальнобойщик',
  },
  {
    cmd: '/su [Номер паспорта] [Кол-во звезд] [Причина]',
    descr: 'Выдать розыск игроку.',
    category: ['LSPD', 'FIB'],
  },
  {
    cmd: '/arrest [id]',
    descr: 'Арестовать игрока. (Поместить в КПЗ)',
    category: ['LSPD', 'FIB'],
  },
  {
    cmd: '/rfp [id]',
    descr: 'Выпустить игрока из КПЗ.',
    category: ['LSPD', 'FIB'],
  },
  {
    cmd: '/pd [id]',
    descr: 'Принять вызов.',
    category: ['LSPD', 'FIB'],
  },
  {
    cmd: '/givegunlic [id] [Цена]',
    descr: 'Выдать лицензию на оружие.',
    category: ['LSPD', 'FIB'],
  },
  {
    cmd: '/takegunlic [id] ',
    descr: 'Изъять лицензию на оружие.',
    category: ['LSPD', 'FIB'],
  },
  {
    cmd: '/pull [id]',
    descr: 'Вытащить игрока из авто.',
    category: ['LSPD', 'FIB', 'Мафия', 'Армия', 'Правительство'],
  },
  {
    cmd: '/incar [id]',
    descr: 'Посадить игрока в авто.',
    category: ['LSPD', 'FIB', 'Мафия', 'Армия', 'Правительство'],
  },
  {
    cmd: '/warg',
    descr: 'Включить режим ЧП.',
    category: ['LSPD', 'FIB'],
  },
  {
    cmd: '/openstock /closestock ',
    descr: 'Открыть / Закрыть склад. ',
    category: ['LSPD', 'FIB', 'EMS', 'Армия', 'Правительство', 'Банды', 'Мафия'],
  },
  {
    cmd: "Нажатие 'X'",
    descr: 'Надеть наручники',
    category: ['LSPD', 'FIB', 'Армия', 'Правительство'],
  },
  {
    cmd: "Нажатие 'Z'",
    descr: 'Вести игрока за собой.',
    category: ['LSPD', 'FIB', 'Армия', 'Правительство'],
  },
  {
    cmd: "Нажатие 'U'",
    descr: '[в рабочем авто] Открытие бортового компьютера.',
    category: ['LSPD', 'FIB'],
  },
  {
    cmd: "Нажатие 'G'",
    descr: 'Взаимодействие с игроком. (Обыскать, проверить документы, etc)',
    category: ['LSPD', 'FIB'],
  },
  {
    cmd: '/heal [id] [цена]',
    descr: 'Предложить оплату лечения.',
    category: ['EMS'],
  },
  {
    cmd: '/ems [id]',
    descr: 'Принять вызов.',
    category: ['EMS'],
  },
  {
    cmd: '/givemedlic [id]',
    descr: 'Выдать мед. карту.',
    category: ['EMS'],
  },
  {
    cmd: '/givepmlic [id] [цена]',
    descr: 'Продать лицензию парамедика.',
    category: ['EMS'],
  },
  {
    cmd: "Нажатие 'F7'",
    descr: 'Открыть редактирование объявлений',
    category: 'LSNEWS',
  },
  {
    cmd: '/capture',
    descr: 'Начать захват территории.',
    category: 'Банды',
  },
  {
    cmd: "Нажатие 'G'",
    descr: 'Взаимодействие с игроком. (Грабить, надеть стяжки/мешок)',
    category: ['Мафия', 'Банды'],
  },
  {
    cmd: '/bizwar',
    descr: 'Начать захват бизнеса.',
    category: 'Мафия',
  },
  {
    cmd: '/takebiz',
    descr: 'Забрать бизнес под свой контроль.',
    category: 'Мафия',
  },
  {
    cmd: '/respawn',
    descr: 'Респавн всего транспорта фракции',
    category: 'Лидерские',
  },
  {
    cmd: '/setrank [id] [rank]',
    descr: 'Изменить ранг игроку',
    category: 'Лидерские',
  },
  {
    cmd: '/invite [ID]',
    descr: 'Принять игрока во фракцию',
    category: 'Лидерские',
  },
  {
    cmd: '/uninvite [ID]',
    descr: 'Уволить игрока из фракции',
    category: 'Лидерские',
  },
];
