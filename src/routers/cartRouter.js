import express, { Router } from "express";
import { postControllerProductCart, postControllerCart, getControllerIdCart, putControllerCart, deleteControllerProductCart, deleteTotalControllerProductCart, getControllerCartProduct } from '../controllers/cartController.js'


export const cartRouter = Router()

cartRouter.get('/api/carts/:id', getControllerIdCart)
cartRouter.get('/api/carts/:cid', getControllerCartProduct)
cartRouter.post('/api/carts/', express.json(), postControllerCart)
cartRouter.post('/api/carts/:cid/product/:pid', express.json(), postControllerProductCart)
cartRouter.put('/api/carts/:cid/products/:pid', express.json(), putControllerCart)
cartRouter.delete('/api/carts/:cid', express.json(), deleteTotalControllerProductCart)
cartRouter.delete('/api/carts/:cid/product/:pid', express.json(), deleteControllerProductCart)

