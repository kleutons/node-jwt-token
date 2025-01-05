import {v4 as uuid} from "uuid";
import bcrypt from "bcrypt";
import generatePassword from "../utils/generatePassword";


export enum UserRole{
    ADMIM,
    USER
}

export interface UserDTO {
    id: string
    name: string,
    email: string,
    password: string
    role: UserRole
}

export interface UserCreateDTO {
    name: string,
    email: string,
    password: string
}

interface UserFind{
    index: number,
    user: UserDTO
}

export class UsersData {

    private users: UserDTO[];

    constructor(){
        this.users = [];
        this.initializeUsers();
    }
    private async initializeUsers() {
        const hashPassword = await generatePassword("123456");
        if(!hashPassword){
            throw new Error("error generating password");
        }
        this.users.push({ 
            id: "1000", 
            name: "Admim", 
            email: "adim@email.com", 
            password: hashPassword!, 
            role: UserRole.ADMIM 
        });
    }

    public list():UserDTO[]{
        return this.users;
    }

    public findByEmail(email: string):UserDTO |undefined{
        const user = this.users.find((p)=> p.email.includes(String(email)));
        return user;
    }

    public findById(id: string):UserFind | null{
        const userIndex = this.users.findIndex((p)=> p.id === id);

        if(userIndex === -1){
            return null;
        }

        return { 
            index: userIndex,
            user: this.users[userIndex]
        };
    }
    
    public async create(data: UserCreateDTO):Promise<UserDTO>{
        const isExistes = this.findByEmail(data.email);

        const hashPassword = await generatePassword(data.password);
        if(!hashPassword){
            throw new Error("error generating password");
        }

        if(isExistes){
            throw new Error("User already exists!");
        }

        const newData: UserDTO = {
            id: uuid(),
            name: data.name,
            email: data.email,
            password: hashPassword,
            role: UserRole.USER
        }

        this.users.push(newData);

        return newData
    }

    public async update(id:string, data: Partial<UserCreateDTO> ){
        const isExistes = this.findById(id);

        if(!isExistes){
            throw new Error("User already exists!");
        }

        if(data.password){
            const hashPassword = await generatePassword("123456");
            if(!hashPassword){
                throw new Error("error generating password");
            }else{
                data.password = hashPassword;
            }
        }

        const updateProduct: UserDTO = {
            ...isExistes.user, 
            ...data
        };

        this.users[isExistes.index] = updateProduct;

        return updateProduct;
    }

    public delete(id:string ){
        const isExistes = this.findById(id);

        if(!isExistes){
            throw new Error("User not found!");
        }

        this.users.splice(isExistes.index, 1);

        return;
    }

}