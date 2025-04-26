import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'template-driven', pathMatch: 'full' },
  {
    path: 'template-driven',
    loadComponent: () => import('./components/TemplateDrivenForms/list/template-driven.component')
      .then(m => m.TemplateDrivenComponent)
  },
  {
    path: 'reactive',
    loadComponent: () => import('./components/ReactiveForm/reactive.component')
      .then(m => m.ReactiveComponent)
  },
  {
    path: 'signal',
    loadComponent: () => import('./components/SignalForm/signal.component')
      .then(m => m.SignalComponent)
  }
];
