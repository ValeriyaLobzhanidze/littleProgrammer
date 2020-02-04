import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammingExplanationListComponent } from './programming-explanation-list.component';

describe('ProgrammingExplanationListComponent', () => {
  let component: ProgrammingExplanationListComponent;
  let fixture: ComponentFixture<ProgrammingExplanationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammingExplanationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammingExplanationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
