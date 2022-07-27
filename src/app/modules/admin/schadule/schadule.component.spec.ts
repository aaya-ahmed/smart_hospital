import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchaduleComponent } from './schadule.component';

describe('schaduleComponent', () => {
  let component: SchaduleComponent;
  let fixture: ComponentFixture<SchaduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchaduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchaduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
