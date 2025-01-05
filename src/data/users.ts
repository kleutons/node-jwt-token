import {v4 as uuid} from "uuid";
import bcrypt from "bcrypt";
import generatePassword from "../utils/generatePassword";


export enum UserRole{
    ADMIN,
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

    private static users: UserDTO[] = [];

    constructor(){
        this.initializeUsers();
    }
    private async initializeUsers() {
        const hashPassword = await generatePassword("123456");
        if(!hashPassword){
            throw new Error("error generating password");
        }
        UsersData.users.push({ 
            id: "1000", 
            name: "Admin", 
            email: "adm@email.com", 
            password: hashPassword!, 
            role: UserRole.ADMIN 
        });
    }

    public list():UserDTO[]{
        return UsersData.users;
    }

    public findByEmail(email: string):UserDTO |undefined{
        const user = UsersData.users.find((p)=> p.email.includes(String(email)));
        console.log(UsersData.users);
        console.log(user);
        return user;
    }

    public findById(id: string):UserFind | null{
        const userIndex = UsersData.users.findIndex((p)=> p.id === id);

        if(userIndex === -1){
            return null;
        }

        return { 
            index: userIndex,
            user: UsersData.users[userIndex]
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

        UsersData.users.push(newData);

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

        UsersData.users[isExistes.index] = updateProduct;

        return updateProduct;
    }

    public delete(id:string ){
        const isExistes = this.findById(id);

        if(!isExistes){
            throw new Error("User not found!");
        }

        UsersData.users.splice(isExistes.index, 1);

        return;
    }

}