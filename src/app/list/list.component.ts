import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';

import {DialogComponent} from './../dialog/dialog.component';

import {PersistanceService} from './../services/persistance.service';

import {STUDENT_DATA} from './../table-data/tableData';
import {Student} from './../models/student.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  private studentData = STUDENT_DATA;
  displayedColumns: string[] = ['name', 'rollNo', 'degree', 'city', 'action'];
  dataSource = new MatTableDataSource<Student>(this.studentData);
  public user = '';
  constructor(public dialog: MatDialog, public persister: PersistanceService) {}

  ngOnInit() {
    if (this.persister.get('STUDENT_DATA')) {
      this.studentData = this.persister.get('STUDENT_DATA');
      this.refreshTable();
    }
    this.dataSource.filterPredicate = (data, filter: string) => {
      return data.name.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit() {
    this.user = this.persister.get('USER_NAME');
    this.dataSource.paginator = this.paginator;
  }
  openDialog(studentData: Student): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '550px',
      height: '550px',
      data: studentData,
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateTable(result);
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  public onEdit(id: number): void {
    const rowToEdit: Student = this.studentData[id - 1];
    this.openDialog(rowToEdit);
  }
  public onAdd(): void {
    const rowToAdd: Student = {
      id: this.generateNewID(),
      name: '',
      rollNo: '',
      degree: '',
      city: ''
    };
    this.openDialog(rowToAdd);
  }
  public updateTable(result: Student): void {
    if (this.isDataValid(result)) {
      this.studentData[result.id - 1] = result;
      this.studentData = [...this.studentData];
      this.refreshTable();
    }
  }
  isDataValid(result: Student): boolean {
    const {name: n, rollNo: rl, city: c, degree: d} = result;
    if (n.length > 0 && rl.length > 0 && c.length > 0 && d.length > 0) {
      return true;
    }
    return false;
  }

  public refreshTable(): void {
    this.dataSource = new MatTableDataSource(this.studentData);
    this.dataSource.paginator = this.paginator;
  }
  public generateNewID(): number {
    return this.studentData.length + 1;
  }
  ngOnDestroy() {
    this.persister.set('STUDENT_DATA', this.studentData);
    this.persister.isAllowed = false;
  }
}
