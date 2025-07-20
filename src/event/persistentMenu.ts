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

import { MenuContent } from "../menu";

// 다른 이벤트과는 다르게 options 필드가 없고 유저가 직접 보내는게 아니기 떄문에 user 필드도 없음, 
export interface PersistentMenuEvent {
    event: 'persistentMenu';
    menuContent: MenuContent;
}