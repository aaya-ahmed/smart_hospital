import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewscanComponent } from './newscan.component';

describe('NewscanComponent', () => {
  let component: NewscanComponent;
  let fixture: ComponentFixture<NewscanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewscanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewscanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
