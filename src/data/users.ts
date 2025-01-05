import {v4 as uuid} from "uuid";

export interface UserDTO {
    id: string
    name: string,
    email: string,
    password: string
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
    }
    
    public list():UserDTO[]{
        return this.users;
    }

    public findByName(name: string):UserDTO |undefined{
        const product = this.users.find((p)=> p.name.includes(String(name)));
        return product;
    }

    public findById(id: string):UserFind | null{
        const productIndex = this.users.findIndex((p)=> p.id === id);

        if(productIndex === -1){
            return null;
        }

        return { 
            index: productIndex,
            user: this.users[productIndex]
        };
    }
    
    public create(data: UserCreateDTO):UserDTO{
        const isExistes = this.findByName(data.name);

        if(isExistes){
            throw new Error("Product already exists!");
        }

        const newData: UserDTO = {
            id: uuid(),
            name: data.name,
            email: data.email,
            password: data.password
        }

        this.users.push(newData);

        return newData
    }

    public update(id:string, data: Partial<UserCreateDTO> ){
        const isExistes = this.findById(id);

        if(!isExistes){
            throw new Error("Product already exists!");
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
            throw new Error("Product not found!");
        }

        this.users.splice(isExistes.index, 1);

        return;
    }

}