import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionSetPopUpComponent } from './instruction-set-pop-up.component';

describe('InstructionSetPopUpComponent', () => {
  let component: InstructionSetPopUpComponent;
  let fixture: ComponentFixture<InstructionSetPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructionSetPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionSetPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
