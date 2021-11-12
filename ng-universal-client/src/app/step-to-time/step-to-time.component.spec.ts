import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepToTimeComponent } from './step-to-time.component';

describe('StepToTimeComponent', () => {
  let component: StepToTimeComponent;
  let fixture: ComponentFixture<StepToTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepToTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepToTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
