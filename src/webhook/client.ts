import { WebhookOption } from './index';
import EventEmitter from 'eventemitter3';
import TypedEmitter from 'typed-emitter/rxjs';
import { WebhookEvent } from './event';

export class WebhookClient extends (EventEmitter as unknown as new () => TypedEmitter<WebhookEvent>) {
    constructor(
        private option: WebhookOption = WebhookOption.createDefault()
    ) {
        super();
    }
}