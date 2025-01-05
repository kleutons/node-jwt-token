import { NextFunction, Request, Response } from "express";
import { UserRole } from "../data/users";

export const isAdmin = (req: Request, res: Response, next: NextFunction)=>{
    if(req.user && req.user.role === UserRole.ADMIN){
        next();
    }else{
        res.status(403).json({
            message: "Forbidden: You don't have the required permissions."
        });
    }
}