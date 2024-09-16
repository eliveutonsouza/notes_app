import { Request } from 'express';

interface AuthReq extends Request {
    user?: {
        email: string;
    };
}

export = AuthReq;
