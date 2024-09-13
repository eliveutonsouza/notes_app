import IPost from './IPost';

interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    posts: Array<IPost>;
}

export = IUser;
