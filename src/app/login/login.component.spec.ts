import {PersistanceService} from './../services/persistance.service';
import {ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from './../app.material.module';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {LoginComponent} from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [AppMaterialModule, ReactiveFormsModule, RouterTestingModule],
      providers: [{provide: Router, useValue: router}, PersistanceService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('userName field validity', () => {
    const username = component.loginForm.controls['userName'];
    expect(username.valid).toBeFalsy();
  });
  it('userName field validity', () => {
    const username = component.loginForm.controls['userName'];
    let errors = {};
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('userName field validity', () => {
    const username = component.loginForm.controls['userName'];
    let errors = {};
    username.setValue('ABCD');
    errors = username.errors || {};
    expect(errors['invalid']).toBeTruthy();
  });
  it('userName field validity', () => {
    const username = component.loginForm.controls['userName'];
    username.setValue('Test');
    fixture.detectChanges();
    expect(username.valid).toBeTruthy();
  });
  it('password field validity', () => {
    const password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
  });
  it('passowrd field validity', () => {
    const password = component.loginForm.controls['password'];
    let errors = {};
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('password field validity', () => {
    const password = component.loginForm.controls['password'];
    let errors = {};
    password.setValue('ABCD');
    errors = password.errors || {};
    expect(errors['invalid']).toBeTruthy();
  });
  it('password field validity', () => {
    const password = component.loginForm.controls['password'];
    password.setValue('Test123');
    fixture.detectChanges();
    expect(password.valid).toBeTruthy();
  });
  it('submitting a valid form should navigate ', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['userName'].setValue('Test');
    component.loginForm.controls['password'].setValue('Test123');
    expect(component.loginForm.valid).toBeTruthy();
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['list']);
  });
});
