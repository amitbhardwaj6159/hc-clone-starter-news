export interface INews {
    hits: INewsItem[];
    nbHits: number;
    page: number;
    nbPages: number;
    hitsPerPage: number;
}
export interface INewsItem {
    created_at: string;
    title: string;
    url: string;
    author: string;
    points: number;
    num_comments: number;
    created_at_i: number;
}
