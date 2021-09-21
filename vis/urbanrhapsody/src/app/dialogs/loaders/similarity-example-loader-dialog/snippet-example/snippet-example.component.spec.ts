import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetExampleComponent } from './snippet-example.component';

describe('SnippetExampleComponent', () => {
  let component: SnippetExampleComponent;
  let fixture: ComponentFixture<SnippetExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnippetExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
