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

import { WebhookClient } from '../../webhook';
import { EventHandler, NaverTalkEventHandler } from '../event/handlers';
import { Event } from '../../event';
import EventEmitter from 'eventemitter3';
import TypedEmitter from 'typed-emitter/rxjs';
import { ClientEvent } from './event';
import { TalkClientSession } from './session';

export class TalkClient extends (EventEmitter as unknown as new () => TypedEmitter<ClientEvent>) {
    private readonly _session: TalkClientSession;
    private _eventHandler: EventHandler;

    private constructor(
        private _webhook: WebhookClient,
        private _authorization: string,
        private _options: ClientOptions,
    ) {
        super();

        this._session = new TalkClientSession(_authorization, _options);
        this._eventHandler = new NaverTalkEventHandler(this._session, this)
    }

    async start() {
        this._webhook.on('on_event', this.handleEvent.bind(this));
        this._webhook.initialize();
    }

    private async handleEvent(event: Event) {
        switch (event.event) {
            case 'open':
                this._eventHandler.handleOpen(event);
                break;
            case 'leave':
                this._eventHandler.handleLeave(event);
                break;
            case 'friend':
                this._eventHandler.handleFriend(event);
                break;
            case 'send':
                this._eventHandler.handleSend(event);
                break;
            case 'echo':
                this._eventHandler.handleEcho(event);
                break;
            case 'action':
                this._eventHandler.handleAction(event);
                break;
            default:
                throw new Error(`Unhandled event: ${event.event}`);
        }
    }

    static async create(webhook: WebhookClient, authorization: string, options: Partial<ClientOptions> = {}): Promise<TalkClient> {
        return new TalkClient(webhook, authorization, { talkHost: 'https://gw.talk.naver.com', ...options });
    }
}

export interface ClientOptions {
    talkHost: string;
}