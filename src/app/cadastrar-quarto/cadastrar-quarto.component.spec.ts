import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarQuartoComponent } from './cadastrar-quarto.component';

describe('CadastrarQuartoComponent', () => {
  let component: CadastrarQuartoComponent;
  let fixture: ComponentFixture<CadastrarQuartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarQuartoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarQuartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
