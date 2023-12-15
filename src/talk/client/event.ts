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