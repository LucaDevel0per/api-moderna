import { Router } from "express";
import UserController from "../controllers/UserController";
import ProductController from "../controllers/ProductController";

const router = Router();

router.get('/', (req, res) => {
    return res.json({ msg: "Olá, dev!" });
})

// Listar users
router.get('/users', UserController.list);

// Criar novo user
router.post('/users', UserController.create)

router.get('/products', ProductController.list);



export default router;