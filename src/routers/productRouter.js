import express, { Router } from "express";
import { getController, postController, getControllerId, putController, deleteController } from "../controllers/productController.js";

export const productRouter = Router()
productRouter.get('/api/products/', getController)
productRouter.get('/api/products/:id', getControllerId)
productRouter.post('/api/products/', express.json(), postController)
productRouter.put('/api/products/:id', express.json(), putController)
productRouter.delete('/api/products/:id', express.json(), deleteController)