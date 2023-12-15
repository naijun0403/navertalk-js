import { WebhookOption } from './index';
import EventEmitter from 'eventemitter3';
import TypedEmitter from 'typed-emitter/rxjs';
import { WebhookEvent } from './event';
import * as http from 'http';
import * as https from 'https';

export class WebhookClient extends (EventEmitter as unknown as new () => TypedEmitter<WebhookEvent>) {
    private _httpServer: http.Server | null = null;

    constructor(
        private option: WebhookOption = WebhookOption.createDefault()
    ) {
        super();
    }

    initialize() {
        if (this._httpServer !== null) throw new Error('Already initialized, please call destroy() first.');

        if (this.option.https !== undefined) {
            this._httpServer = https.createServer({
                ...this.option.https,
            }).listen(this.option.port, this.option.host);
        } else {

        }
    }

    destroy() {
        if (this._httpServer === null) throw new Error('Not initialized, please call initialize() first.');
    }
}