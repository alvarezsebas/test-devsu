import { Routes } from '@angular/router';
import { ProductListPageComponent } from './pages/product-list/product-list.page';
import { ProductCreatePageComponent } from './pages/product-create/product-create.page';
import { LayoutComponent } from '../../core/shared/components/layout/layout.component';
import { ProductEditPageComponent } from './pages/product-edit/product-edit.page';


export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ProductListPageComponent },
      { path: 'create', component: ProductCreatePageComponent },
      { path: 'edit/:id', component: ProductEditPageComponent}
    ]
  }
];
