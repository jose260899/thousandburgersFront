import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { SessionService } from './services/session.service';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import {  authInterceptor } from './auth/auth.interceptor';
import { BooksService } from './services/books.service.service';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { ProductTypeService } from './services/product.type.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    SessionService,
    BooksService,
    ProductTypeService,
    provideClientHydration(), provideHttpClient(),
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    provideHttpClient(withInterceptors([authInterceptor])),
    
  ],
 
};
