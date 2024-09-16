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

import { WebhookOption } from './index';
import EventEmitter from 'eventemitter3';
import TypedEmitter from 'typed-emitter/rxjs';
import { WebhookEvent } from './event';
import { Event } from '../event';
import fastify, { FastifyInstance } from 'fastify';

export class WebhookClient extends (EventEmitter as unknown as new () => TypedEmitter<WebhookEvent>) {
    private _server: FastifyInstance | null = null;

    constructor(
        private option: WebhookOption = WebhookOption.createDefault()
    ) {
        super();
    }

    initialize() {
        if (this._server !== null) throw new Error('Already initialized, please call destroy() first.');

        this._server = fastify(this.option.options ?? {});

        this._server.post(this.option.path, async (request, reply) => {
            const data = request.body as Event;
            this.emit('on_event', data);
            return reply.code(200).send();
        });

        this._server.listen({ port: this.option.port, host: this.option.host }, (err) => {
            if (err) {
                console.error('Error starting server:', err);
                process.exit(1);
            }
        });
    }

    async destroy() {
        if (this._server === null) throw new Error('Not initialized, please call initialize() first.');
        await this._server.close();
        this._server = null;
    }
}
