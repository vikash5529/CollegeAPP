import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {Student} from './../models/student.model';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit {
  public editForm: FormGroup;
  public action: string;

  constructor(
    public dialogRef: MatDialogRef<Student>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {}

  ngOnInit() {
    this.buildForm();
    this.updateForm(this.data);
    if (this.data) {
      if (this.data.name.length === 0) {
        this.action = 'ADD NEW DATA';
      } else {
        this.action = 'UPDATE EXISTING DATA';
      }
    }
  }

  get name() {
    return this.editForm.get('name');
  }

  get rollNo() {
    return this.editForm.get('rollNo');
  }

  get degree() {
    return this.editForm.get('degree');
  }
  get city() {
    return this.editForm.get('city');
  }
  onSubmit() {
    const id = this.data.id;
    const result = {id, ...this.editForm.value};
    this.dialogRef.close(result);
  }
  onClose() {
    this.dialogRef.close(this.data);
  }
  private buildForm() {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      rollNo: new FormControl('', [Validators.required]),
      degree: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required])
    });
  }

  public updateForm(data: Student) {
    this.editForm.patchValue({
      name: data.name,
      rollNo: data.rollNo,
      degree: data.degree,
      city: data.city
    });
  }
}
