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

    private static products: ProductDTO[] = [];

    
    public list():ProductDTO[]{
        return ProductData.products;
    }

    public findByName(name: string):ProductDTO |undefined{
        const product = ProductData.products.find((p)=> p.name.includes(String(name)));
        return product;
    }

    public findById(id: string):ProductFind | null{
        const productIndex = ProductData.products.findIndex((p)=> p.id === id);

        if(productIndex === -1){
            return null;
        }

        return { 
            index: productIndex,
            product: ProductData.products[productIndex]
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

        ProductData.products.push(newData);

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

        ProductData.products[isExistes.index] = updateProduct;

        return updateProduct;
    }

    public delete(id:string ){
        const isExistes = this.findById(id);

        if(!isExistes){
            throw new Error("Product not found!");
        }

        ProductData.products.splice(isExistes.index, 1);

        return;
    }

}