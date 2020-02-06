import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDemonstrationPopUpComponent } from './game-demonstration-pop-up.component';

describe('GameDemostrarionPopUpComponent', () => {
  let component: GameDemonstrationPopUpComponent;
  let fixture: ComponentFixture<GameDemonstrationPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameDemonstrationPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDemonstrationPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
