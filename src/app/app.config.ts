import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


const firebaseConfig = {
  authDomain: 'mean-stack-91fce.firebaseapp.com',
  projectId: 'mean-stack-91fce',
  storageBucket: 'mean-stack-91fce.appspot.com',
  messagingSenderId: '796028775979',
  appId: '1:796028775979:web:380413f74febd1968b446e',
};



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideStorage(() => getStorage()),
    ]), provideAnimationsAsync(), provideAnimationsAsync(),
  ],
};
