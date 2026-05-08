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

import { type ClientOptions } from './index';
import { type EventResult } from '../../request';
import { TalkChannel } from '../channel';
import { type OutgoingEvent } from '../../event';

export class TalkClientSession {
    public readonly channelMap: Map<string, TalkChannel> = new Map();

    constructor(
        private _authorization: string,
        private _options: ClientOptions
    ) {}

    getOrCreateChannel(userId: string): TalkChannel {
        const channel = this.channelMap.get(userId);

        if (channel !== undefined) {
            return channel;
        }

        const created = new TalkChannel(userId, this);
        this.channelMap.set(userId, created);
        return created;
    }

    async requestEvent<T extends OutgoingEvent>(event: T): Promise<EventResult> {
        return await (await fetch(`${this._options.talkHost}/chatbot/v1/event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this._authorization
            },
            body: JSON.stringify(event)
        })).json() as EventResult;
    }
}
