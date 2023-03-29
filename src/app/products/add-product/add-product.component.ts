import { createProductAction, getProductsAction } from './../state/state.actions';
import { Store } from '@ngrx/store';
import { ProductState } from './../state/state';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent {
  form! :FormGroup;

  constructor(private store:Store<ProductState>,){
  }

  ngOnInit(){
    this.store.dispatch(getProductsAction())

    this.form=new FormGroup({
      name:new FormControl('',Validators.required),
      desc:new FormControl('',Validators.required),
      price:new FormControl('',Validators.required)
    })
  }
  
  validateAllFormFields(form: FormGroup) 
  {
     console.log(Object.keys(form.controls))
     Object.keys(form.controls).forEach(each=>{
      let eachKey=(this.form.get(each))
      eachKey?.markAsTouched()
     })
    }


  onAddProduct(){
    this.validateAllFormFields(this.form)
    const product={name:this.form.value.name,
    desc:this.form.value.desc,
    price:this.form.value.price}
    this.store.dispatch(createProductAction({product}))
    this.form.reset()
  }

  onReset(){
  this.form.reset()
}
}
