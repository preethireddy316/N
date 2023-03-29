import { Observable } from 'rxjs';
// import { Product } from './../http-practice/product.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
// import { Subject } from 'rxjs';
import { Product } from '../models/product.model';


@Injectable({providedIn:"root"})
export class ProductService {
  // private _refreshrequired=new Subject<void>();

    constructor(private http:HttpClient){
    }

    // get Refreshrequired(){
    //   return this._refreshrequired
    // }

    addProduct(product:Product):Observable<any>{
        return this.http.post<any>('https://angularproject-d03f8-default-rtdb.firebaseio.com/products.json',product)
    }

    deleteProductService(id:string){
        return this.http.delete('https://angularproject-d03f8-default-rtdb.firebaseio.com/products/'+id+'.json')
    }

    updateProductService(product:any){
        return this.http.put(`https://angularproject-d03f8-default-rtdb.firebaseio.com/products/${product.id}.json`,product)
    }

    getProductsService():Observable<any>{
      console.log("get products called")
     
        return(
        this.http.get<Product[]>('https://angularproject-d03f8-default-rtdb.firebaseio.com/products.json')
    .pipe(map(
      (res)=>{
      const products:Product[]=[]
      for (let key in res){
        if(res.hasOwnProperty(key)){
          products.push({...res[key],id:key})
        }
      }
    //  this.Refreshrequired.next();
      console.log(products,"service")
      return products
    })))
    }




}