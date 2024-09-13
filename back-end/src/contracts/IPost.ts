interface IPost {
    _id: string;
    title: string;
    description: string;
    owner: String;
    createdAt: Date;
    updatedAt: Date | undefined;
}

export = IPost;
