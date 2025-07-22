import { Router } from "express";
import UserController from "../controllers/UserController";
import ProductController from "../controllers/ProductController";
import SessionController from "../controllers/SessionController";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = Router();

router.get('/', (req, res) => {
    return res.json({ msg: "Olá, dev!" });
})

// Rotas dos Users
router.get('/users', isAuthenticated, UserController.list);
router.post('/users', UserController.create)

// Rotas dos Produtos
router.get('/products', ProductController.list);

//Rotas da sessções
router.post('/sessions', SessionController.create)



export default router;