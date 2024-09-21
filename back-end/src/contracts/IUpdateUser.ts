interface IUpdateUser {
    body: {
        name?: string;
        password?: string;
        newPassword?: string;
    };
}

export = IUpdateUser;
