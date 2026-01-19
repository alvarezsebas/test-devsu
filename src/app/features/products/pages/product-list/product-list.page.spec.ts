import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductListPageComponent } from './product-list.page';
import { Product } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';


const mockProducts: Product[] = [
  {
    id: '123',
    name: 'Cuenta Ahorros',
    description: 'Producto bancario',
    logo: 'logo-1.png',
    date_release: '2025-01-01',
    date_revision: '2026-01-01'
  },
  {
    id: '456',
    name: 'Tarjeta Crédito',
    description: 'Pago crédito',
    logo: 'logo-2.png',
    date_release: '2025-01-01',
    date_revision: '2026-01-01'
  }
];

describe('ProductListPageComponent', () => {
  let component: ProductListPageComponent;
  let fixture: ComponentFixture<ProductListPageComponent>;

  const productServiceMock = {
    getAll: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListPageComponent],
      providers: [
        { provide: ProductService, useValue: productServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListPageComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar los productos al iniciar', () => {
    productServiceMock.getAll.mockReturnValue(of(mockProducts));

    component.ngOnInit();

    expect(productServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(component.products).toEqual(mockProducts);
    expect(component.filtered).toEqual(mockProducts);
    expect(component.loading).toBe(false);
  });

  it('debe filtrar productos por nombre sin importar mayúsculas', () => {
    component.products = mockProducts;
    component.filtered = [...mockProducts];

    component.onSearch('tar');

    expect(component.filtered.length).toBe(1);
    expect(component.filtered[0].name).toContain('Tarjeta');
  });

  it('debe restaurar la lista completa cuando la búsqueda está vacía', () => {
    component.products = mockProducts;
    component.filtered = [];

    component.onSearch('');

    expect(component.filtered.length).toBe(2);
  });

  it('debe mostrar un mensaje de error cuando el servicio falla', () => {
    productServiceMock.getAll.mockReturnValue(
      throwError(() => new Error('Error del backend'))
    );

    component.loadProducts();

    expect(component.error).toBe('Error cargando productos');
    expect(component.loading).toBe(false);
  });
});
