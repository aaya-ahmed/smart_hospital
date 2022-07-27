import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowschaduleComponent } from './showschadule.component';

describe('ShowschaduleComponent', () => {
  let component: ShowschaduleComponent;
  let fixture: ComponentFixture<ShowschaduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowschaduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowschaduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
