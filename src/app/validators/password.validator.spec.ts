import {FormControl} from '@angular/forms';
import {passwordValidator} from './password.validator';

describe('It should Test userNameValiadtor', () => {
  it('should pass', () => {
    expect(passwordValidator(new FormControl('Test123'))).toEqual(null);
  });
  it('should fail', () => {
    expect(passwordValidator(new FormControl('abcd'))).toEqual({invalid: true});
  });
});
