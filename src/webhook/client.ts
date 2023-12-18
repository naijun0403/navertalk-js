import { WebhookOption } from './index';
import EventEmitter from 'eventemitter3';
import TypedEmitter from 'typed-emitter/rxjs';
import { WebhookEvent } from './event';
import * as http from 'http';
import * as https from 'https';
import { IncomingMessage, ServerResponse } from 'http';
import { Event } from '../event';

export class WebhookClient extends (EventEmitter as unknown as new () => TypedEmitter<WebhookEvent>) {
    private _httpServer: http.Server | null = null;

    constructor(
        private option: WebhookOption = WebhookOption.createDefault()
    ) {
        super();
    }

    private _listen<
        Request extends typeof IncomingMessage = typeof IncomingMessage,
        Response extends typeof ServerResponse = typeof ServerResponse,
    >(req: InstanceType<Request>, res: InstanceType<Response> & { req: InstanceType<Request> }) {
        if (req.url !== this.option.path) return res.end();

        if (req.method !== 'POST') return res.end(); // other method not allowed

        const body: Uint8Array[] = [];
        req.on('data', chunk => body.push(chunk));
        req.on('end', () => {
            const data = Buffer.concat(body).toString();
            res.writeHead(200);
            res.end();

            this.emit('on_event', JSON.parse(data) as Event);
        });
    }

    initialize() {
        if (this._httpServer !== null) throw new Error('Already initialized, please call destroy() first.');

        if (this.option.https !== undefined) {
            this._httpServer = https.createServer({
                ...this.option.https,
            }, this._listen.bind(this)).listen(this.option.port, this.option.host);
        } else {
            this._httpServer = http.createServer(this._listen.bind(this)).listen(this.option.port, this.option.host);
        }
    }

    destroy() {
        if (this._httpServer === null) throw new Error('Not initialized, please call initialize() first.');
    }
}