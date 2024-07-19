import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureTicketComponent } from './facture-ticket.component';

describe('FactureTicketComponent', () => {
  let component: FactureTicketComponent;
  let fixture: ComponentFixture<FactureTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
