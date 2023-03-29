import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ProductListComponent } from './products/product-list/product-list.component';


const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
    children: [
      { path: 'add', component: AddProductComponent },
      {
        path: 'edit/:id',
        component: EditProductComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],
})

export class AppRoutingModule { }

