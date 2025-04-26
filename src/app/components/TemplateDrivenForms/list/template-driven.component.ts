import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Item, items } from '../../mocks/mocks-items';

@Component({
  selector: 'app-template-driven',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterOutlet
  ],
  template: `
    <h2>Template Driven Forms</h2>
      <div class="container">
        <h2>Items</h2>
        <ul>
          <li *ngFor="let item of items; let i = index">
            <input type="checkbox" [(ngModel)]="item.isChecked">
            <span>{{ item.name }}</span>
            <div>
              <button (click)="modifyItem(i)">Edit</button>-
              <button (click)="deleteItem(i)">Delete</button>
            </div>
          </li>
        </ul>
        <div class="add-item">
          <input type="text" [(ngModel)]="newItemName" placeholder="Enter item name">
          <button class="add-button" (click)="addItem()">Add Item</button>
          <span>{{ newItemName }}</span>
        </div>
      </div>  
  `,
  styleUrls: ['../../ReactiveForm/reactive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateDrivenComponent {
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
    this.items.splice(index, 1);
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