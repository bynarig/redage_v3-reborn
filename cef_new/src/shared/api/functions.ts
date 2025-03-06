import { useEffect } from 'react';

// The existing window.listernEvent function - keep this unchanged
window.listernEvent = (eventName, ...args) => {
  try {
    if (typeof window.functionList[eventName] === 'function')
      window.functionList[eventName](...args);
  } catch (err) {
    //console.log(`[listernEvent] ${eventName}`)
  }
};

// Original function (kept for reference)
// export const addListernEvent = (eventName: string, func: any) => {
//   if (typeof window.functionList !== 'object') window.functionList = {};
//
//   window.functionList[eventName] = func;
//
//   onDestroy(() => {
//     delete window.functionList[eventName];
//   });
// };

/**
 * React hook version of addListernEvent - use this inside functional components
 * 
 * @example
 * // In a React component:
 * useListernEvent('eventName', (arg1, arg2) => {
 *   console.log('Event fired with:', arg1, arg2);
 * });
 */
export const useListernEvent = (eventName: string, callback: (...args: any[]) => void) => {
  useEffect(() => {
    // Initialize functionList if needed
    if (typeof window.functionList !== 'object') window.functionList = {};
    
    // Register the event handler
    window.functionList[eventName] = callback;
    
    // Cleanup function - React's equivalent to onDestroy
    return () => {
      delete window.functionList[eventName];
    };
  }, [eventName, callback]); // Re-run if eventName or callback changes
};

/**
 * Non-hook version for use outside of components (class components or utility functions)
 * Note: You must manually clean up when finished by calling the returned function
 * 
 * @example
 * // In a class component:
 * componentDidMount() {
 *   this.cleanupEvent = addListernEvent('eventName', this.handleEvent);
 * }
 * 
 * componentWillUnmount() {
 *   this.cleanupEvent();
 * }
 */
export const addListernEvent = (eventName: string, func: (...args: any[]) => void) => {
  if (typeof window.functionList !== 'object') window.functionList = {};

  window.functionList[eventName] = func;

  // Return cleanup function instead of using Svelte's onDestroy
  return () => {
    delete window.functionList[eventName];
  };
};

// Keep these other functions unchanged
export const hasJsonStructure = (str: string) => {
  try {
    const result = JSON.parse(str);
    const type = Object.prototype.toString.call(result);
    return type === '[object Object]' || type === '[object Array]';
  } catch (err) {
    return false;
  }
};

export const loadImage = (node: any, url: string) => {
  let isDestroy = false;
  const updateNode = (node: any, url: string) => {
    if (url && /jpg|jpeg|png/g.test(url)) {
      if (isDestroy) return;

      const image = url;
      const img = new Image();
      img.src = image;
      img.onload = () => {
        if (isDestroy) return;

        return node.nodeName === 'IMG'
          ? (node.src = image)
          : (node.style.backgroundImage = `url(${image})`);
      };
    }
  };

  updateNode(node, url);

  return {
    update(url: string) {
      updateNode(node, url);
    },

    destroy() {
      isDestroy = false;
    },
  };
};

export const loadAwaitImage = (src: string) => {
  return new Promise(function (resolve) {
    let img = new Image();
    img.onload = resolve;
    img.src = src;
  });
};

// Add TypeScript declaration for the global window object
declare global {
  interface Window {
    listernEvent: (eventName: string, ...args: any[]) => void;
    functionList: Record<string, (...args: any[]) => void>;
  }
}