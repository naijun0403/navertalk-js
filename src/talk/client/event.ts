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

import { Event } from '../../event';

export type ClientEvent = {
    on_event: (event: Event) => void;
    on_error: (error: Error) => void;

    /**
     * `open` 이벤트가 발생할 때마다 호출됩니다.
     */
    on_open: () => void;

    /**
     * `send` 이벤트가 발생할 때마다 호출됩니다.
     * @param message
     */
    on_message: (message: Event.Message) => void;
}