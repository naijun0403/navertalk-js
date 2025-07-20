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

export type MenuType = 'TEXT' | 'LINK' | 'NESTED';

export interface MenuContent {
    menus: Menu[];
}

export interface Menu {
    type: MenuType;
    data: unknown;
}

export interface TextMenu extends Menu {
    type: 'TEXT';
    data: {
        title: string;
        code: string;
    }
}

export interface LinkMenu extends Menu {
    type: 'LINK';
    data: {
        title: string;
        url: string;
        mobileUrl: string;
    }
}

export interface NestedMenu extends Menu {
    type: 'NESTED';
    data: {
        title: string;
        menus: MenuContent;
    }
}