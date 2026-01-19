import { FormControl } from '@angular/forms';
import { ProductValidators } from './product.validators';

describe('ProductValidators', () => {

  describe('releaseDate', () => {

    it('debe ser válido si la fecha de liberación es hoy o futura', () => {
      const hoy = new Date().toISOString().slice(0, 10);
      const control = new FormControl(hoy);

      const result = ProductValidators.releaseDate(control);

      expect(result).toBeNull();
    });

    it('debe marcar error si la fecha de liberación es anterior a hoy', () => {
      const ayer = new Date();
      ayer.setDate(ayer.getDate() - 1);

      const control = new FormControl(
        ayer.toISOString().slice(0, 10)
      );

      const result = ProductValidators.releaseDate(control);

      expect(result).toEqual({ releaseDateInvalid: true });
    });

    it('debe ser válido si el control no tiene valor', () => {
      const control = new FormControl(null);

      const result = ProductValidators.releaseDate(control);

      expect(result).toBeNull();
    });
  });

  describe('revisionDate', () => {

    it('debe ser válido si la fecha de revisión es exactamente un año después de la liberación', () => {
      const releaseDate = new FormControl('2025-01-01');
      const revisionDate = new FormControl('2026-01-01');

      const validator = ProductValidators.revisionDate(releaseDate);
      const result = validator(revisionDate);

      expect(result).toBeNull();
    });

    it('debe marcar error si la fecha de revisión no es un año después', () => {
      const releaseDate = new FormControl('2025-01-01');
      const revisionDate = new FormControl('2025-12-31'); 

      const validator = ProductValidators.revisionDate(releaseDate);
      const result = validator(revisionDate);

      expect(result).toEqual({ revisionDateInvalid: true });
    });

    it('debe marcar error si la fecha de revisión es mayor a un año después', () => {
      const releaseDate = new FormControl('2025-01-01');
      const revisionDate = new FormControl('2026-01-02'); 

      const validator = ProductValidators.revisionDate(releaseDate);
      const result = validator(revisionDate);

      expect(result).toEqual({ revisionDateInvalid: true });
    });
  });
});
