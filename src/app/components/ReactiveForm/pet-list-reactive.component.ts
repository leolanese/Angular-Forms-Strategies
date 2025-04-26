import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { cats, dogs, Pet } from './mocks-pets';

@Component({
  selector: 'app-pet-list-reactive-driven',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterOutlet
  ],
  templateUrl: './pet-list-reactive.component.html',
  styleUrls: ['./pet-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetListComponent implements OnInit {
  petForm: FormGroup;
  private fb = inject(FormBuilder);

  constructor() {
    this.petForm = this.fb.group({
      cats: this.fb.array([]),
      dogs: this.fb.array([]),
      newCatName: ['', Validators.required],
      newDogName: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // Initialize cats and dogs FormArrays
    this.loadPets('cats', cats);
    this.loadPets('dogs', dogs);
  }

  // Helper to get FormArray controls
  get catsArray(): FormArray {
    return this.petForm.get('cats') as FormArray;
  }

  get dogsArray(): FormArray {
    return this.petForm.get('dogs') as FormArray;
  }

  loadPets(type: 'cats' | 'dogs', pets: Pet[]): void {
    const petArray = type === 'cats' ? this.catsArray : this.dogsArray;
    pets.forEach(pet => {
      petArray.push(this.fb.group({
        name: [pet.name, Validators.required],
        isChecked: [pet.isChecked]
      }));
    });
  }

  addCat(): void {
    const newCatName = this.petForm.get('newCatName')?.value;
    if (newCatName.trim()) {
      this.catsArray.push(this.fb.group({
        name: [newCatName, Validators.required],
        isChecked: [false]
      }));
      this.petForm.get('newCatName')?.reset();
    } else {
      alert('Cat name cannot be empty.');
    }
  }

  addDog(): void {
    const newDogName = this.petForm.get('newDogName')?.value;
    if (newDogName.trim()) {
      this.dogsArray.push(this.fb.group({
        name: [newDogName, Validators.required],
        isChecked: [false]
      }));
      this.petForm.get('newDogName')?.reset();
    } else {
      alert('Dog name cannot be empty.');
    }
  }

  deleteCat(index: number): void {
    if (confirm(`Are you sure you want to delete "${this.catsArray.at(index).value.name}"?`)) {
      this.catsArray.removeAt(index);
    }
  }

  deleteDog(index: number): void {
    if (confirm(`Are you sure you want to delete "${this.dogsArray.at(index).value.name}"?`)) {
      this.dogsArray.removeAt(index);
    }
  }

  modifyCat(index: number): void {
    const newName = prompt('Modify Cat Name:', this.catsArray.at(index).get('name')?.value);
    if (newName && newName.trim()) {
      this.catsArray.at(index).patchValue({ name: newName.trim() });
    } else {
      alert('Cat name cannot be empty.');
    }
  }

  modifyDog(index: number): void {
    const newName = prompt('Modify Dog Name:', this.dogsArray.at(index).get('name')?.value);
    if (newName && newName.trim()) {
      this.dogsArray.at(index).patchValue({ name: newName.trim() }); // Change here
    } else {
      alert('Dog name cannot be empty.');
    }
  }

}
