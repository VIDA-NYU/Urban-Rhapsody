import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSummaryListComponent } from './model-summary-list.component';

describe('ModelSummaryListComponent', () => {
  let component: ModelSummaryListComponent;
  let fixture: ComponentFixture<ModelSummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelSummaryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
