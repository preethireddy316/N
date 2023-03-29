import { createAction, props } from "@ngrx/store"
import { Product } from "src/app/models/product.model"

const get ="get products"
const delet="delete product"
const create="create product"
const update="update product"
const loadProductsSucc="load products success"

export const getProductsAction =createAction(get)

export const deleteProduct =createAction(delet,props<{id:string}>())

export const deleteProductSuccess =createAction(delet,props<{id:string}>())

export const createProductAction =createAction(create,props<{product:Product}>())

export const updateProduct =createAction(update,props<{product:Product}>())

export const updateProductSuccess =createAction("update product success",props<{product:Product}>())

export const loadProductsSuccess =createAction(loadProductsSucc,props<{products:Product[]}>())

export const addProductSuccess=createAction("add product success",props<{product:Product}>())

