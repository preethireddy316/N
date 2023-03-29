import { createReducer, on } from '@ngrx/store';
import { addProductSuccess, deleteProductSuccess, loadProductsSuccess, updateProductSuccess } from './state.actions';
import { initialState } from './state';

const _productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, action) => {
    return {
      ...state,
      products: action.products,
    };
  }),on(addProductSuccess,(state,action)=>{
    let product={...action.product}
    // product.id=(state.products.length+1).toString()
    return {
        ...state,
        products:[...state.products,product]
    }
  }),on(updateProductSuccess, (state, action) => {
    const updatedProducts = state.products.map((product) => {
      return action.product.id === product.id ? action.product : product;
    });

    return {
      ...state,
      products: updatedProducts,
    };
  }),on(deleteProductSuccess,(state,action)=>{
    let updProducts=state.products.filter((product)=>product.id!==action.id)
    console.log(updProducts,"after deletion sate products")
    return {
        ...state,
        products:[...updProducts]
    }
  })
);

export function ProductReducer(state:any, action:any) {
  return _productReducer(state, action);
}