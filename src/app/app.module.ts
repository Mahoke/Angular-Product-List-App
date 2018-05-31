import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import 'hammerjs';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './_directives';
import { RegisterComponent } from './register/register.component';
import { UserService, AuthenticationService, AlertService } from './_services';
import { AuthGuard } from './_guards';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { fakeBackendProvider } from './_helpers';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeLayoutComponent, LoginLayoutComponent } from './_layouts';
import { HomeComponent } from './home/home.component';
import { ProductListsComponent } from './product-lists/product-lists.component';
import { ProductListComponent } from './product-list/product-list.component';
import { DeactivateProductList} from './_deactivators';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    RegisterComponent,
    NavigationComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    HomeComponent,
    ProductListsComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },

    // provider used to create fake backend
    fakeBackendProvider,
    DeactivateProductList
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
