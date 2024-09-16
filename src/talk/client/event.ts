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

import { Event, OpenEventOptions, FriendEventOptions } from '../../event';
import { TalkChatData } from '../chat';
import { TalkChannel } from '../channel';

export type ClientEvent = {
    on_event: (event: Event) => void;
    on_error: (error: Error) => void;

    on_open: (event: Event<OpenEventOptions>) => void;

    on_leave: (event: Event) => void;

    on_friend: (event: Event<FriendEventOptions>) => void;

    on_send: (chat: TalkChatData, channel: TalkChannel) => void;
}