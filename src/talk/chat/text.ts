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

import { TalkChatData } from './index';
import { ChatContent } from '../../chat';
import { ChatType } from '../../chat/type';
import { InputType } from '../../chat/text';

export class TextTalkChatData extends TalkChatData {
    constructor(chatContent: ChatContent) {
        super(chatContent);
    }

    get type(): ChatType {
        return ChatType.TEXT;
    }

    get text(): string {
        return this.chatContent.textContent?.text!!
    }

    get code(): string {
        return this.chatContent.textContent?.code!!;
    }

    get inputType(): InputType {
        return this.chatContent.textContent?.inputType!!;
    }
}