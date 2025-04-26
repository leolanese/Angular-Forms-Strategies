import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Item, items } from '../mocks/mocks-items';

@Component({
  selector: 'app-item-list-reactive-driven',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterOutlet
  ],
  templateUrl: './list-reactive.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  petForm: FormGroup;
  private fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.petForm = this.fb.group({
      items: this.fb.array([]),
      newItemName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialize items FormArray
    this.loadItems(items);
  }

  // Helper to get FormArray controls
  get itemsArray(): FormArray {
    return this.petForm.get('items') as FormArray;
  }

  loadItems(items: Item[]): void {
    items.forEach(item => {
      this.itemsArray.push(this.fb.group({
        name: [item.name, Validators.required],
        isChecked: [item.isChecked]
      }));
    });
  }

  addItem(): void {
    const newItemName = this.petForm.get('newItemName')?.value;
    if (newItemName.trim()) {
      this.itemsArray.push(this.fb.group({
        name: [newItemName, Validators.required],
        isChecked: [false]
      }));
      this.petForm.get('newItemName')?.reset();
    } else {
      alert('Item name cannot be empty.');
    }
  }

  deleteItem(index: number): void {
    this.itemsArray.removeAt(index);
  }

  modifyItem(index: number): void {
    const newName = prompt('Modify Item Name:', this.itemsArray.at(index).get('name')?.value);
    if (newName && newName.trim()) {
      this.itemsArray.at(index).patchValue({ name: newName.trim() });
    } else {
      alert('Item name cannot be empty.');
    }
  }
}
