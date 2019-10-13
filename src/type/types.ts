export interface Replies {
    id: number;
    text: string;
    userId: number;
    userName?: string;
    replies?: Replies[];
}
export interface Comment {
    userId: number;
    userName: string;
    replyTo?: number;
    text: string;
}