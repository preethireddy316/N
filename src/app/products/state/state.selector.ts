import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { ProductState } from './state';

const getProductsState = createFeatureSelector<ProductState>('products');

export const getProducts = createSelector(getProductsState, (state)=> {
  return state.products;
});

export const getProductById = createSelector(getProductsState, (state:any,props:any) => {
  console.log("selector")
 return state.products.find((product:any) => product.id === props.id);
 console.log(state.products,"products  in selector")
});

