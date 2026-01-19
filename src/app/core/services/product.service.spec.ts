import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe mapear correctamente la respuesta del API a Product[]', () => {
    const mock: Product[] = [{ id: '123' } as Product];

    service.getAll().subscribe(productos => {
      expect(productos).toEqual(mock);
    });

    const req = httpMock.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toBe('GET');


    req.flush({ data: mock });
  });

  it('debe llamar al endpoint de eliminar producto', () => {
    service.delete('123').subscribe();

    const req = httpMock.expectOne(
      'http://localhost:3002/bp/products/123'
    );
    expect(req.request.method).toBe('DELETE');

    req.flush({});
  });
});
