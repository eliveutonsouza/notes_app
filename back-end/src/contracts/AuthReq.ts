import { Request } from 'express';

interface AuthReq extends Request {
    user?: {
        email: string;
    };
    query: {
        page: string;
        title: string;
    };
}

export = AuthReq;
