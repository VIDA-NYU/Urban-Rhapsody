import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSummaryComponent } from './model-summary.component';

describe('ModelSummaryComponent', () => {
  let component: ModelSummaryComponent;
  let fixture: ComponentFixture<ModelSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
