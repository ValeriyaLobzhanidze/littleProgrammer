import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePopUpComponent } from './simple-pop-up.component';

describe('SimplePopUpComponent', () => {
  let component: SimplePopUpComponent;
  let fixture: ComponentFixture<SimplePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
