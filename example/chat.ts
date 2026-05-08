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

import { type ChatContent, type MenuContent, type QuickReply, TalkClient, createWebhookClient } from 'navertalk-js';

const quickReply: QuickReply = {
    buttonList: [
        {
            type: 'TEXT',
            data: {
                title: '도움말',
                code: 'HELP',
            },
        },
        {
            type: 'LINK',
            data: {
                title: '톡톡 열기',
                url: 'https://talk.naver.com/',
                mobileUrl: 'https://talk.naver.com/',
            },
        },
    ],
};

const persistentMenu: MenuContent = {
    menus: [
        {
            type: 'TEXT',
            data: {
                title: '도움말',
                code: 'HELP',
            },
        },
        {
            type: 'LINK',
            data: {
                title: '홈페이지',
                url: 'https://talk.naver.com/',
                mobileUrl: 'https://talk.naver.com/',
            },
        },
        {
            type: 'NESTED',
            data: {
                title: '더보기',
                menus: [
                    {
                        type: 'TEXT',
                        data: {
                            title: '상담원 연결',
                            code: 'CONTACT',
                        },
                    },
                ],
            },
        },
    ],
};

const helpMessage: ChatContent = {
    textContent: {
        text: '사용할 수 있는 명령어: !ping, !image, !menu',
        quickReply,
    },
};

async function main() {
    const client = await TalkClient.create(
        await createWebhookClient({
            host: '0.0.0.0',
            port: 8080,
            path: '/webhook',
            options: {
                logger: true,
            },
        }),
        process.env.NAVER_TALK_AUTHORIZATION ?? 'YOUR_API_KEY',
    );

    client.on('on_open', async (event, channel) => {
        console.log('on_open', event.options.inflow, event.user);
        await channel.send(helpMessage);
    });

    client.on('on_friend', async (event, channel) => {
        const text = event.options.set === 'on'
            ? '친구 추가 감사합니다.'
            : '친구 철회가 처리되었습니다.';

        await channel.send({ textContent: { text } });
    });

    client.on('on_send', async (chat, channel) => {
        console.log('on_send', chat.type, channel.userId);

        if (!chat.isTextType()) {
            await channel.send('텍스트 메시지만 처리하는 예제입니다.');
            return;
        }

        switch (chat.code ?? chat.text) {
            case 'HELP':
            case '!menu':
                await channel.send(helpMessage);
                return;

            case '!ping':
                await channel.send('pong');
                return;

            case '!image':
                await channel.send({
                    imageContent: {
                        imageUrl: 'https://ssl.pstatic.net/static/talk/biztalk/img_profile_default.png',
                        quickReply,
                    },
                });
                return;

            default:
                await channel.send({
                    textContent: {
                        text: `echo: ${chat.text}`,
                        quickReply,
                    },
                });
        }
    });

    client.on('on_echo', event => {
        console.log('on_echo', event.partner, event.echoedEvent);
    });

    if (process.env.SET_PERSISTENT_MENU === 'true') {
        await client.menuController.setMenu(persistentMenu);
    }

    await client.start();

    console.log('Client started');
}

main();
