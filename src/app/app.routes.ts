import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'template-driven', pathMatch: 'full' },
  {
    path: 'template-driven',
    loadComponent: () => import('./components/TemplateDrivenForms/list/list.component')
      .then(m => m.ListComponent)
  },
  {
    path: 'reactive',
    loadComponent: () => import('./components/ReactiveForm/list-reactive.component')
      .then(m => m.ListComponent)
  },
  {
    path: 'signal',
    loadComponent: () => import('./components/SignalForm/list-signal.component')
      .then(m => m.ListSignalComponent)
  }
];
