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

import { ActionEventOptions, EchoEvent, Event, FriendEventOptions, OpenEventOptions, SendEvent } from '../../event';
import { TalkClientSession } from '../client/session';
import { TalkChannel } from '../channel';
import { TalkClient } from '../client';
import { TalkChatData } from '../chat';
import { TextTalkChatData } from '../chat/text';
import { ImageTalkChatData } from '../chat/image';
import { CompositeTalkChatData } from '../chat/composite';

// persistentMenu는 유저가 전송할 수 없는 이벤트이니 처리 대상에서 제외
export interface EventHandler {
    handleOpen(event: Event): Promise<void>;
    handleLeave(event: Event): Promise<void>;
    handleFriend(event: Event): Promise<void>;
    handleSend(event: Event): Promise<void>;
    handleEcho(event: Event): Promise<void>;
    handleAction(event: Event): Promise<void>;
}

export class NaverTalkEventHandler implements EventHandler {
    constructor(
        private session: TalkClientSession,
        private client: TalkClient,
    ) {
    }

    async handleOpen(event: Event): Promise<void> {
        const open = event as unknown as Event<OpenEventOptions>;

        if (!this.session.channelMap.has(open.user)) {
            this.session.channelMap.set(open.user, new TalkChannel(open.user, this.session));
        }

        this.client.emit('on_open', open, this.session.channelMap.get(open.user)!!);
    }

    async handleLeave(event: Event): Promise<void> {
        this.client.emit('on_leave', event)
    }

    async handleFriend(event: Event): Promise<void> {
        const friend = event as unknown as Event<FriendEventOptions>;

        if (!this.session.channelMap.has(friend.user)) {
            this.session.channelMap.set(friend.user, new TalkChannel(friend.user, this.session));
        }

        this.client.emit('on_friend', friend, this.session.channelMap.get(friend.user)!!);
    }

    async handleSend(event: Event): Promise<void> {
        const send = event as unknown as SendEvent;

        if (!this.session.channelMap.has(send.user)) {
            this.session.channelMap.set(send.user, new TalkChannel(send.user, this.session));
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
        const echo = event as unknown as EchoEvent;

        if (!this.session.channelMap.has(echo.user)) {
            this.session.channelMap.set(echo.user, new TalkChannel(echo.user, this.session));
        }

        this.client.emit('on_echo', echo, this.session.channelMap.get(echo.user)!!);
    }

    async handleAction(event: Event): Promise<void> {
        const action = event as unknown as Event<ActionEventOptions>;

        if (!this.session.channelMap.has(action.user)) {
            this.session.channelMap.set(action.user, new TalkChannel(action.user, this.session));
        }

        this.client.emit('on_action', action, this.session.channelMap.get(action.user)!!);
    }
}
