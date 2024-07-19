import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueCommandeTotaleComponent } from './historique-commande-totale.component';

describe('HistoriqueCommandeTotaleComponent', () => {
  let component: HistoriqueCommandeTotaleComponent;
  let fixture: ComponentFixture<HistoriqueCommandeTotaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueCommandeTotaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueCommandeTotaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
