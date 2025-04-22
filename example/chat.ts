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

import { TalkClient, createWebhookClient } from '../src';

async function main() {
    const client = await TalkClient.create(
        await createWebhookClient({
            host: '0.0.0.0',
            port: 8080,
            path: '/webhook',
            options: {
                logger: true
            }
        }),
        'YOUR_API_KEY',
    );

    client.on('on_send', async (chat, channel) => {
        console.log('on_send', chat, channel);

        if (chat.isTextType() && chat.text === '!ping') {
            await channel.send('!ping');
        }
    });

    await client.start();

    console.log('Client started');
}

main();