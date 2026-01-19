import { Component } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';
import { ProductFormComponent } from "../../components/product-form/product-form.component";
import { CommonModule } from '@angular/common';
import { ModalAlertComponent } from "../../../../core/shared/components/modal-alert/modal-alert.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create-page',
  templateUrl: './product-create.page.html',
  imports: [ProductFormComponent, CommonModule, ModalAlertComponent],
  styleUrls: ['./product-create.page.css']
})
export class ProductCreatePageComponent {
  loading = false;
  showModal = false;
  error = '';

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit(product: Product): void {
    this.loading = true;
    this.error = '';

    this.productService.create(product).subscribe({
      next: () => {
        this.loading = false;
        this.showModal = true;
      },
      error: () => {
        this.error = 'Error al crear el producto';
        this.loading = false;
      }
    });
  }
  goToList() {
  this.showModal = false;
  this.router.navigate(['/products']);
}
}
