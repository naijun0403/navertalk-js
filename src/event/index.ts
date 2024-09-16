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

/**
 * basic event interface
 * @reference https://github.com/navertalk/chatbot-api?tab=readme-ov-file#%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EA%B8%B0%EB%B3%B8-%EA%B5%AC%EC%A1%B0
 */
export interface Event<T = Record<string, unknown>> {
    event: EventType;
    options: T;
    user: string;
}

export type EventType = 'open' | 'leave' | 'friend' | 'send' | 'echo' | 'action' | 'persistentMenu';

export * from './open';
export * from './friend';
export * from './send';