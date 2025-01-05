import { Router } from "express";

import UserConroller from "../controllers/userController";
import AuthController from "../controllers/authControllers";

const router = Router();

const urlPrefix = "/api";

enum ROUTERS {
    LOGIN       = '/login',
    USER        = urlPrefix+'/user',
    PRODUCT     = urlPrefix+'/product'
}


const userConroller     = new UserConroller();
const authControllers   = new AuthController();


router.get(ROUTERS.USER, (req, res)=>{
   userConroller.listAll(req, res);
})

router.post(ROUTERS.USER, authControllers.verifyToken, (req, res)=>{
    userConroller.create(req, res);
 })

 router.put(ROUTERS.USER+"/:id", authControllers.verifyToken, (req, res)=>{
    userConroller.update(req, res);
 })

 router.delete(ROUTERS.USER+"/:id", authControllers.verifyToken, (req, res)=>{
    userConroller.delete(req, res);
 })

router.get(ROUTERS.PRODUCT, (req, res)=>{
    res.json({
        messsage: "Rota de Produtos"
    })
})





router.post(ROUTERS.LOGIN, (req, res)=>{
    authControllers.login(req, res);
});

export default router;