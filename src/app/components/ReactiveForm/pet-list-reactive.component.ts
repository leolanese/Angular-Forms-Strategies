import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { cats, Pet } from './mocks-pets';

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

  constructor(private fb: FormBuilder) {
    this.petForm = this.fb.group({
      cats: this.fb.array([]),
      newCatName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialize cats FormArray
    this.loadPets('cats', cats);
  }

  // Helper to get FormArray controls
  get catsArray(): FormArray {
    return this.petForm.get('cats') as FormArray;
  }

  loadPets(type: 'cats', pets: Pet[]): void {
    const petArray = this.catsArray;
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

  deleteCat(index: number): void {
    if (confirm(`Are you sure you want to delete "${this.catsArray.at(index).value.name}"?`)) {
      this.catsArray.removeAt(index);
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
}
