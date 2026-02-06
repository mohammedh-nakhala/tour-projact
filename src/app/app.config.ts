import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';


import { provideToastr } from 'ngx-toastr';
import { loadInterceptor } from './core/interceptor/load.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)
    ,provideHttpClient(withInterceptors([loadInterceptor])),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    importProvidersFrom(BrowserAnimationsModule),
  ]
};
