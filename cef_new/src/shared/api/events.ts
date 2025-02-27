// let eventsPool: any = {};
// window.events = {}
//
// window.events.callEvent = (eventName, ...args) => {
//     if (!eventsPool [eventName]) {
//         //console.log(`[events] Error, event ${eventName} not found in pool.`);
//         return false;
//     }
//
//     eventsPool [eventName](...args);
// };
//
// window.events.addEvent = (eventName, callback) => {
//     window.events.removeEvent(eventName);
//     eventsPool [eventName] = callback;
// };
//
// window.events.removeEvent = (eventName) => {
//
//     if (eventsPool [eventName]) {
//         eventsPool [eventName] = null;
//         delete eventsPool [eventName];
//     }
// };
import {EventCallback} from '#/shared/types';

export default new (class EventSystem {
  private eventsPool: Map<string, EventCallback> = new Map();

  callEvent(eventName: string, ...args: any[]): boolean {
    if (!this.eventsPool.has(eventName)) {
      console.warn(`[events] Error, event "${eventName}" not found in pool.`);
      return false;
    }

    const callback = this.eventsPool.get(eventName)!;
    callback(...args);
    return true;
  }

  addEvent(eventName: string, callback: EventCallback): void {
    this.removeEvent(eventName);
    this.eventsPool.set(eventName, callback);
  }

  removeEvent(eventName: string): void {
    if (this.eventsPool.has(eventName)) {
      this.eventsPool.delete(eventName);
    }
  }
})();
