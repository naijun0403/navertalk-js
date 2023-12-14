import { WebhookClient } from '../../webhook';

export class NaverTalkClient {

    private constructor(
        private _webhook: WebhookClient
    ) {}

    static async create(webhook: WebhookClient): Promise<NaverTalkClient> {
        return new NaverTalkClient(webhook);
    }

}