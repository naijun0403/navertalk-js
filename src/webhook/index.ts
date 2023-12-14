import * as https from 'https';
import { WebhookClient } from './client';

export interface WebhookOption {
    host: string; // default: 0.0.0.0
    port: number; // default: 8080
    path: string; // default: /webhook
    https?: https.ServerOptions; // default: undefined (http)
}

export namespace WebhookOption {

    export function createDefault(): WebhookOption {
        return {
            host: '0.0.0.0',
            port: 8080,
            path: '/webhook',
        }
    }

}

export async function createWebhookClient(option: WebhookOption) {
    return new WebhookClient(option)
}

export * from './event';
export * from './client';