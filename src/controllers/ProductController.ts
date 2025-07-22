import { Request, Response } from "express";
import ListProductsService from "../services/ListProductsService";

class ProductController {
    public list(request: Request, response: Response): Response {
        const listProducts = new ListProductsService

        const products = listProducts.execute();
        
        return response.json(products)
    }
}

export default new ProductController();