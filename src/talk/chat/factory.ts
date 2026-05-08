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
    ChatContentFields,
    isCompositeChatContent,
    isImageChatContent,
    isTextChatContent,
} from '../../chat';
import { CompositeTalkChatData } from './composite';
import { TalkChatData } from './data';
import { ImageTalkChatData } from './image';
import { TextTalkChatData } from './text';

export function createTalkChatData(content: ChatContentFields): TalkChatData {
    if (isTextChatContent(content)) {
        return new TextTalkChatData(content);
    }

    if (isImageChatContent(content)) {
        return new ImageTalkChatData(content);
    }

    if (isCompositeChatContent(content)) {
        return new CompositeTalkChatData(content);
    }

    throw new Error('send event must contain exactly one of textContent, imageContent, or compositeContent');
}
