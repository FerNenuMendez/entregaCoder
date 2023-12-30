import express, { Router } from "express";
import { getController, postController, getControllerId, putController, deleteController } from "../../controllers/productController.js";

export const productRouter = Router()
productRouter.get('/', getController)
productRouter.get('/:id', getControllerId)
productRouter.post('/', express.json(), postController)
productRouter.put('/:id', express.json(), putController)
productRouter.delete('/:id', express.json(), deleteController)