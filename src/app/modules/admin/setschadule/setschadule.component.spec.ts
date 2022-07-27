import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetschaduleComponent } from './setschadule.component';

describe('SetschaduleComponent', () => {
  let component: SetschaduleComponent;
  let fixture: ComponentFixture<SetschaduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetschaduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetschaduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
