/**
 * basic event interface
 * @reference https://github.com/navertalk/chatbot-api?tab=readme-ov-file#%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EA%B8%B0%EB%B3%B8-%EA%B5%AC%EC%A1%B0
 */
export interface Event<T = Record<string, unknown>> {
    event: string;
    options: T;
    user: string;
}