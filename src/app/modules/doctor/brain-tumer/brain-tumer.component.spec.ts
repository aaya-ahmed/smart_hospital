import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrainTumerComponent } from './brain-tumer.component';

describe('BrainTumerComponent', () => {
  let component: BrainTumerComponent;
  let fixture: ComponentFixture<BrainTumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrainTumerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrainTumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
