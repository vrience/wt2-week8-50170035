import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormToDoListComponent } from './form-todolist.component';

describe('FormToDoListComponent', () => {
  let component: FormToDoListComponent;
  let fixture: ComponentFixture<FormToDoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormToDoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormToDoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
