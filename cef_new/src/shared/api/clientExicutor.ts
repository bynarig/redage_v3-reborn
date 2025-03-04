import {ENVIRONMENT} from "#/env";
import {executeClient} from "#/shared/api/rage";

export const safeExecuteClient = (event: string, ...args: any[]) => {
    if (ENVIRONMENT !== 'development') {
        executeClient(event, ...args);
    } else {
        console.log(`DEV MODE - Client execution: ${event}`, args);
    }
};