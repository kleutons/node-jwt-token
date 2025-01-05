import { Request, Response } from "express";
import { UserCreateDTO, UsersData } from "../data/users";

export default class UserConroller {

    private repository: UsersData;

    constructor(){
        this.repository = new UsersData();
    }

    public listAll(req:Request, res: Response){
        try{
            const result = this.repository.list();
            res.json(result);
        }catch(err){
            res.status(500).json({
                error:'Failed to list' 
            })
        }
    }

    public async create(req:Request, res: Response){
        const data = req.body as UserCreateDTO;

        if(!data.email || !data.password){
            res.status(500).json({
                error:'Send all data!' 
            })
        }

        try{
            const result = await this.repository.create(data);
            res.json(result);
        }catch(err){
            res.status(500).json({
                error:'Failed to Create' 
            })
        }
    }


    public async update(req:Request, res: Response){
        const id = req.params.id as string;
        const data = req.body as UserCreateDTO;

        try{
            const result =  await this.repository.update(id, data);
            res.json(result);
        }catch(err){
            res.status(500).json({
                error:'Failed to Create' 
            })
        }
    }


    public delete(req:Request, res: Response){
        const id = req.params.id as string;
        try{
            const result = this.repository.delete(id);
            res.json(result);
        }catch(err){
            res.status(500).json({
                error:'Failed to Create' 
            })
        }
    }

}