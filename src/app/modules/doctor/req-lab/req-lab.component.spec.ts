import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqLabComponent } from './req-lab.component';

describe('ReqLabComponent', () => {
  let component: ReqLabComponent;
  let fixture: ComponentFixture<ReqLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
