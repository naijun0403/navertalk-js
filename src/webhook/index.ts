/*
 * Copyright 2024 naijun0403
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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