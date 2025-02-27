let groupName = "";
import { onDestroy } from 'svelte';

export const setGroup = (_groupName) => {
    groupName = _groupName;

    onDestroy(() => {
        setTimeout(() => {
            groupName = "";
        }, 0)
    });
}

export const executeClientToGroup = (eventName, ...args) => {
    //console.log(`[debug] Execute client ${eventName}: ${args}`);
    if(window.mp !== undefined)
        window.mp.trigger("client" + groupName + eventName, ...args);
}

import rpc from 'rage-rpc';
export const executeClientAsyncToGroup = async (eventName, ...args) => {
    if(window.mp !== undefined)
        return await rpc.callClient ("rpc" + groupName + eventName, ...args);

    return null;
}

/////

export const executeClient = (eventName, ...args) => {
    //console.log(`[debug] Execute client ${eventName}: ${args}`);
    if(window.mp !== undefined)
        window.mp.trigger(eventName, ...args);
}

export const invokeMethod = (invokeName, ...args) => {
    //console.log(`[debug] Invoke method ${invokeName}: ${args}`);
    if(window.mp !== undefined) window.mp.invoke(invokeName, ...args);
}

export const executeClientAsync = async (eventName, ...args) => {
    if(window.mp !== undefined)
        return await rpc.callClient ("rpc." + eventName, ...args);

    return null;
}