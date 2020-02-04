import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammingExplanationComponent } from './programming-explanation.component';

describe('ProgrammingExplanationComponent', () => {
  let component: ProgrammingExplanationComponent;
  let fixture: ComponentFixture<ProgrammingExplanationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammingExplanationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammingExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
