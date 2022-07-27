import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqScanComponent } from './req-scan.component';

describe('ReqScanComponent', () => {
  let component: ReqScanComponent;
  let fixture: ComponentFixture<ReqScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
