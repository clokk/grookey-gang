import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexInfoDialogComponent } from './pokedex-info-dialog.component';

describe('PokedexInfoDialogComponent', () => {
  let component: PokedexInfoDialogComponent;
  let fixture: ComponentFixture<PokedexInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokedexInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
