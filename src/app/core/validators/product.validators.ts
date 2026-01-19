import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ProductValidators {
  static releaseDate(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const today = new Date();
  const todayString = today.toISOString().slice(0, 10);
  return control.value < todayString
    ? { releaseDateInvalid: true }
    : null;
}



  static revisionDate(releaseCtrl: AbstractControl) {
    return (control: AbstractControl): ValidationErrors | null => {
      const release = new Date(releaseCtrl.value);
      const revision = new Date(control.value);
      const expected = new Date(release);
      expected.setFullYear(expected.getFullYear() + 1);

      return revision.getTime() !== expected.getTime()
        ? { revisionDateInvalid: true }
        : null;
    };
  }
}
