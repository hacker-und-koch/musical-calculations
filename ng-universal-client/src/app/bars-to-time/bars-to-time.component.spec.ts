import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarsToTimeComponent } from './bars-to-time.component';

describe('BarsToTimeComponent', () => {
  let component: BarsToTimeComponent;
  let fixture: ComponentFixture<BarsToTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarsToTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarsToTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
