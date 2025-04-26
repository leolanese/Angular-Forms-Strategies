import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Item, items } from '../../mocks/mocks-items';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet
  ],
  templateUrl: './list.component.html',
  styleUrls: ['../../ReactiveForm/list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
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