interface Window {
  listernEvent: (eventName: string, ...args: any[]) => void;
  functionList: Record<string, (...args: any[]) => void>;
  notificationAdd: (event: number, type: number, text: string, time: number) => void;
  screenshot_getbase64: (url: string) => void;
  inAdvertisement: (func1: string, func2: string) => void;
  FadeScreen: (func1: boolean, func2: number) => void;
  initCustomizations: () => void;
  events: any;
  chat: any;
  router: any;
  playerlist: any;
  authShop: () => void;
    getItem: (itemId: number) => ItemInfo;

}
interface Document {
    cloud: string;

}


