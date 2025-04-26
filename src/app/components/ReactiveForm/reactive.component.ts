import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Item, items } from '../mocks/mocks-items';

@Component({
  selector: 'app-reactive',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterOutlet
  ],
  template: `
    <h2>Reactive Forms</h2>
      <div class="container">
        <form [formGroup]="petForm">
          <h2>Items</h2>
          <ul formArrayName="items">
            <li *ngFor="let item of itemsArray.controls; let i = index" [formGroupName]="i">
              <input type="checkbox" formControlName="isChecked">
              <span>{{ item.get('name')?.value }}</span>
              <div>
                <button (click)="modifyItem(i)">Edit</button>
                <button (click)="deleteItem(i)">Delete</button>
              </div>
            </li>
          </ul>
          <div class="add-item">
            <input type="text" formControlName="newItemName" placeholder="Enter item name">
            <button class="add-button" (click)="addItem()">Add Item</button>
            <span>{{ petForm.get('newItemName')?.value }}</span>
          </div>
        </form>
      </div>  
  `,
  styleUrls: ['./reactive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveComponent implements OnInit {
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
