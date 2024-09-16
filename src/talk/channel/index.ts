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

import { ChatContent } from '../../chat';
import { TalkClientSession } from '../client/session';
import { SendEvent } from '../../event';
import { EventResult } from '../../request';

export class TalkChannel {

    constructor(
        private _userId: string,
        private _session: TalkClientSession
    ) {
    }

    get userId(): string {
        return this._userId;
    }

    async send(chat: string | ChatContent): Promise<EventResult> {
        let req: Partial<SendEvent> = {
            event: 'send',
            user: this._userId,
        }

        req = typeof chat === 'string' ? { ...req, textContent: { text: chat } } : { ...req, ...chat }

        return await this._session.requestEvent<SendEvent>(req as SendEvent);
    }

}