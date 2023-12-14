import { Event } from '../event';

export type WebhookEvent = {
    on_event: (event: Event) => void;
}