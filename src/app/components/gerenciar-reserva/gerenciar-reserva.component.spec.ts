import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarReservaComponent } from './gerenciar-reserva.component';

describe('GerenciarReservaComponent', () => {
  let component: GerenciarReservaComponent;
  let fixture: ComponentFixture<GerenciarReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarReservaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
