import {AbstractControl} from '@angular/forms';

export function passwordValidator(
  control: AbstractControl
): {[key: string]: boolean} | null {
  const password = control.value;
  return password && password !== 'Test123' ? {invalid: true} : null;
}
