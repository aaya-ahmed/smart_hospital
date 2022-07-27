import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatBedsComponent } from './seat-beds.component';

describe('SeatBedsComponent', () => {
  let component: SeatBedsComponent;
  let fixture: ComponentFixture<SeatBedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatBedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatBedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
