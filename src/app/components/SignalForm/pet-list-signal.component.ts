import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { cats, Pet } from '../ReactiveForm/mocks-pets';

@Component({
  selector: 'app-pet-list-signal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet
  ],
  template: `
    <h2>Signal Forms</h2>
    <div class="container">
      <h2>Cats</h2>
      <ul>
        <li *ngFor="let cat of cats(); let i = index">
          <input type="checkbox" [(ngModel)]="cat.isChecked">
          <span>{{ cat.name }}</span>
          <div>
            <button (click)="modifyCat(i)">Modify</button>
            <button (click)="deleteCat(i)">Delete</button>
          </div>
        </li>
      </ul>
      <div class="add-pet">
        <input type="text" [(ngModel)]="newCatName" placeholder="Enter cat name">
        <button class="add-button" (click)="addCat()">Add Cat</button>
      </div>
    </div>
  `,
  styleUrls: ['../ReactiveForm/pet-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetListSignalComponent {
  // Signals for pet lists
  cats = signal<Pet[]>([...cats]);

  // Template form bindings
  newCatName = '';

  addCat(): void {
    if (this.newCatName.trim()) {
      this.cats.update(cats => [...cats, { name: this.newCatName.trim(), isChecked: false }]);
      this.newCatName = '';
    } else {
      alert('Cat name cannot be empty.');
    }
  }

  deleteCat(index: number): void {
    if (confirm(`Are you sure you want to delete "${this.cats()[index].name}"?`)) {
      this.cats.update(cats => cats.filter((_, i) => i !== index));
    }
  }

  modifyCat(index: number): void {
    const newName = prompt('Modify Cat Name:', this.cats()[index].name);
    if (newName?.trim()) {
      this.cats.update(cats => 
        cats.map((cat, i) => i === index ? { ...cat, name: newName.trim() } : cat)
      );
    } else {
      alert('Cat name cannot be empty.');
    }
  }
} 