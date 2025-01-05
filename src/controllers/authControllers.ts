import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UsersData } from "../data/users";

const SECRET = process.env.SECRET || 'jwt-scret';

const userData = new UsersData();

const login = (req:Request, res:Response) => {

    const { email, password } = req.body;

    try{
        const user = userData.findByEmail(email);

        if(!user){
            return res.status(401).json({
                message: "User Not Found!",
                data: {
                    email
                }
            })
        }

        const validatePassword = bcrypt.compareSync(password, user.password);

        if(!validatePassword){
            return res.status(401).json({
                message: "Unauthorized!"
            })
        }

        const token = jwt.sign({name: user.name}, SECRET);

        res.json({
            message: "Login Successful!",
            data: {
                token
            }
        })

    }catch(err:any){
        console.error(err);
        res.status(500).json({
            message: err.message
        })
    }
}

export default {
    login
};