import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductState } from '../state/state';
import { deleteProduct, getProductsAction } from '../state/state.actions';
import { getProducts } from '../state/state.selector';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  products!:any

  constructor(private store:Store<ProductState>){
  }

  ngOnInit(){
    this.store.dispatch(getProductsAction())
    this.store.select(getProducts).subscribe((data:any)=>{
    this.products=data
    console.log(this.products,"products in product list compo")
    })
  }

  onDeleteProduct(id:string){
    this.store.dispatch(deleteProduct({id}))
  }
  // objectToArray(obj: any): any[] {
  //   return Object.keys(obj).map(key => obj[key]);
  // }
}


