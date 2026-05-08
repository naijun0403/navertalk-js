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

import {
    ActionEvent,
    EchoEvent,
    FriendEvent,
    IncomingEvent,
    LeaveEvent,
    OpenEvent,
    SendEvent,
} from '../../event';
import { TalkClientSession } from '../client/session';
import { TalkChannel } from '../channel';
import { createTalkChatData } from '../chat';
import type { TalkClient } from '../client';

// persistentMenu는 유저가 전송할 수 없는 이벤트이니 처리 대상에서 제외
export interface EventHandler {
    handle(event: IncomingEvent): Promise<void>;
}

type EventHandlerMap = {
    [TEvent in IncomingEvent['event']]: (event: Extract<IncomingEvent, { event: TEvent }>) => Promise<void>;
};

export class NaverTalkEventHandler implements EventHandler {
    private readonly handlers: EventHandlerMap = {
        open: event => this.handleOpen(event),
        leave: event => this.handleLeave(event),
        friend: event => this.handleFriend(event),
        send: event => this.handleSend(event),
        echo: event => this.handleEcho(event),
        action: event => this.handleAction(event),
    };

    constructor(
        private session: TalkClientSession,
        private client: TalkClient,
    ) {
    }

    async handle(event: IncomingEvent): Promise<void> {
        const handler = this.handlers[event.event] as (event: IncomingEvent) => Promise<void>;
        await handler(event);
    }

    private channelOf(event: { user: string }): TalkChannel {
        return this.session.getOrCreateChannel(event.user);
    }

    private async handleOpen(event: OpenEvent): Promise<void> {
        this.client.emit('on_open', event, this.channelOf(event));
    }

    private async handleLeave(event: LeaveEvent): Promise<void> {
        this.client.emit('on_leave', event);
    }

    private async handleFriend(event: FriendEvent): Promise<void> {
        this.client.emit('on_friend', event, this.channelOf(event));
    }

    private async handleSend(event: SendEvent): Promise<void> {
        this.client.emit('on_send', createTalkChatData(event), this.channelOf(event));
    }

    private async handleEcho(event: EchoEvent): Promise<void> {
        this.client.emit('on_echo', event, this.channelOf(event));
    }

    private async handleAction(event: ActionEvent): Promise<void> {
        this.client.emit('on_action', event, this.channelOf(event));
    }
}
