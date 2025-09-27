// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
// import { provideNativeDateAdapter } from '@angular/material/core';
// import { provideAnimations } from '@angular/platform-browser/animations';
// bootstrapApplication(AppComponent,{appConfig,
//   providers: [
//     provideNativeDateAdapter(),     // ✅ Required for MatDatepicker to work
//     provideAnimations(),            // ✅ Required for animation-based UI (like datepicker opening)
//   ]
// })
//   .catch((err) => console.error(err));
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core'; // ✅ Add this

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideNativeDateAdapter(), // ✅ Required for mat-datepicker to work with native adapter
    provideAnimations(),           // ✅ Required for animations
  ],
}).catch(err => console.error(err));

