import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PetListComponent} from './components/ReactiveForm/pet-list-reactive.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    PetListComponent
  ],
  template: `
    <app-pet-list-reactive-driven />
  `,
})
export class AppComponent {
  title = 'Angular18-Forms';
}

/*

reactive-driven forms

ReactiveFormsModule is used instead of FormsModule 
FormBuilder is utilized to construct FormGroup and FormArray.
FormArray holds the lists of cats and dogs, where each pet is a form group containing name and isChecked controls.
The form controls are accessed dynamically using the index in the template.

*/