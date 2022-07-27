import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InPatientListComponent } from './inpatientlist.component';

describe('InPatientListComponent', () => {
  let component: InPatientListComponent;
  let fixture: ComponentFixture<InPatientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InPatientListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InPatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
