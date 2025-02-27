interface Window {
  listernEvent: (eventName: string, ...args: any[]) => void;
  functionList: Record<string, (...args: any[]) => void>;
  notificationAdd: (event: number, type: number, text: string, time: number) => void;
  screenshot_getbase64: (url: string) => void;
}

type Base64<imageType extends string> = `data:image/${imageType};base64${string}`;
