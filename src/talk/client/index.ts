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

import { type WebhookClient } from '../../webhook';
import { type EventHandler, NaverTalkEventHandler } from '../event';
import { isIncomingEvent, type WebhookEventPayload } from '../../event';
import { type ClientEvent } from './event';
import { TalkClientSession } from './session';
import { TypedEmitter } from 'tiny-typed-emitter';
import { MenuController } from '../menu';

export class TalkClient extends TypedEmitter<ClientEvent> {
    private readonly _session: TalkClientSession;
    private _eventHandler: EventHandler;
    private _menuController: MenuController;

    private constructor(
        private _webhook: WebhookClient,
        _authorization: string,
        _options: ClientOptions,
    ) {
        super();
        this._session = new TalkClientSession(_authorization, _options);
        this._eventHandler = new NaverTalkEventHandler(this._session, this);
        this._menuController = new MenuController(this._session);
    }

    get menuController() {
        return this._menuController;
    }

    async start() {
        this._webhook.on('on_event', this.handleEvent.bind(this));
        this._webhook.on('error', error => {
            this.emit('on_error', error);
        });
        try {
            await this._webhook.initialize();
        } catch (error) {
            if (error instanceof Error) {
                this.emit('on_error', error);
                return;
            }
            this.emit('on_error', new Error(String(error)));
        }
    }

    private async handleEvent(event: WebhookEventPayload) {
        if (!isIncomingEvent(event)) {
            this.emit('on_error', new Error(`Unhandled event: ${event.event}`));
            return;
        }

        this.emit('on_event', event);

        try {
            await this._eventHandler.handle(event);
        } catch (error) {
            if (error instanceof Error) {
                this.emit('on_error', error);
                return;
            }
            this.emit('on_error', new Error(String(error)));
        }
    }

    static async create(
        webhook: WebhookClient,
        authorization: string,
        options: Partial<ClientOptions> = {}
    ): Promise<TalkClient> {
        return new TalkClient(webhook, authorization, { talkHost: 'https://gw.talk.naver.com', ...options });
    }
}

export interface ClientOptions {
    talkHost: string;
}
