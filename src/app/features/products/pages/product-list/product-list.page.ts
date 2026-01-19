import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { SkeletonComponent } from '../../../../core/shared/components/skeleton/skeleton.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModalAlertComponent } from '../../../../core/shared/components/modal-alert/modal-alert.component';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.css'],
  imports: [
    ProductTableComponent,
    SkeletonComponent,
    CommonModule,
    ModalAlertComponent,
  ],
})
export class ProductListPageComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];
  showModal = false;
  loading = false;
  error = '';

  search = '';
  pageSize = 5;

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.error = 'Error cargando productos';
        this.loading = false;
      },
    });
  }

  applyFilters(): void {
    const term = this.search.toLowerCase();

    this.filtered = this.products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term),
      )
      .slice(0, this.pageSize);
  }

  goToCreate() {
    this.router.navigate(['/products/create']);
  }

  onSearch(value: string): void {
    this.search = value;
    this.applyFilters();
  }

  onPageSizeChange(value: number): void {
    this.pageSize = value;
    this.applyFilters();
  }

  onDelete(id: string): void {
    this.loading = true;
    this.error = '';

    this.productService.delete(id).subscribe({
      next: () => {
        this.products = this.products.filter((p) => p.id !== id);
        this.applyFilters();
        this.loading = false;
        this.showModal = true;
      },
      error: () => {
        this.error = 'Error eliminando el producto';
        this.loading = false;
      },
    });
  }
  goToList() {
    this.showModal = false;
  }
}
