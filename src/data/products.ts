import {v4 as uuid} from "uuid";

interface ProductDTO {
    id: string
    name: string,
    description: string,
    price: number,
}

interface ProductCreateDTO {
    name: string,
    description: string,
    price: number,
}

interface ProductFind{
    index: number,
    product: ProductDTO
}

export class ProductData {

    private products: ProductDTO[];

    constructor(){
        this.products = [];
    }
    
    public list():ProductDTO[]{
        return this.products;
    }

    public findByName(name: string):ProductDTO |undefined{
        const product = this.products.find((p)=> p.name.includes(String(name)));
        return product;
    }

    public findById(id: string):ProductFind | null{
        const productIndex = this.products.findIndex((p)=> p.id === id);

        if(productIndex === -1){
            return null;
        }

        return { 
            index: productIndex,
            product: this.products[productIndex]
        };
    }
    
    public create(data: ProductCreateDTO):ProductDTO{
        const isExistes = this.findByName(data.name);

        if(isExistes){
            throw new Error("Product already exists!");
        }

        const newData: ProductDTO = {
            id: uuid(),
            name: data.name,
            description: data.description,
            price: data.price
        }

        this.products.push(newData);

        return newData
    }

    public update(id:string, data: Partial<ProductCreateDTO> ){
        const isExistes = this.findById(id);

        if(!isExistes){
            throw new Error("Product already exists!");
        }

        const updateProduct: ProductDTO = {
            ...isExistes.product, 
            ...data 
        };

        this.products[isExistes.index] = updateProduct;

        return updateProduct;
    }

    public delete(id:string ){
        const isExistes = this.findById(id);

        if(!isExistes){
            throw new Error("Product not found!");
        }

        this.products.splice(isExistes.index, 1);

        return;
    }

}