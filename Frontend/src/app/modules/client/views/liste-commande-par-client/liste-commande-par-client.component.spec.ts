import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCommandeParClientComponent } from './liste-commande-par-client.component';

describe('ListeCommandeParClientComponent', () => {
  let component: ListeCommandeParClientComponent;
  let fixture: ComponentFixture<ListeCommandeParClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCommandeParClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCommandeParClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
