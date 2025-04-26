import { Routes } from '@angular/router';
import { PetListSignalComponent } from './components/SignalForm/pet-list-signal.component';

export const routes: Routes = [
  { path: '', redirectTo: 'template-driven', pathMatch: 'full' },
  {
    path: 'template-driven',
    loadComponent: () => import('./components/TemplateDrivenForms/pet-list/pet-list.component')
      .then(m => m.PetListComponent)
  },
  {
    path: 'reactive',
    loadComponent: () => import('./components/ReactiveForm/pet-list-reactive.component')
      .then(m => m.PetListComponent)
  },
  {
    path: 'signal',
    component: PetListSignalComponent
  }
];
