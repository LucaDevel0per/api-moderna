import express, { Express, Request, Response, NextFunction } from "express";
import 'express-async-errors'
import router from "./routes";

export const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction ) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message,
        })
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});


app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
})