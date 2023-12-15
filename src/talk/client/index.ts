import { WebhookClient } from '../../webhook';

export class NaverTalkClient {

    private constructor(
        private _webhook: WebhookClient
    ) {}

    async start() {
        this._webhook.on('on_event', (event) => {

        })
    }

    static async create(webhook: WebhookClient): Promise<NaverTalkClient> {
        return new NaverTalkClient(webhook);
    }

}