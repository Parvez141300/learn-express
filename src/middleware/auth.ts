// higher order function means this function will return a function

import { NextFunction, Request, Response } from "express"

const auth = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        console.log({authToken: token});
    }
}

export default auth;