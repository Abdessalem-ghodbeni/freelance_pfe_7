import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCommandeAPayerComponent } from './details-commande-a-payer.component';

describe('DetailsCommandeAPayerComponent', () => {
  let component: DetailsCommandeAPayerComponent;
  let fixture: ComponentFixture<DetailsCommandeAPayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCommandeAPayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCommandeAPayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
