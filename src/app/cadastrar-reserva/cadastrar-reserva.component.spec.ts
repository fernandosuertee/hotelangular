import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarReservaComponent } from './cadastrar-reserva.component';

describe('CadastrarReservaComponent', () => {
  let component: CadastrarReservaComponent;
  let fixture: ComponentFixture<CadastrarReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarReservaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
