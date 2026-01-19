import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductValidators } from '../../../../core/validators/product.validators';
import { ProductService } from '../../../../core/services/product.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnChanges {
  @Output() submitForm = new EventEmitter<Product>();
  @Input() product?: Product;
  @Input() disableId = false;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) {
    this.form = this.fb.group({
      id: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ],
          asyncValidators: [this.idAsyncValidator()],
          updateOn: 'blur',
        },
      ],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required, ProductValidators.releaseDate]],
      date_revision: ['', Validators.required],
    });

    this.form.controls['date_revision'].addValidators(
      ProductValidators.revisionDate(this.form.controls['date_release']),
    );
  }

  ngOnChanges(): void {
    if (this.product) {
      this.form.patchValue(this.product);

      if (this.disableId) {
        const idControl = this.form.controls['id'];
        idControl.disable();
        idControl.clearAsyncValidators();
        idControl.updateValueAndValidity();
      }
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitForm.emit(this.form.getRawValue());
  }

  reset(): void {
    this.form.reset();
  }

  private idAsyncValidator() {
    return (control: any) =>
      this.productService
        .validateId(control.value)
        .pipe(map((exists) => (exists ? { idExists: true } : null)));
  }
}
