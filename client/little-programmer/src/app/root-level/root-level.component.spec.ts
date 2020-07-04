import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootLevelComponent } from './root-level.component';

describe('RootLevelComponent', () => {
  let component: RootLevelComponent;
  let fixture: ComponentFixture<RootLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
