import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVitalSignComponent } from './add-vital-sign.component';

describe('AddVitalSignComponent', () => {
  let component: AddVitalSignComponent;
  let fixture: ComponentFixture<AddVitalSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVitalSignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVitalSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
