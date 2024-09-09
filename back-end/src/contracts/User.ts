import IPost from './Post';

interface IUser {
    _id: String;
    name: String;
    email: String;
    password: String;
    posts: Array<IPost>;
}

export = IUser;
