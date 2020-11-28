export type Comments = {
    comment: string;
    time: Date;
}
export type Card = {
    title: string;
    description: string;
    comments: Comments[];
}
export type List = {
    title: string;
    id: string;
    cards: Card[]
}
export type Board = {
    title: string;
    lists: List[];
}