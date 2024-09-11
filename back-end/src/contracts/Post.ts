interface IPost {
    _id: String;
    title: String;
    description: String;
    owner: String;
    createdAt: Date;
    updatedAt: Date | undefined;
}

export = IPost;
