import express, { Router } from "express";
import { postControllerProductCart, postControllerCart, getControllerIdCart, putControllerCart, deleteControllerProductCart, deleteTotalControllerProductCart, getControllerCartProduct } from '../../controllers/cartController.js'


export const cartRouter = Router()

cartRouter.get('/:id', getControllerIdCart)
cartRouter.get('/:cid', getControllerCartProduct)
cartRouter.post('/', express.json(), postControllerCart)
cartRouter.post('/:cid/product/:pid', express.json(), postControllerProductCart)
cartRouter.put('/:cid/products/:pid', express.json(), putControllerCart)
cartRouter.delete('/:cid', express.json(), deleteTotalControllerProductCart)
cartRouter.delete('/:cid/product/:pid', express.json(), deleteControllerProductCart)

