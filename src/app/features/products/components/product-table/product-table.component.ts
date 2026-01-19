import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { ProductMenuComponent } from '../product-menu/product-menu.component';
import { ModalComponent } from '../../../../core/shared/components/modal/modal.component';


@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, ProductMenuComponent, ModalComponent],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Output() delete = new EventEmitter<string>();

  selectedId: string | null = null;
  selectedName: string | null = null;
  showDeleteModal = false;

  constructor(private router: Router) {}

  edit(id: string): void {
    this.router.navigate(['/products/edit', id]);
  }

  askDelete(product: Product): void {
    this.selectedId = product.id;
    this.selectedName = product.name;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.selectedId = null;
    this.selectedName = null;
  }

  confirmDelete(): void {
    if (!this.selectedId) return;
    console.log("Lo llamaron");
    
    this.delete.emit(this.selectedId);
    this.cancelDelete();
  }
}