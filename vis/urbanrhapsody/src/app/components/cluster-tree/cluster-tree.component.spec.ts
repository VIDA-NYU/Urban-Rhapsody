import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterTreeComponent } from './cluster-tree.component';

describe('ClusterTreeComponent', () => {
  let component: ClusterTreeComponent;
  let fixture: ComponentFixture<ClusterTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
