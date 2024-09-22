import IPost from './IPost';

interface PaginationIPost {
    posts: IPost[];
    limit: number;
    documentCount: number;
}

export = PaginationIPost;
