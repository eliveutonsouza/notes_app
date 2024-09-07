import IPost from './Post';

interface IUser {
    id: String;
    name: String;
    email: String;
    password: String;
    posts: Array<IPost>;
}

export = IUser;
