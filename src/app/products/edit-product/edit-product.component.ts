import { getProductById } from './../state/state.selector';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';
import { ProductState } from '../state/state';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { updateProduct } from '../state/state.actions';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent implements OnInit{
  updateForm!:FormGroup;
  product!:any
  postSubscription!: Subscription;

  constructor(private store: Store<ProductState>, private route: ActivatedRoute,private router:Router) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: { get: (arg0: string) => any; }) => {
      const id = params.get('id');
      this.store.select(getProductById,{id}).subscribe((data:any)=>{
        this.product=data
        console.log(this.product,"edit component product")
        this.createForm();

      })
      // Observable<Product[]>
      // this.product=products.find((each:any)=>each.id===id)
      // this.postSubscription = this.store
      //   .select(getProductById, { id })
      //   .subscribe((data) => {
      //     this.product = data;
      //   });
    });
  }

  createForm() {
    this.updateForm = new FormGroup({
      name: new FormControl(this.product.name, [
        Validators.required,
      ]),
      desc: new FormControl(this.product.desc, [
        Validators.required,
      ]),
      price: new FormControl(this.product.price, [
        Validators.required,
      ]),
    });
  }

  validateAllFormFields(updateForm: FormGroup) 
  {
     console.log(Object.keys(updateForm.controls))
     Object.keys(updateForm.controls).forEach(each=>{
      let eachKey=(this.updateForm.get(each))
      eachKey?.markAsTouched()
     })
    }

  
  onUpdateProduct() {
    this.validateAllFormFields(this.updateForm) 

    if (!this.updateForm.valid) {
      return;
    }

    const name = this.updateForm.value.name;
    const desc = this.updateForm.value.desc;
    const price = this.updateForm.value.price;


    const product: Product = {
      id: this.product.id,
      name,
      desc,
      price
    };

    //dispatch the action
    this.store.dispatch(updateProduct({ product }));
    this.router.navigate(['products/add']);
  }

  onReset(){
    this.updateForm.reset()
  }

}


