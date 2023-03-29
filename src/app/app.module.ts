import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductReducer } from './products/state/state.reducer';
import { ProductEffects } from './products/state/state.effects';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './products/product-list/product-list.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,AddProductComponent,EditProductComponent,ProductListComponent
  ],
  imports: [AppRoutingModule,HttpClientModule,
    BrowserModule,RouterModule,CommonModule,
    ReactiveFormsModule,FormsModule,
    StoreModule.forRoot({'products':ProductReducer}),                                                                          
    EffectsModule.forRoot([ProductEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
