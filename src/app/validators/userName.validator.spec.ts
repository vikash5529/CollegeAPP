import {FormControl} from '@angular/forms';
import {userNameValidator} from './userName.validator';

describe('It should Test userNameValiadtor', () => {
  it('should pass', () => {
    expect(userNameValidator(new FormControl('Test'))).toEqual(null);
  });
  it('should fail', () => {
    expect(userNameValidator(new FormControl('abcd'))).toEqual({invalid: true});
  });
});
