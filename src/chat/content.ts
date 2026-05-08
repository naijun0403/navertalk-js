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

import { TextContent } from './text';
import { ImageContent } from './image';
import { CompositeContent } from './composite';

export interface ChatContentFields {
    textContent?: TextContent;
    imageContent?: ImageContent;
    compositeContent?: CompositeContent;
}

export interface TextChatContent extends ChatContentFields {
    textContent: TextContent;
    imageContent?: never;
    compositeContent?: never;
}

export interface ImageChatContent extends ChatContentFields {
    textContent?: never;
    imageContent: ImageContent;
    compositeContent?: never;
}

export interface CompositeChatContent extends ChatContentFields {
    textContent?: never;
    imageContent?: never;
    compositeContent: CompositeContent;
}

export type ChatContent = TextChatContent | ImageChatContent | CompositeChatContent;

export type ChatContentKey = keyof ChatContentFields;

export function getChatContentKey(content: ChatContentFields): ChatContentKey | undefined {
    const keys = (['textContent', 'imageContent', 'compositeContent'] as const)
        .filter(key => content[key] !== undefined);

    return keys.length === 1 ? keys[0] : undefined;
}

export function isTextChatContent(content: ChatContentFields): content is TextChatContent {
    return getChatContentKey(content) === 'textContent';
}

export function isImageChatContent(content: ChatContentFields): content is ImageChatContent {
    return getChatContentKey(content) === 'imageContent';
}

export function isCompositeChatContent(content: ChatContentFields): content is CompositeChatContent {
    return getChatContentKey(content) === 'compositeContent';
}
