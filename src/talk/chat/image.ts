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

import { ImageChatContent, ChatType } from '../../chat';
import { QuickReply } from '../../components';
import { TalkChatData } from './data';

export class ImageTalkChatData extends TalkChatData<ImageChatContent> {
    constructor(chatContent: ImageChatContent) {
        super(chatContent);
    }

    get type(): ChatType {
        return ChatType.IMAGE;
    }

    get imageUrl(): string {
        return this.chatContent.imageContent.imageUrl;
    }

    get quickReply(): QuickReply | undefined {
        return this.chatContent.imageContent.quickReply;
    }
}
