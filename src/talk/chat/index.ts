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

import { ChatContent, ChatType } from '../../chat';
import { TextTalkChatData } from './text';
import { ImageTalkChatData } from './image';
import { CompositeTalkChatData } from './composite';

export abstract class TalkChatData {
    protected constructor(
        protected chatContent: ChatContent
    ) {}

    abstract get type(): ChatType;

    isTextType(): this is TextTalkChatData {
        return this.type === ChatType.TEXT;
    }

    isImageType(): this is ImageTalkChatData {
        return this.type === ChatType.IMAGE;
    }

    isComposite(): this is CompositeTalkChatData {
        return this.type === ChatType.COMPOSITE;
    }
}