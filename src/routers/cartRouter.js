import express, { Router } from "express";
import { postControllerProductCart, postControllerCart, getControllerIdCart } from '../controllers/cartController.js'


export const cartRouter = Router()

cartRouter.post('/api/carts/', express.json(), postControllerCart)
cartRouter.get('/api/carts/:id', getControllerIdCart)
cartRouter.post('/api/carts/:cid/product/:pid', express.json(), postControllerProductCart)