import { Router } from "express";

const router = Router();

const urlPrefix = "/api";

const routerProduct = urlPrefix+'/product';

router.get(routerProduct, (req, res)=>{
    res.json({
        messsage: "Rota de Produtos"
    })
})

export default router;