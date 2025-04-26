import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Item, items } from '../../ReactiveForm/mocks-pets';

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
  items: Item[] = [...items];
  newItemName = '';

  addItem(): void {
    if (this.newItemName.trim()) {
      this.items.push({ name: this.newItemName.trim(), isChecked: false });
      this.newItemName = '';
    } else {
      alert('Item name cannot be empty.');
    }
  }

  deleteItem(index: number): void {
    if (confirm(`Are you sure you want to delete "${this.items[index].name}"?`)) {
      this.items.splice(index, 1);
    }
  }

  modifyItem(index: number): void {
    const newName = prompt('Modify Item Name:', this.items[index].name);
    if (newName?.trim()) {
      this.items[index].name = newName.trim();
    } else {
      alert('Item name cannot be empty.');
    }
  }
}