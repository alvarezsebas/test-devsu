import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';
import { ProductFormComponent } from "../../components/product-form/product-form.component";
import { CommonModule } from '@angular/common';
import { ModalAlertComponent } from "../../../../core/shared/components/modal-alert/modal-alert.component";

@Component({
  selector: 'app-product-edit-page',
  templateUrl: './product-edit.page.html',
  styleUrls: ['./product-edit.page.css'],
  imports: [ProductFormComponent, CommonModule, ModalAlertComponent]
})
export class ProductEditPageComponent implements OnInit {
  product!: Product;
  loading = true;
  error = '';
  showModal = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productService.getAll().subscribe({
      next: products => {
        const found = products.find(p => p.id === id);
        if (!found) {
          this.error = 'Producto no encontrado';
          return;
        }
        this.product = found;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error cargando producto';
      }
    });
  }
  goToList() {
  this.showModal = false;
  this.router.navigate(['/products']);
}

  onSubmit(updated: Product): void {
    this.productService.update(this.product.id, updated).subscribe({
      next: () => alert('Producto actualizado'),
      error: () => this.error = 'Error al actualizar'
    });
  }
}
