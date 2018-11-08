import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync
} from '@angular/core/testing';
import {AppMaterialModule} from './../app.material.module';
import {ListComponent} from './list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialog} from '@angular/material';
import {of} from 'rxjs';
import {STUDENT_DATA} from '../table-data/tableData';
import {PersistanceService} from './../services/persistance.service';
describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let dialog: MatDialogMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, BrowserAnimationsModule],
      declarations: [ListComponent],
      providers: [
        {
          provide: MatDialog,
          useClass: MatDialogMock
        },
        PersistanceService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    dialog = TestBed.get(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onEdit,onAdd and open Dialog', fakeAsync(() => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(component, 'updateTable').and.callThrough();

    component.onEdit(1);
    expect(dialog.open).toHaveBeenCalled();
    expect(component.updateTable).toHaveBeenCalledWith(STUDENT_DATA[0]);
    component.onAdd();
    expect(dialog.open).toHaveBeenCalled();
  }));
  it('should test isDataValid Method ', () => {
    expect(
      component.isDataValid({
        id: 0,
        name: '',
        rollNo: '',
        degree: '',
        city: ''
      })
    ).toBe(false);
    expect(
      component.isDataValid({
        id: 0,
        name: 'test',
        rollNo: 'test',
        degree: 'test',
        city: 'test'
      })
    ).toBe(true);
  });
});

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(STUDENT_DATA[0])
    };
  }
}
