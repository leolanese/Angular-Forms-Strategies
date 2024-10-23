import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {cats,dogs,Pet} from './mocks-pets';

@Component({
  selector: 'app-pet-list-template-driven',
  standalone: true,
  imports: [
    CommonModule, FormsModule, 
    RouterOutlet, PetListComponent],
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent {
  cats: Pet[] = [...cats];
  dogs: Pet[] = [...dogs];

  newCatName: string = '';
  newDogName: string = '';

  addCat() {
    if (this.newCatName.trim()) {
      this.cats.push({ name: this.newCatName, isChecked: false });
      this.newCatName = '';
    } else {
      alert('Cat name cannot be empty.');
    }
  }

  addDog() {
    if (this.newDogName.trim()) {
      this.dogs.push({ name: this.newDogName, isChecked: false });
      this.newDogName = '';
    } else {
      alert('Dog name cannot be empty.');
    }
  }

  deleteCat(index: number) {
    if (confirm(`Are you sure you want to delete "${this.cats[index].name}"?`)) {
      this.cats.splice(index, 1);
    }
  }

  deleteDog(index: number) {
    if (confirm(`Are you sure you want to delete "${this.dogs[index].name}"?`)) {
      this.dogs.splice(index, 1);
    }
  }

  modifyCat(index: number) {
    const newName = prompt('Modify Cat Name:', this.cats[index].name);
    if (newName && newName.trim()) {
      this.cats[index].name = newName.trim();
    } else {
      alert('Cat name cannot be empty.');
    }
  }

  modifyDog(index: number) {
    const newName = prompt('Modify Dog Name:', this.dogs[index].name);
    if (newName && newName.trim()) {
      this.dogs[index].name = newName.trim();
    } else {
      alert('Dog name cannot be empty.');
    }
  }
}