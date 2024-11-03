import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarQuartoComponent } from './gerenciar-quarto.component';

describe('GerenciarQuartoComponent', () => {
  let component: GerenciarQuartoComponent;
  let fixture: ComponentFixture<GerenciarQuartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarQuartoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarQuartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
