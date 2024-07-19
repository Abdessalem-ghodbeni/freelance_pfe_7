import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueCommandeOggiComponent } from './statistique-commande-oggi.component';

describe('StatistiqueCommandeOggiComponent', () => {
  let component: StatistiqueCommandeOggiComponent;
  let fixture: ComponentFixture<StatistiqueCommandeOggiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiqueCommandeOggiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistiqueCommandeOggiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
