let groupName = "";
import { onDestroy } from 'svelte';

export const setGroup = (_groupName: string) => {
    groupName = _groupName;

    onDestroy(() => {
        setTimeout(() => {
            groupName = "";
        }, 0)
    });
}

export const executeClientToGroup = (eventName: string, ...args: any) => {
    //console.log(`[debug] Execute client ${eventName}: ${args}`);
    if(window.mp !== undefined)
        window.mp.trigger("client" + groupName + eventName, ...args);
}

import rpc from 'rage-rpc';
export const executeClientAsyncToGroup = async (eventName: string, ...args: any) => {
    if(window.mp !== undefined)
        return await rpc.callClient ("rpc" + groupName + eventName, ...args);

    return null;
}

/////

export const executeClient = (eventName: string, ...args: any) => {
    //console.log(`[debug] Execute client ${eventName}: ${args}`);
    if(window.mp !== undefined)
        window.mp.trigger(eventName, ...args);
}

export const invokeMethod = (eventName: string, ...args: any) => {
    //console.log(`[debug] Invoke method ${invokeName}: ${args}`);
    let invokeName = "";
    if(window.mp !== undefined) window.mp.invoke(invokeName, ...args);
}

export const executeClientAsync = async (eventName: string, ...args: any) => {
    if(window.mp !== undefined)
        return await rpc.callClient ("rpc." + eventName, ...args);

    return null;
}