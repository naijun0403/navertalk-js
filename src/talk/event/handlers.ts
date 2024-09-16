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

import { Event, SendEvent } from '../../event';
import { TalkClientSession } from '../client/session';
import { TalkChannel } from '../channel';
import { TalkClient } from '../client';
import { TalkChatData } from '../chat';
import { TextTalkChatData } from '../chat/text';
import { ImageTalkChatData } from '../chat/image';
import { CompositeTalkChatData } from '../chat/composite';

// persistentMenu는 유저가 전송할 수 없는 이벤트이니 처리 대상에서 제외
export interface EventHandler {
    handleOpen(event: Event): void;
    handleLeave(event: Event): void;
    handleFriend(event: Event): void;
    handleSend(event: Event): void;
    handleEcho(event: Event): void;
    handleAction(event: Event): void;
}

export class NaverTalkEventHandler implements EventHandler {
    constructor(
        private session: TalkClientSession,
        private client: TalkClient,
    ) {
    }

    async handleOpen(event: Event): Promise<void> {

    }

    async handleLeave(event: Event): Promise<void> {

    }

    async handleFriend(event: Event): Promise<void> {

    }

    async handleSend(event: Event): Promise<void> {
        const send = event as unknown as SendEvent;

        if (!this.session.channelMap.has(send.user)) {
            this.session.channelMap.set(send.user, new TalkChannel(send.user, this.session))
        }

        let chat: TalkChatData;

        if (send.textContent) {
            chat = new TextTalkChatData(send);
        } else if (send.imageContent) {
            chat = new ImageTalkChatData(send);
        } else if (send.compositeContent) {
            chat = new CompositeTalkChatData(send);
        } else {
            throw new Error('Invalid chat request')
        }

        this.client.emit('on_send', chat, this.session.channelMap.get(send.user)!!);
    }

    async handleEcho(event: Event): Promise<void> {

    }

    async handleAction(event: Event): Promise<void> {

    }
}
