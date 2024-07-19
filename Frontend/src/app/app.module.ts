import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminModule } from './modules/admin/admin.module';
import { HomeComponent } from './home/layouts/home.component';
import { Error404Component } from './home/views/error404/error404.component';
import { SignInComponent } from './home/views/sign-in/sign-in.component';

import { ForgotPasswordComponent } from './home/views/forgot-password/forgot-password.component';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './home/views/reset-password/reset-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShopComponent } from './home/views/shop/shop.component';
import { SharedModule } from './shared/shared.module';
import { ShopDetailComponent } from './home/views/shop-detail/shop-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    SignInComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ShopComponent,
    ShopDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
