import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, { //appConfig
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes), // Tells Angular not to expect Zone.js
    provideHttpClient()
  ]
})
  .catch((err) => console.error(err));
