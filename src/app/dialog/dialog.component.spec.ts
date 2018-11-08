import {AppMaterialModule} from './../app.material.module';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {DialogComponent} from './dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  const dialogMock = {
    close: () => {}
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogComponent],
      imports: [AppMaterialModule, ReactiveFormsModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {name: '', id: '', city: '', degree: '', rollno: ''}
        },
        {provide: MatDialogRef, useValue: dialogMock}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.editForm.valid).toBeFalsy();
  });

  it('name field validity', () => {
    const name = component.editForm.controls['name'];
    expect(name.valid).toBeFalsy();
  });
  it('name field validity', () => {
    const name = component.editForm.controls['name'];
    let errors = {};
    errors = name.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('name field validity', () => {
    const name = component.editForm.controls['name'];
    name.setValue('Test');
    fixture.detectChanges();
    expect(name.valid).toBeTruthy();
  });

  it('rollno field validity', () => {
    const rollno = component.editForm.controls['rollNo'];
    expect(rollno.valid).toBeFalsy();
  });
  it('rollno field validity', () => {
    const rollno = component.editForm.controls['rollNo'];
    let errors = {};
    errors = rollno.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('rollno field validity', () => {
    const rollno = component.editForm.controls['rollNo'];
    rollno.setValue('Test');
    fixture.detectChanges();
    expect(rollno.valid).toBeTruthy();
  });

  it('degree field validity', () => {
    const degree = component.editForm.controls['degree'];
    expect(degree.valid).toBeFalsy();
  });
  it('degree field validity', () => {
    const degree = component.editForm.controls['degree'];
    let errors = {};
    errors = degree.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('degree field validity', () => {
    const degree = component.editForm.controls['degree'];
    degree.setValue('Test');
    fixture.detectChanges();
    expect(degree.valid).toBeTruthy();
  });
  it('city field validity', () => {
    const city = component.editForm.controls['city'];
    expect(city.valid).toBeFalsy();
  });

  it('city field validity', () => {
    const city = component.editForm.controls['city'];
    let errors = {};
    errors = city.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('city field validity', () => {
    const city = component.editForm.controls['city'];
    city.setValue('Test');
    fixture.detectChanges();
    expect(city.valid).toBeTruthy();
  });
  it('submitting a valid form should close dialog Box', () => {
    expect(component.editForm.valid).toBeFalsy();
    component.editForm.controls['name'].setValue('Test');
    component.editForm.controls['rollNo'].setValue('Test');
    component.editForm.controls['city'].setValue('Test');
    component.editForm.controls['degree'].setValue('Test');
    expect(component.editForm.valid).toBeTruthy();
    component.onSubmit();
  });

  it('should test updateForm Method', () => {
    const dataObject = {
      id: 1,
      name: 'Test',
      rollNo: 'Test',
      degree: 'Test',
      city: 'Test'
    };
    component.updateForm(dataObject);
    const name = component.editForm.controls['name'];
    const rollNo = component.editForm.controls['rollNo'];
    const city = component.editForm.controls['city'];
    const degree = component.editForm.controls['degree'];

    expect(name.value).toBe('Test');
    expect(rollNo.value).toBe('Test');
    expect(city.value).toBe('Test');
    expect(degree.value).toBe('Test');
  });
});
