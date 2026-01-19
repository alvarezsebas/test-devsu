import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.css']
})
export class ProductMenuComponent {
  open = false;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  toggle(): void {
    this.open = !this.open;
  }

  onEdit(): void {
    this.edit.emit();
    this.open = false;
  }

  onDelete(): void {
    this.delete.emit();
    this.open = false;
  }
}
