import IUser from './User';

interface IPost {
    id: String;
    title: String;
    description: String;
    owner: IUser;
}

export = IPost;
