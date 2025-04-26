import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { cats, Pet } from '../../ReactiveForm/mocks-pets';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet
  ],
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetListComponent {
  cats: Pet[] = [...cats];
  newCatName = '';

  addCat(): void {
    if (this.newCatName.trim()) {
      this.cats.push({ name: this.newCatName.trim(), isChecked: false });
      this.newCatName = '';
    } else {
      alert('Cat name cannot be empty.');
    }
  }

  deleteCat(index: number): void {
    if (confirm(`Are you sure you want to delete "${this.cats[index].name}"?`)) {
      this.cats.splice(index, 1);
    }
  }

  modifyCat(index: number): void {
    const newName = prompt('Modify Cat Name:', this.cats[index].name);
    if (newName?.trim()) {
      this.cats[index].name = newName.trim();
    } else {
      alert('Cat name cannot be empty.');
    }
  }
}