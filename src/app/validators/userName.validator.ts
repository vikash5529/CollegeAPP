import {FormControl} from '@angular/forms';

export function userNameValidator(
  control: FormControl
): {[key: string]: boolean} | null {
  const userName = control.value;

  return userName && userName !== 'Test' ? {invalid: true} : null;
}
