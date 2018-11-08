import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {userNameValidator, passwordValidator} from '../Validators/index';

import {PersistanceService} from './../services/persistance.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private route: Router, private persister: PersistanceService) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, [Validators.required, userNameValidator]),
      password: new FormControl(null, [Validators.required, passwordValidator])
    });
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const userName = this.loginForm.get('userName').value;
      this.persister.set('USER_NAME', userName);
      this.persister.isAllowed = true;
      this.route.navigate(['list']);
    }
  }
}
