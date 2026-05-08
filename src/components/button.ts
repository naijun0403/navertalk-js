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

export type ButtonType = 'TEXT' | 'LINK' | 'OPTION' | 'PAY';

export interface IButton<TType extends ButtonType = ButtonType, TData = unknown> {
    type: TType;
    data: TData;
}

export interface TextButton extends IButton<'TEXT', {
    title: string;
    code?: string;
}> {
    type: 'TEXT';
}

export interface LinkButton extends IButton<'LINK', {
    title: string;
    url: string;
    mobileUrl: string;
}> {
    type: 'LINK';
}

export interface PayButton extends IButton<'PAY', {
    payKey: string;
}> {
    type: 'PAY';
}

export type QuickReplyButton = TextButton | LinkButton | PayButton;
export type ElementButton = TextButton | LinkButton;

export interface OptionButton extends IButton<'OPTION', {
    title: string;
    buttonList: QuickReplyButton[];
}> {
    type: 'OPTION';
}

export type Button = TextButton | LinkButton | OptionButton | PayButton;
