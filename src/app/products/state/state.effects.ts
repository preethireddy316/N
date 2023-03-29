import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
// import { Store } from "@ngrx/store";
import { map, mergeMap, switchMap } from "rxjs";
import { Product } from "src/app/models/product.model";
import { ProductService } from "src/app/service/products.service";
import {  addProductSuccess, createProductAction, deleteProduct, deleteProductSuccess, getProductsAction, loadProductsSuccess, updateProduct, updateProductSuccess } from "./state.actions";

@Injectable()

export class ProductEffects {
    constructor(private actions$:Actions,private productService: ProductService,
        // private store: Store<AppState>
        ) {}

    loadProducts$:any = createEffect(
      ()=>{
      return this.actions$.pipe(ofType(getProductsAction),mergeMap(()=>{
          return this.productService.getProductsService().pipe(map((products:Product[])=>{
            return loadProductsSuccess({products})
          }))
      }  
      ))
    })

    addPost$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(createProductAction),
        mergeMap((action) => {
          console.log(action)
          return this.productService.addProduct(action.product).pipe(
            map((data) => {
              console.log(data," add product effects data from service")
              const product = { ...action.product,id:data.name };
              return addProductSuccess({ product });
            })
          );
        })
      );
    }); 


    updateProduct$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(updateProduct),
        switchMap((action) => {
          return this.productService.updateProductService(action.product).pipe(
            map((data) => {
              return updateProductSuccess({ product: data });
            })
          );
        })
      );
    });

    deleteProduct$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(deleteProduct),
        switchMap((action) => {
          return this.productService.deleteProductService(action.id).pipe(
            map(() => {
              return deleteProductSuccess({ id: action.id });
            })
          );
        })
      );
    });
}