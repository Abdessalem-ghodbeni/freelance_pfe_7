import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDesCommandesComponent } from './list-des-commandes.component';

describe('ListDesCommandesComponent', () => {
  let component: ListDesCommandesComponent;
  let fixture: ComponentFixture<ListDesCommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDesCommandesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDesCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
