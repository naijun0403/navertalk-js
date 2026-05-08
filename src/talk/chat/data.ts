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
import type { CompositeTalkChatData } from './composite';
import type { ImageTalkChatData } from './image';
import type { TextTalkChatData } from './text';

export abstract class TalkChatData<TContent extends ChatContent = ChatContent> {
    protected constructor(
        protected readonly chatContent: TContent
    ) {}

    abstract get type(): ChatType;

    get content(): TContent {
        return this.chatContent;
    }

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
