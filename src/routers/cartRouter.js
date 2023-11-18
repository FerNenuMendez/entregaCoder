import express, { Router } from "express";
import {postController, getControllerId, postControllerProduct} from '../controllers/cartController.js'


export const cartRouter = Router()

cartRouter.post('/api/carts/', express.json(), postController )
cartRouter.get('/api/carts/:id', getControllerId)
cartRouter.post('/api/carts/:id/product/:idp', express.json(), postControllerProduct)
